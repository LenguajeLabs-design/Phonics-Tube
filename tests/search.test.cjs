const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app=fs.readFileSync('dist/app.js','utf8');
const funcs=app.slice(app.indexOf('function normalizeSearch('),app.indexOf('\nfunction matches('));
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('dist/data.js','utf8')+'\nlet query="";'+funcs+'\nthis.find=q=>{query=q;return [...VIDEOS,...PRACTICE].filter(searchMatches)};this.supports=supportsLesson;',ctx);
for(const q of ['45','lesson 45',' UFLI lesson 45 ','#45']){const results=ctx.find(q);assert.ok(results.length);assert.ok(results.every(v=>ctx.supports(v,45)),q)}
for(const q of ['sh','/sh/','SH']){const results=ctx.find(q);assert.ok(results.length);assert.ok(results.every(v=>v.sound.toLowerCase().split(/[^a-z]+/).includes('sh')),q)}
for(const q of ['short a','a short','Jack Hartmann','vowel teams','r-controlled','magic e'])assert.ok(ctx.find(q).length,q);
assert.equal(ctx.find('zzzznothinghere').length,0);
assert.ok(ctx.find('  ').length>160);
assert.ok(ctx.find('Digraph SH — 4 Minute Phonics').some(v=>v.id==='4m-sh'));
console.log('PASS: sounds, lesson numbers, UFLI labels, titles, creators, categories, word order, whitespace and no results.');
