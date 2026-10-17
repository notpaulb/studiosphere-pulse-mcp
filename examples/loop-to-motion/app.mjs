import {makeCutList,framePixels,csv} from './motion.mjs';
const $=id=>document.getElementById(id),audio=$('audio'),canvas=$('scene'),ctx=canvas.getContext('2d');
let source,list,ready=false,heard=false,review=null,lastFrame=-1,animation=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function state(text){$('status').textContent=text;}
function draw(){
 if(!list)return;
 const f=Math.min(list.timing.total_frames-1,Math.max(0,Math.floor(audio.currentTime*list.timing.fps)));
 const cut=list.cuts.findLast(c=>c.frame<=f),show=reduced.matches?cut.frame:f;
 if(show!==lastFrame){
  const rgb=framePixels(show,list),image=ctx.createImageData(640,360);
  for(let a=0,b=0;a<rgb.length;a+=3,b+=4){image.data[b]=rgb[a];image.data[b+1]=rgb[a+1];image.data[b+2]=rgb[a+2];image.data[b+3]=255;}
  ctx.putImageData(image,0,0);lastFrame=show;
 }
 $('sceneLabel').textContent='SCENE '+String(cut.scene+1).padStart(2,'0');
 $('seek').value=audio.currentTime;
 $('clock').textContent=`0:${String(Math.floor(audio.currentTime)).padStart(2,'0')} / 0:08`;
}
function loop(){draw();if(!audio.paused)animation=requestAnimationFrame(loop);}
function refreshReview(){
 $('review').disabled=!ready||!list||!heard||!$('reviewer').value.trim()||!$('note').value.trim();
}
function invalidate(message){
 list=null;review=null;lastFrame=-1;cancelAnimationFrame(animation);audio.pause();
 $('review').checked=false;$('review').disabled=true;$('json').disabled=$('csv').disabled=true;
 $('json').textContent='Download provisional cut list';$('badge').textContent='Timing unavailable · review required';$('badge').classList.remove('reviewed');
 $('timeline').replaceChildren();$('sceneLabel').textContent='NO GRID';ctx.clearRect(0,0,640,360);state(message);
}
function rebuild(){
 try{
  const options={bpm:$('bpm').valueAsNumber,offset:$('offset').valueAsNumber,fps:Number($('fps').value)};
  if(review)options.review=review;
  list=makeCutList(source,options);lastFrame=-1;
  $('offset').max=String(Math.max(0,60/options.bpm-.001));
  $('badge').textContent=review?'Human-attested grid · review before use':'Provisional timing · listening review pending';
  $('badge').classList.toggle('reviewed',!!review);
  $('json').textContent=review?'Download reviewed cut list':'Download provisional cut list';
  $('json').disabled=$('csv').disabled=false;
  $('timeline').replaceChildren(...list.cuts.map(c=>{const x=document.createElement('span');x.textContent=`${c.time_seconds.toFixed(3)}s / f${c.frame}`;return x;}));
  draw();state(review?'Human review recorded locally. Changing timing clears it.':reduced.matches?'Ready. Reduced motion: scene changes only. Timing still needs listening review.':'Ready. Press Play, listen, then review tempo and offset.');
 }catch(e){invalidate(e.message);}
}
function clearReview(){review=null;$('review').checked=false;rebuild();refreshReview();}
for(const id of ['bpm','offset','fps'])$(id).addEventListener('input',clearReview);
for(const id of ['reviewer','note'])$(id).addEventListener('input',clearReview);
$('review').addEventListener('change',()=>{
 review=$('review').checked?{status:'human_attested',reviewer:$('reviewer').value.trim(),note:$('note').value.trim(),reviewed_at:new Date().toISOString(),binding:{source_sha256:source.sha256,...list.timing}}:null;rebuild();
});
$('play').addEventListener('click',async()=>{
 if(!ready||!list)return;
 if(audio.paused){try{if(audio.currentTime>=7.99)audio.currentTime=0;await audio.play();}catch{state('Playback could not start. Use Play again or download the WAV.');}}
 else audio.pause();
});
$('stop').addEventListener('click',()=>{audio.pause();audio.currentTime=0;draw();state('Stopped. Your timing and review stay on this page.');});
$('seek').addEventListener('input',()=>{audio.currentTime=Number($('seek').value);draw();});
audio.addEventListener('play',()=>{heard=true;refreshReview();$('play').textContent='Pause';$('play').setAttribute('aria-label','Pause loop and motion preview');cancelAnimationFrame(animation);loop();state('Playing locally. Compare the scene changes with the loop’s bar starts.');});
audio.addEventListener('pause',()=>{cancelAnimationFrame(animation);$('play').textContent='Play';$('play').setAttribute('aria-label','Play loop and motion preview');draw();});
audio.addEventListener('ended',()=>state('Preview finished. Replay, adjust the grid, or record your listening review.'));
audio.addEventListener('error',()=>{ready=false;invalidate('Local audio is unavailable. Reload or use the source download; no analysis was started.');$('settings').disabled=true;$('play').disabled=$('stop').disabled=$('seek').disabled=true;});
reduced.addEventListener('change',()=>{lastFrame=-1;draw();});
function download(text,type,name){
 const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 state('Download requested. Keep source, licence and review state with the cut list.');
}
$('json').addEventListener('click',()=>{if(list)download(JSON.stringify(list,null,2)+'\n','application/json','pulse-motion-cuts.json');});
$('csv').addEventListener('click',()=>{if(list)download(csv(list),'text/csv','pulse-motion-cuts.csv');});
try{
 const response=await fetch('./source.json');if(!response.ok)throw Error('Source metadata unavailable.');source=await response.json();makeCutList(source);
 const wav=await fetch('./'+source.audio_file);if(!wav.ok)throw Error('Local WAV unavailable.');const bytes=await wav.arrayBuffer();
 const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!==source.sha256)throw Error('Audio hash mismatch. Stop and restore the pinned CC0 source.');
 const loaded=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Local audio metadata timed out. Reload to retry.')),5000);audio.addEventListener('loadedmetadata',()=>{clearTimeout(timer);resolve();},{once:true});audio.addEventListener('error',()=>{clearTimeout(timer);reject(Error('Local audio could not be decoded.'));},{once:true});});
 audio.preload='metadata';audio.src=URL.createObjectURL(new Blob([bytes],{type:'audio/wav'}));await loaded;
 if(Math.abs(audio.duration-source.duration_seconds)>.001)throw Error('Local audio duration mismatch.');
 ready=true;$('settings').disabled=false;$('play').disabled=$('stop').disabled=$('seek').disabled=false;rebuild();
}catch(e){ready=false;invalidate(e.message+' Serve this repository on localhost; do not open the HTML with file://.');}
