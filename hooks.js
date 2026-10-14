/* Scenario hooks: jump to any Figma state. Floating "Screens" panel, URL hash (#d3.6), keyboard [ ], and window.NP.goto(code). */
window.NPHooks = (function () {
  const NP = window.NP;
  const D = NP.D;
  const harmony = () => { const S = NP.S; S.sel.project = 'harmony'; S.sel.query = 'Unitech Harmony, Sector 49, Gurgaon'; };
  const create = (S, fn) => { S.create = NP.newCreate('Unitech Harmony'); S.route = 'create'; if (fn) fn(S.create); };
  const row = (S, i) => S.create.rows[i];
  const newRow = (S, extra) => { const r = { id: 'n1', bhk: '3 BHK', area: 1650, label: '3 BHK Apartment · 1,650 sq.ft', total: 17200000, rate: 10424, selected: false, status: 'Under review', ...extra }; S.create.rows.push(r); return r; };
  const addCfgFilled = (S, full) => { S.addCfg = { type: full ? 'Apartment' : null, bhk: full ? '3 BHK' : null, area: '1,650', unit: 'sq.ft.', price: '1,72,00,000', rate: '10,424', tried: false, ref: 'CFG-48213' }; };
  const report = (S, id, all) => {
    NP.actions.report(id);
    if (all) Object.assign(S.report.reasons, { area: true, exist: true, other: true });
    S.report.price = '2,32,00,000';
  };
  const reportDone = (S, id) => { report(S, id); NP.actions.sendReport(); };
  const sb = (S, step, phone = D.demoPhones.ok) => {
    S.sb = { phone, otp: '', name: '', email: '', pw: '', sendCreds: true, verified: step !== 'sb-phone' && step !== 'sb-otp', resend: 0 };
    S.modal = step;
    if (step === 'sb-otp') NP.startResend();
  };
  const sbDetails = S => { sb(S, 'sb-details'); Object.assign(S.sb, { name: 'Ramlal Sharma', email: 'ramlal@turboprop.com', pw: '1234' }); };
  const sbCreated = S => { sb(S, 'sb-details'); Object.assign(S.sb, { name: 'Ramlal Sharma', email: 'ramlal@turboprop.in', pw: 'ramlal2026' }); NP.actions.createSbSubmit(); };
  const reqFilled = S => { S.req = { name: 'Unitech Grande', dev: 'Unitech Group', city: 'Gurugram', loc: 'Sector 49', rera: 'ASDF247376', launch: '11/10/2026', poss: '10/11/2026', tried: false, sent: null }; };

  const groups = [
    { title: 'Desktop · 01 Entry — pinning page', device: 'desktop', items: [
      ['d1.1', 'Dashboard — first time (no pinnings)', S => { S.firstTime = true; S.budget.used = 0; S.budget.daysLeft = 90; }],
      ['d1.2', 'Dashboard — with pinnings', () => { }],
      ['d1.2a', 'Your pinnings collapsed', S => { S.pinCollapsed = true; S.collapsible = true; }],
      ['d1.2b', 'Package expiring (6 days, Renew now)', S => { S.budget.daysLeft = 6; S.collapsible = true; }],
      ['d1.2c', 'Seller competition dropdown', S => { S.filters.open = 'competition'; }],
      ['d1.2d', 'Demand dropdown (disabled option)', S => { S.filters.open = 'demand'; }],
      ['d-limit', 'Limit reached modal', S => { S.budget.used = 150; S.modal = 'limit'; }],
      ['d-limit-thanks', 'Limit reached — request submitted', S => { S.budget.used = 150; S.modal = 'limitThanks'; }],
      ['d-expired', 'Plan expired modal', S => { S.budget.daysLeft = 0; S.modal = 'expired'; }],
      ['d-expired-thanks', 'Plan expired — request submitted', S => { S.budget.daysLeft = 0; S.modal = 'expiredThanks'; }]
    ]},
    { title: 'Desktop · 02 Select a project — modal', device: 'desktop', items: [
      ['d1.3', 'Select a project to pin', S => { S.modal = 'select'; }],
      ['d1.4', 'City dropdown open', S => { S.modal = 'select'; S.sel.open = 'city'; }],
      ['d1.5', 'Locality dropdown open', S => { S.modal = 'select'; S.sel.open = 'loc'; S.sel.locDraft = ['Sector 49']; }],
      ['d1.6', 'Project typeahead results', S => { S.modal = 'select'; S.sel.query = 'Unitech'; S.sel.open = 'proj'; S.sel.hl = 1; }],
      ['d1.7', 'Project selected — CTA enabled', S => { S.modal = 'select'; harmony(); }],
      ['d1.8', 'Project already pinned', S => { S.modal = 'select'; harmony(); S.sel.forcePinned = true; }],
      ['d1.9', 'Request missing project', S => { S.modal = 'request'; reqFilled(S); }],
      ['d1.9a', 'Request sent', S => { reqFilled(S); S.req.sent = 'Unitech Grande, Sector 49, Gurugram'; S.modal = 'requestSent'; }]
    ]},
    { title: 'Desktop · 03 Create pinning', device: 'desktop', items: [
      ['d3.1', 'Confirm details', S => create(S)],
      ['d3.1a', 'Unit dropdown open (sq.ft. / sq.m.)', S => { create(S); S.unitOpen = true; }],
      ['d3.2', 'No configuration selected (error)', S => create(S, c => { c.rows.forEach(r => r.selected = false); c.error = true; })],
      ['d3.3', 'Add missing configuration', S => { create(S, c => c.rows.forEach(r => r.selected = false)); addCfgFilled(S); S.modal = 'addCfg'; }],
      ['d3.4', 'Thank you — configuration added', S => { create(S, c => c.rows.forEach(r => r.selected = false)); addCfgFilled(S, true); S.modal = 'addCfgThanks'; }],
      ['d3.5', 'New configuration row (Under review)', S => create(S, c => { c.rows.forEach(r => r.selected = false); c.warn90 = true; newRow(S, { selected: true }); })],
      ['d3.6', 'Report & correct configuration', S => { create(S); report(S, 'c4'); S.modal = 'report'; }],
      ['d3.6a', 'Report — all reasons expanded', S => { create(S); report(S, 'c4', true); S.modal = 'report'; }],
      ['d3.7', 'Thank you — issue reported', S => { create(S); reportDone(S, 'c4'); }],
      ['d3.8', 'Reported label on row', S => create(S, c => { c.rows.forEach(r => r.selected = false); newRow(S, { selected: true, status: 'Reported', report: { ref: 'RPT-20931', short: '3 BHK · 1,650 sq.ft', label: 'Price is wrong', suggested: '₹2,32,00,000' } }); })],
      ['d3.8b', 'Inline price editing', S => create(S, c => { c.rows.forEach(r => r.selected = false); c.warn90 = true; row(S, 3).selected = true; newRow(S, { selected: true, status: 'Editing price', prevStatus: 'Default', draft: '10,424' }); })],
      ['d3.10', 'Inline total price editing', S => create(S, c => { c.rows.forEach(r => r.selected = false); c.warn90 = true; row(S, 3).selected = true; newRow(S, { selected: true, status: 'Editing total', prevStatus: 'Default', draft: '1,72,00,000' }); })]
    ]},
    { title: 'Desktop · 04 Managed by — sub-broker', device: 'desktop', items: [
      ['d4.1', 'Managed by dropdown', S => create(S, c => { c.managedOpen = true; })],
      ['d4.2', 'Sub-broker — enter phone', S => { create(S); sb(S, 'sb-phone', ''); }],
      ['d4.3', 'Already in team', S => { create(S); sb(S, 'sb-phone', D.demoPhones.inTeam); }],
      ['d4.4', 'Number linked elsewhere', S => { create(S); sb(S, 'sb-phone', D.demoPhones.linked); }],
      ['d4.5', 'Verify OTP', S => { create(S); sb(S, 'sb-otp'); }],
      ['d4.6', 'Enter details (with errors)', S => { create(S); sbDetails(S); }],
      ['d4.7', 'Discard confirmation', S => { create(S); sbDetails(S); S.modal = 'sb-discard'; }],
      ['d4.8', 'Thank you — sub-broker created', S => { create(S); sbCreated(S); }],
      ['d4.9', 'Sub-broker assigned', S => { create(S); sbCreated(S); NP.actions.sbContinue(); }]
    ]},
    { title: 'Mobile · M1 Dashboard', device: 'mobile', items: [
      ['m1.1', 'Dashboard — first time', S => { S.firstTime = true; S.budget.used = 0; }],
      ['m1.2', 'Dashboard — with pinnings', () => { }]
    ]},
    { title: 'Mobile · M2 Select a project', device: 'mobile', items: [
      ['m2.1', 'Select a project', S => { S.route = 'm-select'; }],
      ['m2.2', 'City sheet open', S => { S.route = 'm-select'; S.sel.open = 'city'; }],
      ['m2.3', 'Locality sheet open', S => { S.route = 'm-select'; S.sel.open = 'loc'; S.sel.locDraft = ['Sector 49']; }],
      ['m2.4', 'Project results', S => { S.route = 'm-select'; S.sel.query = 'Unitech'; S.sel.open = 'proj'; S.sel.hl = 1; }],
      ['m2.5', 'Project selected', S => { S.route = 'm-select'; harmony(); }],
      ['m2.6', 'Project already pinned', S => { S.route = 'm-select'; harmony(); S.sel.forcePinned = true; }],
      ['m2.7', 'Request missing project', S => { S.route = 'm-request'; reqFilled(S); }],
      ['m2.8', 'Request sent', S => { S.route = 'm-request'; reqFilled(S); S.req.sent = 'Unitech Grande, Sector 49, Gurugram'; S.modal = 'requestSent'; }]
    ]},
    { title: 'Mobile · M3 Create pinning', device: 'mobile', items: [
      ['m3.1', 'Confirm details', S => create(S)],
      ['m3.2', 'No configuration selected', S => { create(S, c => { c.error = true; }); S.toast = { kind: 'error', title: 'Select at least 1 configuration to pin', id: 1 }; }],
      ['m3.3', 'Add missing configuration', S => { create(S); addCfgFilled(S); S.modal = 'addCfg'; }],
      ['m3.4', 'Configuration added', S => { create(S); addCfgFilled(S, true); S.modal = 'addCfgThanks'; }],
      ['m3.5', 'New configuration (Under review)', S => { create(S); newRow(S); }],
      ['m3.6', 'Report an issue', S => { create(S); report(S, 'c4'); S.modal = 'report'; }],
      ['m3.7', 'Issue reported', S => { create(S); reportDone(S, 'c4'); }],
      ['m3.8', 'Reported label on row', S => create(S, c => { row(S, 1).selected = true; Object.assign(row(S, 3), { status: 'Reported', report: { ref: 'RPT-20931', short: '3 BHK · 2,400 sq.ft', label: 'Price is wrong', suggested: '₹2,32,00,000' } }); })],
      ['m3.9', 'Edit price', S => { create(S); S.edit = { id: 'c1', total: '1,56,00,000', rate: '10,400' }; S.modal = 'editPrice'; }],
      ['m3.10', 'Price updated (toast + Undo)', S => { create(S); S.edit = { id: 'c1', total: '1,56,00,000', rate: '10,400' }; NP.actions.savePriceSheet(); }]
    ]},
    { title: 'Mobile · M4 Managed by — sub-broker', device: 'mobile', items: [
      ['m4.1', 'Choose manager', S => { create(S); S.modal = 'manager'; }],
      ['m4.2', 'Enter phone', S => { create(S); sb(S, 'sb-phone', ''); }],
      ['m4.3', 'Already in team', S => { create(S); sb(S, 'sb-phone', D.demoPhones.inTeam); }],
      ['m4.4', 'Number linked elsewhere', S => { create(S); sb(S, 'sb-phone', D.demoPhones.linked); }],
      ['m4.5', 'Verify OTP', S => { create(S); sb(S, 'sb-otp'); }],
      ['m4.6', 'Enter details (with errors)', S => { create(S); sbDetails(S); }],
      ['m4.7', 'Discard confirmation', S => { create(S); sbDetails(S); S.modal = 'sb-discard'; }],
      ['m4.8', 'Sub-broker created', S => { create(S); sbCreated(S); }],
      ['m4.9', 'Sub-broker assigned', S => { create(S); sbCreated(S); NP.actions.sbContinue(); }]
    ]}
  ];
  const flat = groups.flatMap(g => g.items.map(([code, name, fn]) => ({ code, name, fn, device: g.device, group: g.title })));
  let current = null, open = false, device = 'auto';

  function goto(code, { keepHash } = {}) {
    const s = flat.find(x => x.code === code); if (!s) return false;
    const S = NP.fresh();
    S.device = (s.device === 'mobile') === (window.innerWidth < 768) ? 'auto' : s.device;
    NP.S = S;
    s.fn(S);
    current = code;
    if (!keepHash) { try { history.replaceState(null, '', '#' + code); } catch (e) { } }
    window.scrollTo(0, 0);
    NP.render();
    return true;
  }

  const host = document.getElementById('hooks');
  function draw() {
    const S = NP.S;
    const idx = flat.findIndex(x => x.code === current);
    host.innerHTML = `
      <div class="hk ${open ? 'is-open' : ''}">
        ${open ? `<div class="hk__panel" role="dialog" aria-label="Screens">
          <div class="hk__top"><b>Screens</b><span>${flat.length} Figma states</span><button class="hk__x" data-h="toggle" aria-label="Close">×</button></div>
          <div class="hk__dev" role="group" aria-label="Layout">${['auto', 'desktop', 'mobile'].map(d => `<button class="${(S.device || 'auto') === d ? 'is-on' : ''}" data-h="device" data-v="${d}">${d === 'auto' ? 'Auto' : d === 'desktop' ? 'Desktop' : 'Mobile 360'}</button>`).join('')}</div>
          <div class="hk__list">${groups.map(g => `<div class="hk__g"><div class="hk__gt">${g.title}</div>${g.items.map(([c, n]) => `<button class="hk__i ${c === current ? 'is-on' : ''}" data-h="go" data-v="${c}"><code>${c}</code><span>${n}</span></button>`).join('')}</div>`).join('')}</div>
          <div class="hk__foot"><button data-h="reset">Reset prototype</button><span>Keys: [ and ] step through states</span></div>
        </div>` : ''}
        <div class="hk__bar">
          <button class="hk__nav" data-h="step" data-v="-1" aria-label="Previous screen" ${idx <= 0 ? 'disabled' : ''}>‹</button>
          <button class="hk__btn" data-h="toggle"><span class="hk__dot"></span>${current ? `<code>${current}</code>` : 'Screens'}</button>
          <button class="hk__nav" data-h="step" data-v="1" aria-label="Next screen" ${idx >= flat.length - 1 ? 'disabled' : ''}>›</button>
        </div>
      </div>`;
    if (open) { const on = host.querySelector('.hk__i.is-on'); if (on) on.scrollIntoView({ block: 'nearest' }); }
  }
  host.addEventListener('click', e => {
    const b = e.target.closest('[data-h]'); if (!b) return;
    const v = b.dataset.v;
    if (b.dataset.h === 'toggle') open = !open;
    if (b.dataset.h === 'go') goto(v);
    if (b.dataset.h === 'step') step(+v);
    if (b.dataset.h === 'device') { device = v; NP.S.device = v; NP.render(); }
    if (b.dataset.h === 'reset') { current = null; NP.S = NP.fresh(); NP.S.device = device; try { history.replaceState(null, '', location.pathname); } catch (er) { } NP.render(); }
    draw();
  });
  function step(d) {
    let i = flat.findIndex(x => x.code === current);
    i = Math.max(0, Math.min(flat.length - 1, i + d));
    goto(flat[i].code);
  }
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea')) return;
    if (e.key === ']') { step(1); draw(); }
    if (e.key === '[') { step(-1); draw(); }
  });
  window.addEventListener('hashchange', () => { const c = location.hash.slice(1); if (c && c !== current) { goto(c, { keepHash: true }); draw(); } });

  NP.goto = code => { const ok = goto(code); draw(); return ok; };
  NP.screens = () => flat.map(({ code, name, group }) => ({ code, name, group }));

  return {
    boot() { const c = location.hash.slice(1); if (c) { const s = flat.find(x => x.code === c); if (s) { const S = NP.fresh(); NP.S = S; current = c; S.device = s.device === 'mobile' && window.innerWidth >= 768 ? 'mobile' : 'auto'; s.fn(S); } } },
    sync() { draw(); }
  };
})();
