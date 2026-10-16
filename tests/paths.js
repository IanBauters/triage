const { chromium } = require('playwright'); const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..') + '/';
const src = require('../src/files.json').map(f => fs.readFileSync(dir + 'src/' + f, 'utf8')).join('\n');
const { SYMPTOMS: S, MODELS: M } = new Function(src + '; return { SYMPTOMS, MODELS };')();
// Every path: y on symptom, n through all quick checks, then every branch of the deep dive (plus one quick "yes" path).
function paths(sym) {
  const out = [];
  const deep = (i, keys, seen) => { if (seen.has(i)) return; const n = sym.deep[i - 1];
    for (const [k, a] of [['y', n.yes], ['n', n.no]]) { if (a.go) deep(a.go, keys + k, new Set([...seen, i])); else out.push(keys + k); } };
  let usedFixYes = false;
  const quick = (qi, keys) => {
    if (qi >= sym.quick.length) return deep(1, keys, new Set());
    const st = sym.quick[qi];
    if (st.info) return quick(qi + 1, keys + 'E');
    if (st.test) { for (const [k, a] of [['y', st.yes], ['n', st.no]]) { if (a.next) quick(qi + 1, keys + k); else out.push(keys + k); } return; }
    if (!usedFixYes) { usedFixYes = true; out.push(keys + 'y'); }
    quick(qi + 1, keys + 'n');
  };
  quick(0, 'y'); return out;
}
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && !/ERR_|net::/.test(m.text()) && errs.push(m.text()));
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await p.addInitScript(() => { let t = 0; performance.now = () => (t += 1000); });
  await p.goto('file://' + dir + 'index.html');
  let total = 0, fails = [];
  for (const prof of [null, ...M]) {
    await p.selectOption('#f-profile', prof ? prof.id : '');
    for (const base of S) {
      const sym = prof && prof.sym[base.id] ? { ...base, ...prof.sym[base.id] } : base;
      for (const keys of paths(sym)) {
        total++; const before = errs.length;
        await p.click('#brand'); await p.click(`[data-sym="${base.id}"]`);
        for (const k of keys) await p.keyboard.press(k === 'E' ? 'Enter' : k);
        const ok = await p.evaluate(() => !!document.querySelector('.tg-result-head, .tg-flash'));
        if (!ok || errs.length > before) fails.push(`${prof ? prof.id : 'generic'}/${base.id}: ${keys} ${errs.slice(before).join(' | ')}`);
      }
    }
  }
  console.log('paths', total, 'failures', fails.length); fails.slice(0, 20).forEach(f => console.log(f));
  if (fails.length) process.exitCode = 1;
  await b.close();
})();
