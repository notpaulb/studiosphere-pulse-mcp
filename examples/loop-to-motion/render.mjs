// Optional local renderer: Node built-ins + installed FFmpeg. No network/API calls.
import {readFile,mkdtemp,rm,link,lstat,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {makeCutList,validateCutList,validateSource,framePixels} from './motion.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function verifyAudio(bytes,source){
 validateSource(source);
 if(createHash('sha256').update(bytes).digest('hex')!==source.sha256)throw Error('Local audio hash mismatch.');
 if(bytes.readUInt32LE(24)!==44100||bytes.readUInt16LE(22)!==1||bytes.readUInt16LE(34)!==16||bytes.readUInt32LE(40)!==705600)throw Error('Local audio format mismatch.');
}
export async function renderPreview({output,cutsPath,allowProvisional=false}={}){
 const source=JSON.parse(await readFile(join(here,'source.json'),'utf8'));
 if(cutsPath&&(await stat(cutsPath)).size>65536)throw Error('Cut-list file exceeds the 64 KiB example limit.');
 const list=cutsPath?validateCutList(JSON.parse(await readFile(cutsPath,'utf8')),source):makeCutList(source);
 if(list.review.status!=='human_attested'&&!allowProvisional)throw Error('Provisional grid: review in the browser or explicitly use --allow-provisional for a labelled preview.');
 if(typeof output!=='string'||!output.endsWith('.mp4'))throw Error('Choose a new .mp4 output path.');
 const destination=resolve(output);
 try{await lstat(destination);throw Error('Output already exists; choose a new path.');}catch(e){if(e.code!=='ENOENT')throw e;}
 verifyAudio(await readFile(join(here,source.audio_file)),source);
 const dir=await mkdtemp(join(dirname(destination),'.pulse-motion-'));
 let child;
 try{
  const temp=join(dir,'preview.mp4'),caption=join(here,'assets',list.review.status==='human_attested'?'reviewed.png':'provisional.png');
  child=spawn('ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-f','rawvideo','-pixel_format','rgb24','-video_size','640x360','-framerate',String(list.timing.fps),'-i','pipe:0','-i',join(here,source.audio_file),'-i',caption,'-filter_complex','[0:v][2:v]overlay=0:0:format=auto[v]','-map','[v]','-map','1:a:0','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-t',String(source.duration_seconds),'-metadata','title=Pulse licensed-loop motion study','-metadata','comment='+JSON.stringify(list),'-movflags','+faststart',temp],{stdio:['pipe','ignore','pipe']});
  let error='';child.stderr.on('data',b=>{error=(error+b).slice(-2000);});
  const done=new Promise((ok,no)=>{child.once('error',()=>no(Error('FFmpeg could not start; install it locally before rendering.')));child.once('close',code=>code===0?ok():no(Error('FFmpeg render failed: '+error)));});
  const timer=setTimeout(()=>child.kill('SIGKILL'),60000);
  try{
   async function* frames(){for(let n=0;n<list.timing.total_frames;n++)yield Buffer.from(framePixels(n,list));}
   await Promise.all([done,pipeline(Readable.from(frames()),child.stdin)]);
  }finally{clearTimeout(timer);}
  // Exclusive link refuses an existing destination, including a racing symlink.
  await link(temp,destination);
  return {output:destination,review_status:list.review.status,frames:list.timing.total_frames,cuts:list.cuts,source_sha256:source.sha256};
 }finally{if(child&&child.exitCode===null)child.kill('SIGKILL');await rm(dir,{recursive:true,force:true});}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const args=process.argv.slice(2),options={};
  while(args.length){const arg=args.shift();if(arg==='--output')options.output=args.shift();else if(arg==='--cuts')options.cutsPath=args.shift();else if(arg==='--allow-provisional')options.allowProvisional=true;else throw Error('Use --output NEW.mp4 [--cuts EXPORTED.json] [--allow-provisional].');}
  console.log(JSON.stringify(await renderPreview(options),null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
