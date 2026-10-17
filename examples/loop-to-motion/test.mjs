import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {makeCutList, validateCutList, framePixels, csv} from './motion.mjs';
const source=JSON.parse(readFileSync(new URL('./source.json',import.meta.url)));

test('pinned CC0 source bytes are exactly eight seconds of mono PCM16',()=>{
 const b=readFileSync(new URL(source.audio_file,import.meta.url));
 assert.equal(createHash('sha256').update(b).digest('hex'),source.sha256);
 assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
 assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);
 assert.equal(b.readUInt32LE(24),44100);assert.equal(b.readUInt16LE(34),16);
 assert.equal(b.readUInt32LE(40)/2,352800);assert.equal(source.pulse_analysis,null);
});
test('default grid is provisional with exact 30fps bar cuts, not detected beats',()=>{
 const x=makeCutList(source);
 assert.equal(x.review.status,'provisional');assert.equal(x.timing.method,'estimated_fixed_tempo_grid');
 assert.deepEqual(x.cuts.map(c=>c.frame),[0,60,120,180]);
 assert.deepEqual(x.cuts.map(c=>c.time_seconds),[0,2,4,6]);
 assert.equal(x.timing.total_frames,240);assert.deepEqual(x.source,source);
 assert.equal(x.timing.beats_per_cut,4);assert.equal(x.timing.starting_offset_seconds,0);
});
test('fractional tempo/offset grid rounds independent times within half a frame',()=>{
 const x=makeCutList(source,{bpm:119.7,offset:0.037,fps:24});
 x.cuts.slice(1).forEach((c,i)=>{
  const expected=0.037+(i+1)*4*60/119.7;
  assert.ok(Math.abs(c.grid_time_seconds-expected)<1e-10);
  assert.equal(c.frame,Math.round(expected*24));
  assert.ok(Math.abs(c.time_seconds-expected)<=0.5/24+1e-10);
 });
 assert.ok(x.cuts.every(c=>c.frame<192));assert.equal(x.timing.total_frames,192);
});
test('bad tempo, offset and frame rates fail rather than inventing a grid',()=>{
 for(const p of [{bpm:0},{bpm:NaN},{bpm:'120'},{bpm:Infinity},{bpm:241},{offset:-.01},{offset:.5},{offset:NaN},{fps:29.97},{fps:0}])assert.throws(()=>makeCutList(source,p));
});
test('source licence, duration and local path cannot be substituted',()=>{
 for(const p of [{license:'CC-BY-3.0'},{title:'Wrong title'},{page_url:'https://invalid.example/'},{download_url:'https://invalid.example/audio'},{duration_seconds:0},{duration_seconds:Infinity},{audio_file:'../../secret'},{sha256:'bad'},{pulse_analysis:{bpm:120}}])assert.throws(()=>makeCutList({...source,...p}));
});
test('human review requires a note, reviewer and valid date; it remains an attestation',()=>{
 const review={binding:{source_sha256:source.sha256,...makeCutList(source).timing},status:'human_attested',reviewer:'Local reviewer',note:'Listened to the kick at each bar and checked offset.',reviewed_at:'2026-10-17T14:00:00Z'};
 const x=makeCutList(source,{review});assert.equal(x.review.status,'human_attested');assert.deepEqual(x.review,review);
 for(const p of [{note:''},{reviewer:''},{reviewed_at:'bad'},{status:'verified_by_pulse'}])assert.throws(()=>makeCutList(source,{review:{...review,...p}}));
});
test('edited cut frames, source or timing cannot silently retain a valid export',()=>{
 const x=makeCutList(source);assert.doesNotThrow(()=>validateCutList(x,source));
 for(const change of [y=>y.cuts[1].frame++,y=>y.timing.tempo_bpm=121,y=>y.source.sha256='0'.repeat(64),y=>y.cuts.push({...y.cuts[0]}),y=>y.timing.total_frames=241]){
  const y=structuredClone(x);change(y);assert.throws(()=>validateCutList(y,source));
 }
});
test('scene boundaries switch on exact cut frames and stay in range',()=>{
 const x=makeCutList(source);
 for(const f of [0,59,60,119,120,179,180,239]){
  const p=framePixels(f,x,64,36);assert.equal(p.length,64*36*3);
  assert.deepEqual([...p.slice(0,3)],[5,7,23]);
 }
 assert.notDeepEqual(framePixels(59,x,64,36),framePixels(60,x,64,36));
 assert.throws(()=>framePixels(-1,x));assert.throws(()=>framePixels(240,x));
});
test('cut-list CSV carries review state and timing units',()=>{
 const text=csv(makeCutList(source));assert.match(text,/frame,time_seconds,grid_time_seconds,scene,review_status/);
 assert.match(text,/60,2,2,1,provisional/);assert.equal(text.trim().split('\n').length,5);
});
test('a human attestation cannot survive recalculated timing without another review',()=>{
 const initial=makeCutList(source),review={status:'human_attested',reviewer:'QA fixture',note:'Synthetic review fixture, not a musical assertion.',reviewed_at:'2026-10-17T14:00:00Z',binding:{source_sha256:source.sha256,...initial.timing}};
 assert.doesNotThrow(()=>makeCutList(source,{review}));
 assert.throws(()=>makeCutList(source,{bpm:121,review}),/review|timing/i);
 assert.throws(()=>makeCutList(source,{offset:.01,review}),/review|timing/i);
 assert.throws(()=>makeCutList(source,{fps:24,review}),/review|timing/i);
});

test('CSV preserves source and human review; spreadsheet formulas stay inert',()=>{
 const review={status:'human_attested',reviewer:'=QA',note:'Checked \"bar one\", then end.',reviewed_at:'2026-10-17T14:00:00Z',binding:{source_sha256:source.sha256,...makeCutList(source).timing}};
 const text=csv(makeCutList(source,{review}));
 assert.ok(text.includes(source.sha256));assert.ok(text.includes(source.page_url));
 assert.ok(text.includes(source.download_url));assert.ok(text.includes("'=QA"));
 assert.ok(text.includes('Checked ""bar one"", then end.'));assert.ok(text.includes(review.reviewed_at));
});
