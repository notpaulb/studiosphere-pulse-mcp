import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {renderPreview,verifyAudio} from './render.mjs';
import {makeCutList,framePixels} from './motion.mjs';
const source=JSON.parse(await readFile(new URL('./source.json',import.meta.url),'utf8'));
test('corrupted WAV fails source verification',async()=>{
 const b=await readFile(new URL(source.audio_file,import.meta.url));assert.doesNotThrow(()=>verifyAudio(b,source));b[100]^=1;assert.throws(()=>verifyAudio(b,source),/hash/i);
});
test('provisional renderer requires explicit preview permission',async()=>{
 await assert.rejects(renderPreview({output:'/tmp/unused-pulse-demo.mp4'}),/provisional/i);
});
test('renderer refuses existing outputs and symlinks without altering bytes',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pulse-motion-test-'));
 try{
  const file=join(dir,'keep.mp4');await writeFile(file,'keep');
  await assert.rejects(renderPreview({output:file,allowProvisional:true}),/exist/i);
  const link=join(dir,'link.mp4');await symlink(file,link);
  await assert.rejects(renderPreview({output:link,allowProvisional:true}),/exist/i);
  assert.equal(await readFile(file,'utf8'),'keep');
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('actual local render has 240 frames, eight seconds, audio and expected scene cuts',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pulse-motion-render-'));
 try{
  const file=join(dir,'preview.mp4');const out=await renderPreview({output:file,allowProvisional:true});assert.equal(out.review_status,'provisional');
  const probe=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8'});assert.equal(probe.status,0,probe.stderr);
  const parsed=JSON.parse(probe.stdout);assert.ok(parsed.format.tags.comment,'MP4 carries full source/review JSON');const record=JSON.parse(parsed.format.tags.comment);assert.equal(record.source.sha256,source.sha256);assert.equal(record.source.license,'CC0-1.0');assert.equal(record.review.status,'provisional');
  const streams=parsed.streams,v=streams.find(s=>s.codec_type==='video'),a=streams.find(s=>s.codec_type==='audio');
  assert.equal(Number(v.nb_frames),240);assert.ok(Math.abs(Number(v.duration)-8)<1/30);
  assert.ok(Math.abs(Number(a.duration)-8)<1/30);assert.ok(Math.abs(Number(v.start_time)-Number(a.start_time))<1/30);
  // Decode actual frames surrounding all three cuts; compare to the shared source renderer.
  const decode=spawnSync('ffmpeg',['-v','error','-i',file,'-vf',"select='eq(n,59)+eq(n,60)+eq(n,119)+eq(n,120)+eq(n,179)+eq(n,180)'",'-fps_mode','passthrough','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],{maxBuffer:6*640*360*3+4096});assert.equal(decode.status,0,decode.stderr.toString());
  const size=640*360*3;assert.equal(decode.stdout.length,6*size);
  for(const [index,frame] of [59,60,119,120,179,180].entries()){
   const expected=framePixels(frame,makeCutList(source));let error=0;
   for(let i=640*45*3;i<size;i++)error+=Math.abs(expected[i]-decode.stdout[index*size+i]);
   assert.ok(error/(size-640*45*3)<4,'encoded frame matches scheduled scene, allowing compression');
  }
  for(let pair=0;pair<3;pair++){
   let difference=0;for(let i=640*45*3;i<size;i++)difference+=Math.abs(decode.stdout[pair*2*size+i]-decode.stdout[(pair*2+1)*size+i]);
   assert.ok(difference/(size-640*45*3)>3,'visible scene change at expected cut frame');
  }
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('missing and crashing FFmpeg leave no output or owned scratch directories',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pulse-motion-failure-')),prior=process.env.PATH;
 try{
  process.env.PATH=dir;await assert.rejects(renderPreview({output:join(dir,'missing.mp4'),allowProvisional:true}));
  await writeFile(join(dir,'ffmpeg'),'#!/bin/sh\nexit 7\n',{mode:0o700});
  await assert.rejects(renderPreview({output:join(dir,'crash.mp4'),allowProvisional:true}));
  const {readdir}=await import('node:fs/promises');assert.deepEqual(await readdir(dir),['ffmpeg']);
 }finally{process.env.PATH=prior;await rm(dir,{recursive:true,force:true});}
});
