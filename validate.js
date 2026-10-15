// Build-time integrity check: every branch, part reference and picture must resolve.
const fs = require('fs'); const path = require('path'); const dir = __dirname;
const src = ['data.js', 'models.js', 'model-hp14g7.js', 'models-index.js'].map(f => fs.readFileSync(path.join(dir, 'src', f), 'utf8')).join('\n');
const { SYMPTOMS: S, MODELS: M } = new Function(src + '; return { SYMPTOMS, MODELS };')();
const bad = []; const has = f => fs.existsSync(path.join(dir, f));
const checkDeep = (deep, ctx, m) => deep.forEach((n, i) => ['yes', 'no'].forEach(k => {
  const a = n[k]; if (!a) return bad.push(`${ctx} step ${i + 1}: missing ${k}`);
  if (a.go && (a.go < 1 || a.go > deep.length)) bad.push(`${ctx} step ${i + 1}: bad go`);
  if (a.out === 'symptom' && !S.find(s => s.id === a.id)) bad.push(`${ctx}: unknown symptom ${a.id}`);
  if (m && a.out === 'replace') {
    const keys = a.proc ? [].concat(a.proc) : [m.codes[a.code] || m.fru[a.com]].filter(Boolean);
    keys.forEach(pk => { if (!m.procs[pk]) bad.push(`${ctx} step ${i + 1}: unknown part ${pk}`); });
  }
}));
const checkQuick = (quick, ctx, m) => quick.forEach((st, i) => {
  if (st.test && !st.q) bad.push(`${ctx} quick ${i + 1}: test without a question`);
  if (st.info) bad.push(`${ctx} quick ${i + 1}: every step must be a Yes/No question`);
  if (st.test) ['yes', 'no'].forEach(k => {
    const a = st[k]; if (!a) return bad.push(`${ctx} quick ${i + 1}: missing ${k}`);
    if (a.out === 'symptom' && !S.find(s => s.id === a.id)) bad.push(`${ctx} quick ${i + 1}: unknown symptom ${a.id}`);
    if (a.next !== undefined && a.next !== true) bad.push(`${ctx} quick ${i + 1}: ${k} answer has a stray next field`);
    if (a.next !== true && !a.out) bad.push(`${ctx} quick ${i + 1}: ${k} answer leads nowhere`);
    if (m && a.out === 'replace') { const keys = a.proc ? [].concat(a.proc) : [m.codes[a.code] || m.fru[a.com]].filter(Boolean); keys.forEach(pk => m.procs[pk] || bad.push(`${ctx} quick ${i + 1}: unknown part ${pk}`)); }
  });
});
S.forEach(s => { checkDeep(s.deep, `generic/${s.id}`); checkQuick(s.quick, `generic/${s.id}`); });
for (const m of M) {
  for (const s of S) { const o = m.sym[s.id]; checkDeep(o && o.deep || s.deep, `${m.id}/${s.id}`, m); checkQuick(o && o.quick || s.quick, `${m.id}/${s.id}`, m); }
  for (const [sid, o] of Object.entries(m.sym)) [...(o.quick || []), ...(o.deep || [])].forEach(st => {
    if (st.proc && !m.procs[st.proc]) bad.push(`${m.id}/${sid}: unknown step part ${st.proc}`);
    (st.figs || []).forEach(f => has(f[0]) || bad.push(`missing picture ${f[0]}`));
  });
  for (const [k, p] of Object.entries(m.procs)) {
    (p.access || []).forEach(a => m.procs[a] || bad.push(`${m.id}/${k}: unknown access ${a}`));
    (p.figs || []).forEach(f => has(f[0]) || bad.push(`missing picture ${f[0]}`));
    if (p.variants) p.variants.items.forEach(it => p.variants.fields.forEach(([f, , opts]) => opts.some(o => o[0] === it[f]) || bad.push(`${m.id}/${k}: version ${it.pn} has unknown ${f}`)));
  }
  Object.values({ ...m.fru, ...m.codes }).forEach(v => m.procs[v] || bad.push(`${m.id}: unknown mapped part ${v}`));
  m.partsTable.forEach(r => m.procs[r[3]] || bad.push(`${m.id}: parts table row ${r[1]} has unknown part ${r[3]}`));
  [...m.views, ...m.exploded].forEach(f => has(f[0]) || bad.push(`missing picture ${f[0]}`));
}
if (bad.length) { console.error('Integrity check failed:\n' + bad.join('\n')); process.exit(1); }
console.log('integrity ok');
