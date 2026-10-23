import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('detects missing metadata and conflicting canonical evidence',()=>{const codes=analyse(data).issues.map(i=>i.code);assert.ok(codes.includes('title'));assert.ok(codes.includes('canonical'));assert.ok(codes.includes('telephone'));});
test('intentional noindex is an owner review, not an automatic repair',()=>{const r=analyse(data);assert.ok(r.issues.some(i=>i.code==='publishing-review'&&i.message.includes('do not remove')));assert.match(r.pages[2].robots[0],/noindex/);});
test('the standards parser ignores fake headings in scripts and comments',()=>{const d=structuredClone(data);d.pages[0].html+='<script>const x="<h1>fake</h1>";</script><!-- <h1>fake</h1> -->';assert.equal(analyse(d).pages[0].h1s.length,1);});
