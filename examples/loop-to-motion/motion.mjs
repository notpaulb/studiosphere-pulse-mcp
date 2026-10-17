// Local example only. These are estimated grid positions, never detector beat timestamps.
const HASH='31442703b00f36272aa076e34b2c24dd02fef5099ad75be07594c6fd0cc75085';
export function validateSource(s){
 if(!s||s.pol_id!=='pol-original-copper-step-120-drums'||s.license!=='CC0-1.0'
  ||s.title!=='Copper Step 120 drums'
  ||s.page_url!=='https://pulse.studiosphere.space/open-loops/pol-original-copper-step-120-drums'
  ||s.download_url!=='https://pulse.studiosphere.space/open-loops/pol-original-copper-step-120-drums/download'
  ||s.license_url!=='https://creativecommons.org/publicdomain/zero/1.0/'
  ||s.attribution!=='StudioSphere Pulse'||s.review_basis!=='original_synthesis'
  ||s.audio_file!=='assets/copper-step-120-drums.wav'||s.sha256!==HASH
  ||s.duration_seconds!==8||s.sample_rate_hz!==44100||s.sample_frames!==352800
  ||s.creator_tempo_bpm!==120||s.pulse_analysis!==null)throw Error('Source does not match this pinned CC0 example.');
 return s;
}
export function makeCutList(source,{bpm=120,offset=0,fps=30,review={status:'provisional',reviewer:null,note:'Listening and starting-offset review pending.',reviewed_at:null}}={}){
 validateSource(source);
 if(!Number.isFinite(bpm)||bpm<40||bpm>240||!Number.isFinite(offset)||offset<0||offset>=60/bpm||![24,30,60].includes(fps))throw Error('Use 40–240 BPM, offset from zero to less than one beat, and 24, 30 or 60 fps.');
 if(!review||!['provisional','human_attested'].includes(review.status))throw Error('Invalid review state.');
 if(review.status==='human_attested'&&(!review.reviewer?.trim()||review.reviewer.length>80||!review.note?.trim()||review.note.length>500||!Number.isFinite(Date.parse(review.reviewed_at))))throw Error('Human review requires a reviewer, note and date.');
 const total=Math.round(source.duration_seconds*fps);
 const timing={method:'estimated_fixed_tempo_grid',tempo_bpm:bpm,starting_offset_seconds:offset,beats_per_cut:4,fps,duration_seconds:source.duration_seconds,total_frames:total};
 if(review.status==='human_attested'&&canonical(review.binding)!==canonical({source_sha256:source.sha256,...timing}))throw Error('Timing changed: another human review is required.');
 const cuts=[{frame:0,time_seconds:0,grid_time_seconds:0,scene:0}];
 for(let n=1;;n++){
  const time=offset+n*4*60/bpm,frame=Math.round(time*fps);
  if(time>=source.duration_seconds||frame>=total)break;
  if(frame>cuts.at(-1).frame)cuts.push({frame,time_seconds:frame/fps,grid_time_seconds:time,scene:cuts.length});
 }
 return {schema:'pulse.motion-cuts.v1',source:structuredClone(source),timing,review:structuredClone(review),cuts};
}
const canonical=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
export function validateCutList(list,source){
 const t=list?.timing;
 if(!t)throw Error('Missing timing.');
 const expected=makeCutList(source,{bpm:t.tempo_bpm,offset:t.starting_offset_seconds,fps:t.fps,review:list.review});
 if(canonical(list)!==canonical(expected))throw Error('Cut list changed or belongs to another source. Re-export after review.');
 return list;
}
export function csv(list){
 const cell=value=>{let s=String(value??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return /[",\r\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;};
 return 'frame,time_seconds,grid_time_seconds,scene,review_status,source_id,license,license_url,attribution,source_sha256,source_url,download_url,reviewer,reviewed_at,review_note,bpm,offset_seconds,fps\n'+list.cuts.map(c=>[c.frame,c.time_seconds,c.grid_time_seconds,c.scene,list.review.status,list.source.pol_id,list.source.license,list.source.license_url,list.source.attribution,list.source.sha256,list.source.page_url,list.source.download_url,list.review.reviewer,list.review.reviewed_at,list.review.note,list.timing.tempo_bpm,list.timing.starting_offset_seconds,list.timing.fps].map(cell).join(',')).join('\n')+'\n';
}
export function framePixels(frame,list,width=640,height=360){
 if(!Number.isInteger(frame)||frame<0||frame>=list.timing.total_frames||!Number.isInteger(width)||!Number.isInteger(height)||width<16||height<16||width>1920||height>1080)throw Error('Frame outside preview bounds.');
 const data=new Uint8Array(width*height*3);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*3,z=Math.floor(y/height*8);data[i]=5;data[i+1]=7+z;data[i+2]=23+z;
 }
 const cut=list.cuts.findLast(c=>c.frame<=frame),scene=cut.scene%4;
 const colors=[[36,214,255],[67,146,255],[151,139,239],[119,244,255]],color=colors[scene];
 const t=frame/list.timing.fps,phase=t*0.6;
 function rect(x,y,w,h,c){
  const a=Math.max(0,Math.floor(x)),b=Math.min(width,Math.ceil(x+w)),d=Math.max(0,Math.floor(y)),e=Math.min(height,Math.ceil(y+h));
  for(let yy=d;yy<e;yy++)for(let xx=a;xx<b;xx++){const i=(yy*width+xx)*3;data.set(c,i);}
 }
 function line(ax,ay,bx,by,c,thickness=1){
  const steps=Math.max(1,Math.ceil(Math.max(Math.abs(bx-ax),Math.abs(by-ay))));
  for(let n=0;n<=steps;n++)rect(ax+(bx-ax)*n/steps,ay+(by-ay)*n/steps,thickness,thickness,c);
 }
 const w=width,h=height,dim=[19,38,61];
 for(let n=1;n<12;n++)line(w*n/12,h*.15,w*n/12,h*.85,dim);
 for(let n=1;n<6;n++)line(w*.08,h*(.15+n*.14),w*.92,h*(.15+n*.14),dim);
 if(scene===0||scene===3){
  for(let n=0;n<36;n++){
   const a=(.15+.65*Math.abs(Math.sin(n*.38+phase)*Math.cos(n*.13-phase)))*h*.55;
   rect(w*(.13+n*.021),h/2-a/2,w*.010,a,color);
  }
 }else{
  for(let ring=0;ring<4;ring++){
   const r=Math.min(w,h)*(.12+ring*.07),spin=phase*(ring%2?1:-1);
   for(let n=0;n<90;n++){
    const a=n/90*Math.PI*2+spin,b=(n+1)/90*Math.PI*2+spin;
    const stretch=scene===1?1.6:1+Math.sin(phase)*.25;
    line(w/2+Math.cos(a)*r*stretch,h/2+Math.sin(a)*r,w/2+Math.cos(b)*r*stretch,h/2+Math.sin(b)*r,ring%2?dim:color);
   }
   rect(w/2+Math.cos(spin)*r-3,h/2+Math.sin(spin)*r-3,6,6,color);
  }
 }
 return data;
}
