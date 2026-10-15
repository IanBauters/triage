(() => {
  const $ = s => document.querySelector(s);
  const ic = n => `<span class="icon" aria-hidden="true">${ICONS[n] || ''}</span>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  const baseSym = Object.fromEntries(SYMPTOMS.map(s => [s.id, s]));
  const byModel = Object.fromEntries(MODELS.map(m => [m.id, m]));

  // Keep Bootstrap's own theme switch in step with the viewer's theme.
  const root = document.documentElement;
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const syncTheme = () => {
    const t = root.getAttribute('data-theme');
    root.setAttribute('data-bs-theme', t === 'dark' || (!t && mq.matches) ? 'dark' : 'light');
  };
  syncTheme();
  mq.addEventListener?.('change', syncTheme);
  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  document.querySelectorAll('[data-icon]').forEach(el => { el.insertAdjacentHTML('afterbegin', ic(el.dataset.icon)); });

  // ---------- Model profiles ----------
  $('#f-profile').innerHTML = `<option value="">Generic Chromebook</option>` +
    MODELS.map(m => `<option value="${m.id}">${esc(m.name)}</option>`).join('');
  const model = () => byModel[$('#f-profile').value] || null;
  const getSym = id => {
    const b = baseSym[id]; const m = model(); const o = m && m.sym[id];
    return o ? { ...b, ...o, synced: true } : { ...b, synced: false };
  };

  // ---------- Device panel ----------
  const fields = ['profile', 'mt', 'serial', 'asset', 'model', 'form', 'managed', 'user'];
  const dev = () => ({
    profile: $('#f-profile').value, mt: $('#f-mt').value.trim().toUpperCase(), model: $('#f-model').value.trim(),
    serial: $('#f-serial').value.trim(), asset: $('#f-asset').value.trim(),
    form: $('#f-form').value, managed: $('#f-managed').checked, user: $('#f-user').value.trim()
  });
  try {
    const saved = JSON.parse(localStorage.getItem('tg-device') || 'null');
    if (saved) fields.forEach(f => { const el = $('#f-' + f); if (el && saved[f] !== undefined) el.type === 'checkbox' ? (el.checked = saved[f]) : (el.value = saved[f]); });
    if (!byModel[$('#f-profile').value]) $('#f-profile').value = '';
  } catch (e) {}

  const deviceName = () => { const m = model(); const d = dev(); return m ? m.name : (d.model || 'Chromebook'); };

  function renderDev() {
    const d = dev(); const m = model();
    $('#dev-name').textContent = deviceName() + (m && d.model ? ` · ${d.model}` : '');
    $('#dev-serial-show').textContent = [d.mt && `Machine type ${d.mt}`, d.serial, d.asset].filter(Boolean).join(' · ') || 'No serial entered';
    const head = $('.tg-device-head');
    const old = head.querySelector('.photo'); if (old) old.remove();
    head.querySelector('.glyph').hidden = !!(m && m.photo);
    if (m && m.photo) head.insertAdjacentHTML('afterbegin', `<img class="photo" src="${m.photo}" alt="${esc(m.name)}">`);
    // Machine-type hint
    const hint = $('#mt-hint');
    const found = d.mt.length >= 4 && MODELS.find(x => x.mts.some(t => d.mt.startsWith(t)));
    if (found && found !== m) { hint.hidden = false; hint.innerHTML = `Machine type ${esc(d.mt)} is a <strong>${esc(found.name)}</strong>. <button type="button" class="btn btn-link btn-sm p-0 align-baseline" data-use-model="${found.id}">Use this model</button>`; }
    else if (m && d.mt.length >= 4 && !m.mts.some(t => d.mt.startsWith(t))) { hint.hidden = false; hint.innerHTML = `Machine type ${esc(d.mt)} is not listed for this model (${m.mts.join(', ')}). Check the label on the bottom cover.`; }
    else hint.hidden = true;
    try { localStorage.setItem('tg-device', JSON.stringify(d)); } catch (e) {}
    renderManual();
    renderCrumbs();
    $('#tab-parts').hidden = !m;
    if (state.view === 'result' || tab !== 'trouble') renderBody();
  }

  function renderManual() {
    const m = model(); const p = $('#manual-panel');
    p.hidden = !m; if (!m) return;
    $('#manual-body').innerHTML = `
      <div class="tg-man-meta">${m.mts.length ? `Machine types ${m.mts.join(', ')}.` : esc(m.idHint || '')} Steps, part names and pictures come from ${esc(m.maker)}.</div>
      <ul class="tg-man-list">${m.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
      <div class="tg-man-btns">
        ${m.views.length ? `<button type="button" class="btn-chip" data-gallery="views">${ic('laptop')}Ports and controls</button>` : ''}
        <button type="button" class="btn-chip" data-gallery="exploded">${ic('box-seam')}Exploded views</button>
        ${m.procs.shim ? `<button type="button" class="btn-chip" data-proc="shim">${ic('usb-drive')}USB repair shim</button>` : ''}
        <button type="button" class="btn-chip" data-tab="parts">${ic('cpu')}All parts</button>
      </div>`;
  }

  function onModelChange() {
    const m = model();
    if (m) $('#f-form').value = m.form;
    const sym = state.sym;
    renderDev();
    if (sym && ['symptom', 'quick', 'deep', 'result'].includes(state.view)) {
      log = []; hist = []; state = { view: 'home' }; push({ view: 'symptom', sym });
      toast(m ? `Switched to ${m.name}. Restarted with ${m.maker}’s steps.` : 'Switched to generic steps.');
    } else render();
  }
  $('#f-profile').addEventListener('change', onModelChange);
  $('#dev-form').addEventListener('input', e => { if (e.target.id !== 'f-profile') renderDev(); });
  $('#dev-form').addEventListener('submit', e => e.preventDefault());

  // ---------- State ----------
  let state = { view: 'home' };
  let log = [];
  let hist = [];
  let tab = 'trouble';
  let filter = '';

  // logBefore: log length before the answer that led here, so Back and rollback remove that answer too.
  const push = (next, logBefore = log.length) => {
    const prev = { state, tab };
    hist.push({ state, logLen: logBefore }); state = next; tab = 'trouble';
    try { render(); window.scrollTo?.({ top: 0 }); }
    catch (err) {
      // Roll back so a broken step never leaves the answer half-recorded.
      hist.pop(); state = prev.state; log = log.slice(0, logBefore); tab = prev.tab; render();
      toast('That step could not be shown. Nothing was recorded.'); console.error(err);
    }
  };
  const back = () => { if (!hist.length) return; const h = hist.pop(); state = h.state; log = log.slice(0, h.logLen); tab = 'trouble'; render(); };
  const reset = () => { state = { view: 'home' }; log = []; hist = []; picks = {}; tab = 'trouble'; render(); };
  // Facts chosen for parts with several versions (processor, memory, touchscreen...), per part.
  let picks = {};
  const pickedPart = (key, v) => {
    const sel = picks[key] || {};
    if (!v.fields.every(([f]) => sel[f])) return { done: false };
    const hit = v.items.find(it => v.fields.every(([f]) => it[f] === sel[f]));
    return { done: true, pn: hit && hit.pn };
  };
  const addLog = (phase, text, ans, src) => log.push({ phase, sym: state.sym, text: strip(text), ans, src });

  // Ignore a second tap that lands right after the screen changed (double-clicks, fast double taps).
  let lastRender = 0;
  const tooSoon = () => performance.now() - lastRender < 350;

  function answer(yes) {
    if (tooSoon()) return;
    const s = getSym(state.sym);
    const before = log.length;
    if (state.view === 'symptom') {
      if (!yes) { push({ view: 'home' }); return; }
      addLog('Symptom', `Symptoms match “${s.title}”.`, 'Y');
      push(s.quick.length ? { view: 'quick', sym: s.id, qi: 0 } : { view: 'deep', sym: s.id, di: 1 }, before);
    } else if (state.view === 'quick') {
      const step = s.quick[state.qi];
      if (step.info) return;
      if (step.test) {
        // A test asks its own question; each answer either continues or leads somewhere specific.
        addLog('Quick Check', step.q, yes ? 'Y' : 'N', step.src);
        if (step.set === 'managed') { $('#f-managed').checked = yes; renderDev(); }
        const act = yes ? step.yes : step.no;
        if (act.next === true) nextQuick(s, before);
        else if (act.out === 'symptom') push({ view: 'symptom', sym: act.id, flash: `Redirected from ${s.title}: “${step.q}” ${yes ? 'Yes' : 'No'}.` }, before);
        else push({ view: 'result', sym: s.id, outcome: act }, before);
        return;
      }
      addLog('Quick Check', step.t, yes ? 'Y' : 'N', step.src);
      if (yes) push({ view: 'result', sym: s.id, outcome: { out: 'resolved', via: 'Quick Check' } }, before);
      else nextQuick(s, before);
    } else if (state.view === 'deep') {
      const node = s.deep[state.di - 1];
      addLog('Deep Dive', `${state.di}. ${node.q}`, yes ? 'Y' : 'N', node.src);
      const act = yes ? node.yes : node.no;
      if (act.go) push({ view: 'deep', sym: s.id, di: act.go }, before);
      else if (act.out === 'symptom') push({ view: 'symptom', sym: act.id, flash: `Redirected from ${s.title}, Deep Dive step ${state.di}.` }, before);
      else push({ view: 'result', sym: s.id, outcome: act }, before);
    }
  }
  function nextQuick(s, before) {
    if (state.qi + 1 < s.quick.length) push({ view: 'quick', sym: s.id, qi: state.qi + 1 }, before);
    else push({ view: 'deep', sym: s.id, di: 1 }, before);
  }
  // Instruction steps (power off, take photos) only record that they were done.
  function continueTest() {
    if (tooSoon() || state.view !== 'quick') return;
    const s = getSym(state.sym); const step = s.quick[state.qi];
    if (!step.info) return;
    const before = log.length;
    addLog('Quick Check', step.t, 'D', step.src);
    nextQuick(s, before);
  }

  // ---------- Procedures and figures ----------
  const procsFor = o => {
    const m = model(); if (!m || o.out !== 'replace') return [];
    const keys = o.proc ? [].concat(o.proc) : [m.codes[o.code] || m.fru[o.com]].filter(Boolean);
    return keys.map(k => m.procs[k] && { key: k, ...m.procs[k] }).filter(Boolean);
  };
  const pno = () => '';
  const procLabel = p => `${pno(p) ? pno(p) + ' ' : ''}${p.name}`;
  const lcFirst = t => { const w = t.split(' ')[0]; return w.length > 1 && /^[A-Z][^A-Z]*$/.test(w) ? t[0].toLowerCase() + t.slice(1) : t; };

  const figGrid = figs => figs && figs.length ? `<div class="tg-figs">${figs.map(([src, cap]) =>
    `<figure class="tg-fig"><button type="button" data-fig="${esc(src)}" data-cap="${esc(cap)}" aria-label="Enlarge: ${esc(cap)}"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy"></button><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>` : '';

  const procLink = key => {
    const m = model(); const p = m && m.procs[key]; if (!p) return '';
    return `<button type="button" class="tg-proclink" data-proc="${key}">${ic('book')}${pno(p) ? `<span class="no">${esc(pno(p))}</span>` : ''}${esc(p.name)}</button>`;
  };

  function procCard(p, opts = {}) {
    const m = model();
    const chain = (p.access || []).map(k => `<button type="button" class="btn-chip" data-proc="${k}">${esc(procLabel(m.procs[k]))}</button>`).join('<span class="sep">→</span>');
    return `<div class="tg-proc">
      <div class="tg-proc-head">${pno(p) ? `<span class="no">${esc(pno(p))}</span>` : ''}<span class="nm">${esc(p.name)}</span>
        ${p.cru ? `<span class="badge-cru">${esc(p.cru)}</span>` : ''}</div>
      ${chain ? `<div class="tg-chain"><span class="lbl">Remove first, in order:</span>${chain}</div>` : ''}
      ${p.steps ? `<div class="k">Steps</div><ol>${p.steps.map(x => `<li>${x}</li>`).join('')}</ol>` : (p.figs ? `<p class="mb-0 text-body-secondary" style="font-size:13px">Follow the numbered callouts in the illustration, in order.</p>` : '')}
      ${p.variants ? (() => { const v = p.variants; const sel = picks[p.key] || {}; const r = pickedPart(p.key, v);
        return `<div class="k">Find the part number${v.note ? ` · ${esc(v.note)}` : ''}</div>
        <div class="tg-picks">${v.fields.map(([f, label, opts]) => `<div class="tg-pick"><span class="lbl">${esc(label)}</span><div class="btn-group btn-group-sm" role="group" aria-label="${esc(label)}">${opts.map(([val, txt]) => `<button type="button" class="btn ${sel[f] === val ? 'btn-primary' : 'btn-outline-secondary'}" data-pick="${p.key}|${f}|${val}" aria-pressed="${sel[f] === val}">${esc(txt)}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="tg-pn">${r.done ? (r.pn ? `Part number <span class="mono">${esc(r.pn)}</span>` : 'This combination does not exist. Check the label on the old part.') : 'Choose every option to see the part number.'}</div>`; })() : ''}
      ${p.partNo ? `<div class="k">Part number${Array.isArray(p.partNo) ? ' (choose the version on the old board)' : ''}</div>${Array.isArray(p.partNo) ? `<table class="tg-screws"><tbody>${p.partNo.map(([l, n]) => `<tr><td>${esc(l)}</td><td class="mono">${esc(n)}</td></tr>`).join('')}</tbody></table>` : `<div class="mono" style="font-size:13px">${esc(p.partNo)}</div>`}` : ''}
      ${p.screws ? `<div class="k">Screws</div><table class="tg-screws mono"><tbody>${p.screws.map(s => `<tr><td>${esc(s[0])}</td><td>× ${s[1]}</td><td>${esc(s[2] || '')}</td></tr>`).join('')}</tbody></table>` : ''}
      ${p.attention ? p.attention.map(a => `<div class="tg-warn"><strong>Attention:</strong> ${esc(a)}</div>`).join('') : ''}
      ${p.install ? `<div class="k">When installing</div><ul class="tg-list">${p.install.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      ${opts.noFigs ? '' : figGrid(p.figs)}
    </div>`;
  }

  // Modal (Bootstrap markup, opened without Bootstrap's JS)
  let lastFocus = null;
  function openModal(title, html) {
    lastFocus = document.activeElement;
    $('#viewer-title').textContent = title; $('#viewer-body').innerHTML = html;
    const mdl = $('#viewer'); const bd = $('#viewer-backdrop');
    bd.hidden = false; mdl.style.display = 'block'; document.body.classList.add('modal-open');
    requestAnimationFrame(() => { if (mdl.style.display === 'block') { mdl.classList.add('show'); bd.classList.add('show'); } });
    mdl.setAttribute('aria-modal', 'true'); mdl.removeAttribute('aria-hidden'); $('#viewer-close').focus();
  }
  function closeModal() {
    const mdl = $('#viewer'); const bd = $('#viewer-backdrop');
    mdl.classList.remove('show'); bd.classList.remove('show'); document.body.classList.remove('modal-open');
    mdl.style.display = 'none'; bd.hidden = true; mdl.setAttribute('aria-hidden', 'true'); mdl.removeAttribute('aria-modal');
    lastFocus?.focus?.();
  }
  const isModalOpen = () => $('#viewer').style.display === 'block';
  const bigFig = (src, cap) => `<div class="tg-big"><img src="${esc(src)}" alt="${esc(cap)}"></div><div class="tg-big-cap">${esc(cap)}</div>`;

  // ---------- Rendering ----------
  const STAGES = ['Symptom', 'Quick Check', 'Deep Dive', 'Result'];
  const stageIdx = { home: -1, symptom: 0, quick: 1, deep: 2, result: 3 };

  function renderCrumbs() {
    const parts = [esc(deviceName())];
    if (state.sym) parts.push(esc(baseSym[state.sym].title));
    $('#crumbs').innerHTML = parts.map((p, i) => `${ic('chevron-right')}<span class="${i === parts.length - 1 ? 'cur' : ''}">${p}</span>`).join('');
  }

  function renderRefs() {
    let cur = null;
    if (state.sym) {
      const s = getSym(state.sym);
      if (state.view === 'quick') cur = s.quick[state.qi].ref;
      if (state.view === 'deep') cur = s.deep[state.di - 1].ref;
    }
    $('#refs').innerHTML = Object.entries(REFS).map(([k, r]) =>
      `<li class="${k === cur ? 'active' : ''}"><a href="${r.url}" target="_blank" rel="noopener">${esc(r.label)}</a></li>`).join('');
  }

  function renderHead() {
    const s = state.sym && getSym(state.sym);
    const tabTitles = { log: 'Completed steps', codes: 'Repair codes', parts: 'Parts and procedures' };
    $('#title').textContent = tabTitles[tab] || (state.view === 'home' ? 'Select a symptom' : s.title);
    $('#back').disabled = !hist.length || tab !== 'trouble';
    const si = stageIdx[state.view];
    $('#stages').innerHTML = si < 0 || tab !== 'trouble' ? '' : STAGES.map((t, i) =>
      `<span class="tg-stage ${i < si ? 'done' : ''} ${i === si ? 'on' : ''}"><span class="dot"></span>${t}</span>`).join('');
    let p = 0;
    if (state.view === 'symptom') p = 8;
    if (state.view === 'quick') p = 12 + 30 * (state.qi / s.quick.length);
    if (state.view === 'deep') p = 45 + 50 * ((state.di - 1) / s.deep.length);
    if (state.view === 'result') p = 100;
    $('#progress').style.width = (tab === 'trouble' ? p : 0) + '%';
    if (tab === 'parts' && !model()) tab = 'trouble';
    document.querySelectorAll('.tg-tab').forEach(b => { const on = b.dataset.tab === tab; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
    $('#log-count').textContent = log.length;
  }

  const managedNote = step => step.managed && dev().managed
    ? `<div class="tg-note">${ic('building')}<div><strong>Enrolled device.</strong> Powerwash or recovery wipes local data; the Chromebook re-enrolls into your domain automatically if forced re-enrollment is on, and your admin policy may block Powerwash entirely.</div></div>` : '';
  const warnBox = step => step.warn ? `<div class="tg-warn"><strong>Warning:</strong> ${step.warn}</div>` : '';
  const refLink = step => step.ref ? `<a class="tg-ref-link" href="${REFS[step.ref].url}" target="_blank" rel="noopener">${ic('box-arrow-up-right')}${esc(REFS[step.ref].label)}</a>` : '';
  const srcBadge = () => '';
  const stepExtras = step => {
    const m = model();
    const p = step.proc && m && m.procs[step.proc];
    const figs = step.figs || (p && p.figs) || [];
    return `${warnBox(step)}${managedNote(step)}${figGrid(figs)}<div class="d-flex flex-wrap gap-2 align-items-center">${step.proc ? procLink(step.proc) : ''}${refLink(step)}</div>`;
  };
  const modelChip = s => {
    const m = model();
    if (!m) return '';
    return s.synced
      ? `<div class="tg-model-chip">${ic('book')}${esc(m.maker)}’s repair steps for the ${esc(m.name)}</div>`
      : `<div class="tg-model-chip">${ic('book')}Generic steps · ${esc(m.name)} part names</div>`;
  };

  function setAnswer(q, buttons) {
    const el = $('#answer');
    if (!buttons) { el.hidden = true; el.innerHTML = ''; return; }
    el.hidden = false;
    el.innerHTML = `<div class="q">${q}</div><div class="btns">${buttons}</div>`;
  }
  const YN = `<button class="btn-yn yes" id="btn-yes" type="button">${ic('check2')}Yes <span class="k">Y</span></button><button class="btn-yn no" id="btn-no" type="button">${ic('x-lg')}No <span class="k">N</span></button>`;

  function renderHome() {
    const m = model();
    const f = filter.toLowerCase();
    const list = SYMPTOMS.map(s => getSym(s.id)).filter(s => !f || (s.title + ' ' + s.blurb + ' ' + s.symptoms.join(' ')).toLowerCase().includes(f));
    const tile = s => `<button class="tg-sym ${s.id === 'roadmap' ? 'feature' : ''}" data-sym="${s.id}" type="button"><span class="ic">${ic(s.icon)}</span><span><strong>${esc(s.title)}</strong><small>${esc(s.blurb)}${m && s.synced ? ` <span class="tg-src">${esc(m.maker)}</span>` : ''}</small></span></button>`;
    $('#body').innerHTML = `
      <div class="tg-eyebrow">Troubleshooting</div>
      <h2 class="lead-title">What is the user reporting?</h2>
      <p class="text-body-secondary mb-4">${m
        ? `Charts marked <span class="tg-src">${esc(m.maker)}</span> use ${esc(m.maker)}’s own repair steps for the ${esc(m.name)}, with its part names and pictures. The others use generic steps.`
        : 'Pick the symptom that matches best. Each one runs the Quick Checks first, then a numbered Deep Dive that ends in a repair code. Choose a model on the left to get steps for that model.'}</p>
      ${list.length ? `<div class="tg-symgrid">${list.map(tile).join('')}</div>` : `<div class="tg-empty">No symptom matches “${esc(filter)}”. Try a broader word such as “power”, “screen” or “wifi”.</div>`}`;
    setAnswer();
  }

  function renderSymptom() {
    const s = getSym(state.sym);
    $('#body').innerHTML = `
      ${state.flash ? `<div class="tg-flash">${ic('signpost-split')}${esc(state.flash)}</div>` : ''}
      ${modelChip(s)}
      <h2 class="lead-title">Symptoms</h2>
      <ul class="tg-symlist">${s.symptoms.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="tg-causes">
        <div class="tg-cause"><div class="k">Likely causes</div>${esc(s.likely)}</div>
        <div class="tg-cause"><div class="k">Unlikely causes</div>${esc(s.unlikely)}</div>
      </div>
      <div class="tg-h3">Quick Check (${s.quick.length} steps)</div>
      <ol class="tg-qlist">${s.quick.map(q => `<li>${esc(q.t)}</li>`).join('')}</ol>`;
    setAnswer('Do the symptoms above describe the issue?', YN);
  }

  function renderQuick() {
    const s = getSym(state.sym);
    const step = s.quick[state.qi];
    $('#body').innerHTML = `
      ${modelChip(s)}
      <div class="tg-eyebrow">Quick Check <span class="step-no">${state.qi + 1}/${s.quick.length}</span>${step.test ? '<span class="tg-src">Test</span>' : ''}${srcBadge(step)}</div>
      <h2 class="lead-title">${esc(step.t)}</h2>
      <p>${step.b}</p>
      ${stepExtras(step)}
      <div class="tg-h3 mt-4">Quick Check progress</div>
      <ol class="tg-qlist">${s.quick.map((q, i) => `<li class="${i === state.qi ? 'now' : i < state.qi ? 'past' : ''}">${esc(q.t)}</li>`).join('')}</ol>`;
    if (step.info) setAnswer('Do this first, then continue.', `<button class="btn-yn primary" id="btn-continue" type="button">${ic('check2')}Done, continue <span class="k">Enter</span></button>`);
    else if (step.test) setAnswer(esc(step.q), YN);
    else setAnswer('Did this resolve the issue?', YN);
  }

  function renderDeep() {
    const s = getSym(state.sym);
    const node = s.deep[state.di - 1];
    $('#body').innerHTML = `
      ${modelChip(s)}
      <div class="tg-eyebrow">Deep Dive <span class="step-no">Step ${state.di} of ${s.deep.length}</span>${srcBadge(node)}</div>
      <h2 class="lead-title">${esc(node.q)}</h2>
      <p>${node.c}</p>
      ${stepExtras(node)}`;
    setAnswer(esc(node.q), YN);
  }

  function outcomeInfo(o) {
    const d = dev();
    const after = 'After replacement, run the Diagnostics app tests that apply and retest for the user’s original issue to confirm the new part works with the rest of the system.';
    const procs = procsFor(o);
    switch (o.out) {
      case 'replace': {
        const part = procs.length ? procs.map(p => p.display || p.name).join(' and ') : (o.part || PARTS[o.com]);
        return { cls: 'fail', icon: 'exclamation-octagon', head: 'A Chromebook failure has been diagnosed', next: `Replace the ${procs.map(p => lcFirst(p.display || p.name)).join(' and ') || lcFirst(part)}.`, more: [o.extra, procs.length ? null : after].filter(Boolean), code: o.code, com: o.com, part, procs };
      }
      case 'resolved': return { cls: 'ok', icon: 'check2-circle', head: 'The issue is resolved', next: o.via ? 'Resolved during the Quick Check. No parts are required.' : 'Resolved during the Deep Dive. No parts are required.', more: ['Return the Chromebook to the user and note the step that fixed it.'], code: 'R00', com: '—' };
      case 'external': return { cls: 'ok', icon: 'check2-circle', head: 'The Chromebook is not at fault', next: 'The problem is in the user’s own accessory or cable.', more: ['Replace or repair the accessory. No Chromebook parts are required.'], code: 'X00', com: '—' };
      case 'hold': return { cls: 'esc', icon: 'exclamation-triangle', head: o.head || 'Back up the data first', next: o.msg || 'Later steps can erase everything stored on the Chromebook.', more: o.more || ['Copy the user’s Downloads folder to Google Drive or a USB drive. Then restart this symptom.'], code: 'U00', com: '—' };
      case 'nodup': return { cls: 'ok', icon: 'check2-circle', head: 'The issue cannot be duplicated', next: 'No hardware failure was found.', more: [o.extra, 'Ask the user for more detail on when the issue happens. If it is intermittent, run the Diagnostics app tests again over a longer period before closing the case.', model() && model().id === 'lenovo-14e-g2' ? 'Lenovo: do not replace a part because of a single failure you cannot reproduce.' : null].filter(Boolean), code: 'N00', com: '—' };
      case 'software': return { cls: 'ok', icon: 'check2-circle', head: 'Software issue isolated', next: 'The hardware tested correctly. The issue is in the user’s profile, apps, extensions or settings.', more: [o.extra, d.managed ? 'On an enrolled device, check the user’s policies and force-installed extensions in the admin console. Then remove the profile from the Chromebook and sign in again.' : 'Remove recently added extensions and apps, or remove the profile and sign in again. Powerwash if the issue remains.'].filter(Boolean), code: 'S00', com: '—' };
      case 'escalate': return { cls: 'esc', icon: 'exclamation-triangle', head: 'Escalation required', next: 'The checks did not isolate a single part.', more: [o.extra, 'Contact the manufacturer’s support line or your service partner with the completed steps below. A multi-part repair may be needed.'].filter(Boolean), code: 'E00', com: 'OTH' };
    }
  }

  function notesText() {
    const d = dev(); const m = model(); const s = baseSym[state.sym]; const r = outcomeInfo(state.outcome);
    const lines = [
      `Device: ${deviceName()}${d.model && m ? ` (${d.model})` : ''} | Machine type: ${d.mt || '—'} | Serial: ${d.serial || '—'} | Asset: ${d.asset || '—'}`,
      `Form factor: ${d.form} | Enrolled: ${d.managed ? 'Yes' : 'No'}${d.user ? ` | Reported by: ${d.user}` : ''}`,
      `Symptom: ${s.title}`,
      `Result: ${r.head}. ${r.next}`,
      `Code: ${r.code} | Category: ${PARTS[r.com] || 'None'}`,
      ...(r.procs || []).map(p => {
        let pn = p.partNo || '';
        if (p.variants) {
          const r2 = pickedPart(p.key, p.variants); const sel = picks[p.key] || {};
          const facts = p.variants.fields.filter(([f]) => sel[f]).map(([f, label, opts]) => `${label}: ${opts.find(o => o[0] === sel[f])[1]}`).join(', ');
          pn = r2.done ? (r2.pn ? `${r2.pn} (${facts})` : `no matching version (${facts})`) : 'not chosen yet';
        }
        return `Part: ${p.display || p.name}${pn ? ` | Part number: ${pn}` : ''}`;
      }),
      '', 'Completed troubleshooting steps:',
      ...log.map(l => `- [${l.phase}] ${l.text} ${l.ans === 'Y' ? 'Yes' : l.ans === 'N' ? 'No' : l.ans === 'D' ? 'Done' : ''}`.trim()),
      m && r.procs && r.procs.length ? `\n${m.returnForm}` : null
    ].filter(x => x !== null);
    return lines.join('\n');
  }

  const stepsList = items => items.length
    ? `<ul class="tg-steps">${items.map(l => `<li><span class="ph">${esc(l.phase)}</span><span>${esc(l.text)}</span><span class="ans ${l.ans === 'Y' ? 'y' : l.ans === 'N' ? 'n' : 'i'}">${l.ans === 'Y' ? 'YES' : l.ans === 'N' ? 'NO' : l.ans === 'D' ? 'DONE' : '—'}</span></li>`).join('')}</ul>`
    : `<p class="text-body-secondary">No steps answered yet. Pick a symptom on the Troubleshooting tab to start.</p>`;

  function renderResult() {
    const r = outcomeInfo(state.outcome); const m = model();
    const procs = r.procs || [];
    $('#body').innerHTML = `
      <div class="tg-result-head ${r.cls}"><div class="ic">${ic(r.icon)}</div><div>
        <h2 class="lead-title mb-1">${r.head}</h2><div class="text-body-secondary">${esc(baseSym[state.sym].title)} · ${esc(deviceName())}</div></div></div>
      <div class="tg-h3 mt-0">Next steps</div>
      <p class="mb-1"><strong>${esc(r.next)}</strong></p>
      ${r.more.map(x => `<p class="mb-1">${esc(x)}</p>`).join('')}
      <div class="tg-codes">
        <div><div class="k">Code</div><div class="v mono">${r.code}</div></div>
        <div><div class="k">Category</div><div class="v" style="font-size:14px">${esc(PARTS[r.com] || 'None')}</div></div>
        <div><div class="k">Part</div><div class="v" style="font-size:14px">${esc(state.outcome.out === 'replace' ? r.part : 'None required')}</div></div>
      </div>
      ${procs.length ? `
        <div class="tg-h3">Before you replace</div>
        <ul class="tg-list">${m.before.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="tg-h3">Service procedure</div>
        ${procs.map(p => procCard(p)).join('')}
        <div class="tg-h3">After replacement</div>
        <ul class="tg-list">${m.after.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <div class="tg-h3">Completed troubleshooting steps</div>
      ${stepsList(log)}
      <div class="tg-h3 d-flex align-items-center justify-content-between gap-2" style="max-width:760px">Repair notes
        <button class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1" id="copy" type="button">${ic('clipboard')}Copy</button></div>
      <div class="tg-notes" style="max-width:760px"><textarea class="form-control" id="notes" readonly aria-label="Repair notes">${esc(notesText())}</textarea></div>`;
    setAnswer('Diagnosis complete.', `<button class="btn-yn" id="btn-restart-same" type="button">${ic('arrow-counterclockwise')}Restart this symptom</button><button class="btn-yn primary" id="btn-new" type="button">${ic('plus-lg')}New diagnosis</button>`);
  }

  function renderLog() {
    $('#body').innerHTML = `<div class="tg-eyebrow">This session</div><h2 class="lead-title">Completed steps</h2>${stepsList(log)}`;
    setAnswer();
  }

  function renderParts() {
    const m = model();
    $('#body').innerHTML = `
      <div class="tg-eyebrow">${esc(m.name)}</div>
      <h2 class="lead-title">Parts and procedures</h2>
      <p class="text-body-secondary">Select a part to see how to remove it, which screws it uses, and pictures of each step.</p>
      <div class="tg-ex">${m.exploded.map(([src, cap]) => `<figure class="tg-fig"><button type="button" data-fig="${esc(src)}" data-cap="${esc(cap)}" aria-label="Enlarge: ${esc(cap)}"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy"></button><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>
      <div class="table-responsive"><table class="table align-middle">
        <thead><tr><th>Item</th><th>Part</th><th>Who can replace it</th>${m.partsTable.some(r => r[4]) ? '<th>Part number</th>' : ''}</tr></thead>
        <tbody>${m.partsTable.map(([no, name, type, key, pn]) => `<tr class="tg-parts-row" data-proc="${key}" tabindex="0"><td class="mono">${esc(no)}</td><td>${esc(name)}</td><td class="text-body-secondary">${esc(type)}</td>${pn !== undefined ? `<td class="mono">${esc(pn)}</td>` : ''}</tr>`).join('')}</tbody>
      </table></div>
      <p class="text-body-secondary" style="font-size:12px">${m.maker === 'HP' ? 'Part numbers can change. Check them at partsurfer.hp.com before ordering.' : '* Selected models only. Look up part numbers at support.lenovo.com/partslookup'}</p>`;
    setAnswer();
  }

  function renderCodes() {
    const m = model();
    const seen = new Map();
    const syms = SYMPTOMS.map(s => getSym(s.id));
    syms.forEach(s => s.deep.forEach(n => [n.yes, n.no].forEach(a => {
      if (a.out === 'replace') {
        if (!seen.has(a.code)) seen.set(a.code, { code: a.code, com: a.com, a, syms: new Set() });
        seen.get(a.code).syms.add(s.title);
      }
    })));
    const rows = [...seen.values()].sort((x, y) => x.code.localeCompare(y.code));
    const other = [['R00', 'Resolved, no parts'], ['N00', 'Cannot duplicate'], ['S00', 'Software issue isolated'], ['X00', 'User’s accessory or cable at fault'], ['U00', 'Back up data before continuing'], ['E00', 'Escalation required']];
    const action = row => { const ps = procsFor(row.a); return ps.length ? `Replace ${esc(ps.map(p => lcFirst(p.display || p.name)).join(' and '))}` : `Replace ${esc(row.a.part || PARTS[row.com])}`; };
    $('#body').innerHTML = `
      <div class="tg-eyebrow">Reference${m ? ' · ' + esc(m.name) : ''}</div><h2 class="lead-title">Repair codes</h2>
      <p class="text-body-secondary">Codes this tool assigns at the end of a Deep Dive, for your own case notes.${m ? ' Actions use the part names for the selected model.' : ''}</p>
      <div class="table-responsive"><table class="table align-middle">
        <thead><tr><th>Code</th><th>Category</th><th>Action</th><th>Used in</th></tr></thead>
        <tbody>${rows.map(r => `<tr><td class="mono fw-semibold">${r.code}</td><td>${esc(PARTS[r.com])}</td><td>${action(r)}</td><td class="text-body-secondary">${esc([...r.syms].join(', '))}</td></tr>`).join('')}
        ${other.map(([c, t]) => `<tr><td class="mono fw-semibold">${c}</td><td>—</td><td>${t}</td><td class="text-body-secondary">All symptoms</td></tr>`).join('')}</tbody>
      </table></div>
      `;
    setAnswer();
  }

  function renderBody() {
    if (tab === 'log') return renderLog();
    if (tab === 'codes') return renderCodes();
    if (tab === 'parts' && model()) return renderParts();
    ({ home: renderHome, symptom: renderSymptom, quick: renderQuick, deep: renderDeep, result: renderResult })[state.view]();
  }

  function render() { renderHead(); renderCrumbs(); renderRefs(); renderBody(); lastRender = performance.now(); }

  // ---------- Events ----------
  let toastT;
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2400); };

  function openProc(key) {
    const m = model(); const p = m && m.procs[key]; if (!p) return;
    openModal(p.name, procCard({ key, ...p }, { noFigs: true }) + (p.figs || []).map(([s, c]) => `<div class="mt-3">${bigFig(s, c)}</div>`).join(''));
    $('#viewer').dataset.proc = key;
  }

  document.addEventListener('click', e => {
    if (e.target.id === 'viewer' || e.target.closest('#viewer-close')) { closeModal(); return; }
    const t = e.target.closest('button, tr[data-proc]'); if (!t) return;
    if (t.dataset.pick) {
      const [key, field, value] = t.dataset.pick.split('|');
      picks[key] = { ...(picks[key] || {}), [field]: value };
      if (isModalOpen() && $('#viewer').dataset.proc === key) { const y = $('#viewer .modal-body').scrollTop; openProc(key); $('#viewer .modal-body').scrollTop = y; }
      const y = window.scrollY; renderBody(); window.scrollTo(0, y);
      return;
    }
    if (t.dataset.fig) { $('#viewer').dataset.proc = ''; openModal('Picture', bigFig(t.dataset.fig, t.dataset.cap)); return; }
    if (t.dataset.proc) { openProc(t.dataset.proc); return; }
    if (t.dataset.gallery) { const m = model(); const list = m[t.dataset.gallery]; openModal(t.dataset.gallery === 'views' ? 'Ports and controls' : 'Exploded views', list.map(([s, c]) => bigFig(s, c)).join('')); return; }
    if (t.dataset.useModel) { $('#f-profile').value = t.dataset.useModel; onModelChange(); return; }
    if (t.dataset.sym) { filter = ''; $('#search').value = ''; push({ view: 'symptom', sym: t.dataset.sym }); }
    else if (t.id === 'btn-yes') answer(true);
    else if (t.id === 'btn-no') answer(false);
    else if (t.id === 'btn-continue') continueTest();
    else if (t.id === 'back') back();
    else if (t.id === 'brand' || t.id === 'btn-new') reset();
    else if (t.id === 'btn-restart-same') { const id = state.sym; reset(); push({ view: 'symptom', sym: id }); }
    else if (t.dataset.tab) { tab = t.dataset.tab; render(); }
    else if (t.id === 'copy') {
      const ta = $('#notes');
      const fallback = () => { ta.select(); toast('Press Ctrl+C to copy'); };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(ta.value).then(() => toast('Repair notes copied'), fallback); else fallback();
    }
  });

  $('#search').addEventListener('input', e => {
    filter = e.target.value.trim();
    if (state.view !== 'home' || tab !== 'trouble') { if (state.view !== 'home') hist.push({ state, logLen: log.length }); state = { view: 'home' }; tab = 'trouble'; renderHead(); renderCrumbs(); renderRefs(); }
    renderHome();
  });

  document.addEventListener('keydown', e => {
    if (isModalOpen()) { if (e.key === 'Escape') { e.preventDefault(); closeModal(); } return; }
    if (e.target.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.matches('tr[data-proc]') && e.key === 'Enter') { openProc(e.target.dataset.proc); return; }
    const k = e.key.toLowerCase();
    if (tab === 'trouble' && ['symptom', 'quick', 'deep'].includes(state.view)) {
      if (k === 'enter' && document.querySelector('#btn-continue')) { e.preventDefault(); continueTest(); }
      if (k === 'y') { e.preventDefault(); answer(true); }
      if (k === 'n') { e.preventDefault(); answer(false); }
    }
    if ((k === 'backspace' || k === 'escape') && hist.length && tab === 'trouble') { e.preventDefault(); back(); }
    if (k === '/') { e.preventDefault(); $('#search').focus(); }
  });

  renderDev();
  render();
})();
