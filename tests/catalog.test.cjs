const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('dist/data.js', 'utf8');
const context = vm.createContext({});
vm.runInContext(source + '\nthis.catalog = {VIDEOS, PRACTICE, LESSON_NAMES, GROUPS, lessonGroup};', context);
const {VIDEOS,PRACTICE,LESSON_NAMES,GROUPS,lessonGroup} = context.catalog;
assert.equal(LESSON_NAMES.length, 128);
assert.equal(new Set([...VIDEOS,...PRACTICE].map(x=>x.id)).size, VIDEOS.length+PRACTICE.length);
for(const v of VIDEOS){
  assert.ok(v.seconds>0 && v.seconds<=300, `${v.id} exceeds duration limit`);
  assert.match(v.youtube,/^[A-Za-z0-9_-]{11}$/);
  assert.ok(v.lesson>=1 && v.end<=128 && v.lesson<=v.end);
  assert.ok(GROUPS.some(g=>g[0]===v.group));
  assert.equal(v.directUrl,null,'Unlicensed media must not be self-hosted');
  assert.notEqual(v.permission,'granted');
  assert.ok(v.note.length>15);
}
for(let i=1;i<=128;i++)assert.ok(GROUPS.some(g=>g[0]===lessonGroup(i)));
for(const p of PRACTICE){assert.ok(p.words.length>0);assert.ok(p.words.every(w=>w.length>0 && w.every(s=>typeof s==='string' && s.length>0)));}
assert.deepEqual(Array.from(PRACTICE[0].words.flat()).filter(s=>!['a','m','s','t'].includes(s)),[]);
assert.ok(!fs.readFileSync('dist/index.html','utf8').includes('fonts.googleapis'));
console.log(`PASS: ${LESSON_NAMES.length} lessons, ${VIDEOS.length} videos within 5 minutes, ${PRACTICE.length} original practice activities, no unlicensed direct media.`);
const context2=vm.createContext({});
vm.runInContext(source+';this.supports=supportsLesson;',context2);
const supports=context2.supports;
assert.ok(VIDEOS.some(v=>supports(v,52)&&v.sound==='nk'));
assert.ok(VIDEOS.some(v=>supports(v,89)&&v.sound==='oo /ʊ/'));
assert.ok(VIDEOS.some(v=>supports(v,90)&&v.sound==='oo /ū/'));
const ai=VIDEOS.find(v=>v.id==='ai-focus');
assert.ok(supports(ai,84)&&supports(ai,97));
assert.equal(supports(ai,90),false,'Review mappings must not include unrelated intermediate lessons');
for(const v of VIDEOS.filter(v=>v.lessons))assert.ok(v.lessons.every(n=>Number.isInteger(n)&&n>=1&&n<=128));
const seen=new Set(VIDEOS.map(v=>v.youtube));
assert.equal(seen.size,VIDEOS.length,'Do not duplicate the same source video as multiple cards');
console.log('PASS: exact lesson mapping, separate vowel pronunciations and unique source videos.');
