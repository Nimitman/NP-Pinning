/* NP pinning — shared state, helpers, actions and render loop.
   Desktop markup lives in desktop.js, mobile markup in mobile.js, scenario hooks in hooks.js. */
(function () {
  const D = window.NPDATA;
  const A = 'assets/';

  /* ---------- formatting helpers ---------- */
  const inr = n => {
    n = Math.round(n);
    const s = String(n);
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + ',' + last3;
  };
  const rupee = n => '₹' + inr(n);
  const short = n => {
    if (n >= 1e7) return '₹' + String(+(n / 1e7).toFixed(2)) + ' Cr';
    if (n >= 1e5) return '₹' + String(+(n / 1e5).toFixed(2)) + ' L';
    return rupee(n);
  };
  const digits = v => String(v || '').replace(/\D/g, '');
  const num = v => +digits(v) || 0;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const phoneFmt = p => { p = digits(p); return p.length > 5 ? p.slice(0, 5) + ' ' + p.slice(5) : p; };
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTHS_L = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmtDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const ddmmyy = d => `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getFullYear()).slice(2)}`;
  const TODAY = new Date(2026, 8, 22);     // prototype "today" (matches 20 days left till 12 Oct 2026)
  const EXPIRY = new Date(2026, 9, 12);

  /* ---------- state ---------- */
  const fresh = () => ({
    device: 'auto',
    route: 'dashboard',               // dashboard | create | m-select (mobile select-project page)
    budget: { used: 12, total: 150, daysLeft: 20 },
    firstTime: false,
    pinCollapsed: false, collapsible: false,
    pinnings: D.pinnings.map(p => ({ ...p })),
    tab: 'All', page: 1,
    filters: { open: null, competition: null, demand: null, dev: false, city: 'Gurugram', locs: 'Sector 71, +2', hoverDisabled: false },
    carousel: 0,
    modal: null,
    sel: { city: 'Gurgaon', locs: ['Sector 49', 'Sohna Road', 'MG Road'], query: '', project: null, open: null, citySearch: '', locSearch: '', locDraft: [], forcePinned: false, hl: 1 },
    req: { name: '', dev: '', city: '', loc: '', rera: '', launch: '', poss: '', tried: false, sent: null },
    create: null,
    addCfg: null,
    report: null,
    edit: null,
    sb: null,
    toast: null,
    lastSubmit: null
  });
  let S = fresh();

  const newCreate = (projectName) => ({
    project: projectName || 'Unitech Harmony',
    date: new Date(TODAY), dateOpen: false, calMonth: TODAY.getMonth(),
    duration: 30, warn90: false,
    rows: D.configs.map((c, i) => ({ ...c, selected: !isMobile() && i < 2, status: 'Default' })),
    error: false, managerId: 'jk', managedOpen: false, team: D.team.map(t => ({ ...t })),
    selectAllBox: true
  });

  /* ---------- derived values ---------- */
  const left = () => S.budget.total - S.budget.used;
  const budgetState = () => S.budget.daysLeft <= 0 ? 'expired' : S.budget.daysLeft <= 7 ? 'danger' : S.budget.daysLeft <= 30 ? 'warning' : 'normal';
  const pinsFor = days => days / 30;
  const selectedRows = () => S.create.rows.filter(r => r.selected && r.status !== 'Sold out');
  const manager = () => S.create.team.find(t => t.id === S.create.managerId);
  const locSummary = locs => !locs.length ? '' : locs.length === 1 ? locs[0] : `${locs[0]} + ${locs.length - 1}`;
  const selProject = () => D.projects.find(p => p.id === S.sel.project);
  const isMobile = () => S.device === 'mobile' || (S.device === 'auto' && window.innerWidth < 768);

  /* ---------- tiny markup helpers shared by both layouts ---------- */
  const img = (file, w, h, extra = '') => `<img src="${A}${file}" width="${w}" height="${h}" alt="" ${extra}>`;
  const meter = (cls = '') => `<span class="meter ${cls}"><i></i><i></i><i></i></span>`;
  const reqStar = '<span class="req"> *</span>';

  /* ---------- actions ---------- */
  const closeDropdowns = () => {
    S.filters.open = null;
    S.sel.open = null;
    if (S.create) { S.create.managedOpen = false; S.create.dateOpen = false; }
  };

  const toast = (t, ms = 5000) => {
    S.toast = { ...t, id: Date.now() };
    const id = S.toast.id;
    if (ms) setTimeout(() => { if (S.toast && S.toast.id === id) { S.toast = null; render(); } }, ms);
  };

  let otpTimer = null;
  const startResend = () => {
    S.sb.resend = 24;
    clearInterval(otpTimer);
    otpTimer = setInterval(() => {
      if (!S.sb || S.sb.resend <= 0) { clearInterval(otpTimer); return; }
      S.sb.resend--; render();
    }, 1000);
  };

  const sbPhoneState = () => {
    const p = digits(S.sb.phone);
    if (p === D.demoPhones.inTeam) return 'inTeam';
    if (p === D.demoPhones.linked) return 'linked';
    return p.length === 10 ? 'ok' : 'empty';
  };
  const sbErrors = () => {
    const e = {};
    const sb = S.sb;
    if (sb.email) {
      if (sb.email.trim().toLowerCase() === D.takenEmail) e.email = 'Already used by another Housing account — use a different email';
      else if (!/^\S+@\S+\.\S+$/.test(sb.email)) e.email = 'Enter a valid email address';
    }
    if (sb.pw && (sb.pw.length < 8 || !/\d/.test(sb.pw))) e.pw = 'Too short — use at least 8 characters with 1 number';
    return e;
  };
  const sbDetailsValid = () => {
    const sb = S.sb, e = sbErrors();
    return sb.name.trim() && sb.email && sb.pw && !e.email && !e.pw;
  };

  const startPinning = () => {
    if (budgetState() === 'expired') { S.modal = 'expired'; return; }
    if (left() <= 0) { S.modal = 'limit'; return; }
    if (isMobile()) { S.route = 'm-select'; S.modal = null; window.scrollTo(0, 0); return; }
    S.modal = 'select';
  };

  const goCreate = (name) => {
    S.create = newCreate(name);
    S.route = 'create'; S.modal = null; S.sel.open = null;
    window.scrollTo(0, 0);
  };

  const recalcAddCfg = (field) => {
    const a = S.addCfg, area = num(a.area);
    if (!area) return;
    if (field === 'price') a.rate = inr(Math.round(num(a.price) / area));
    if (field === 'rate' || field === 'area') a.price = inr(num(a.rate) * area);
  };

  const actions = {
    /* navigation */
    back() { if (S.route === 'm-request') { S.route = 'm-select'; window.scrollTo(0, 0); return; } if (S.route === 'create') { S.route = isMobile() ? 'm-select' : 'dashboard'; if (!isMobile()) S.modal = 'select'; } else if (S.route === 'm-select') { S.route = 'dashboard'; } window.scrollTo(0, 0); },
    nav() { toast({ kind: 'info', title: 'Not part of this prototype', sub: 'Only the New project pinning flow is built.' }, 2500); },

    /* dashboard */
    startPinning,
    pinCard(v) { if (budgetState() === 'expired') { S.modal = 'expired'; return; } if (left() <= 0) { S.modal = 'limit'; return; } goCreate(v || 'Godrej Meridien'); },
    filter(v) { S.filters.open = S.filters.open === v ? null : v; },
    pickCompetition(v) { S.filters.competition = S.filters.competition === v ? null : v; S.filters.open = null; S.carousel = 0; },
    pickDemand(v) { S.filters.demand = S.filters.demand === v ? null : v; S.filters.open = null; S.carousel = 0; },
    toggleDev() { S.filters.dev = !S.filters.dev; S.carousel = 0; },
    pickFilterCity(v) { S.filters.city = v; S.filters.open = null; },
    pickLocsFilter(v) { S.filters.locs = v; S.filters.open = null; },
    clearFilters() { Object.assign(S.filters, { competition: null, demand: null, dev: false, open: null }); S.carousel = 0; },
    carousel(v) { const max = Math.max(0, D.recos.length - 3); S.carousel = Math.min(max, Math.max(0, S.carousel + (+v))); },
    tab(v) { S.tab = v; S.page = 1; },
    page(v) { S.page = v === 'prev' ? Math.max(1, S.page - 1) : v === 'next' ? Math.min(12, S.page + 1) : +v; },
    collapse() { S.pinCollapsed = !S.pinCollapsed; S.collapsible = true; },
    exportCsv() {
      const rows = [['Project', 'Locality', 'Start date', 'Ends in', 'Status', 'Managed by'], ...S.pinnings.map(p => [p.name, p.loc, p.start, p.ends, p.status, p.by])];
      const blob = new Blob([rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')], { type: 'text/csv' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'your-pinnings.csv'; a.click();
    },
    renew() { S.modal = 'expired'; },
    moreSlots() { S.modal = 'limitThanks'; },
    extendPlan() { S.modal = 'expiredThanks'; },

    /* modal generic */
    closeModal() {
      if (S.modal && S.modal.startsWith('sb-') && S.sb && S.sb.verified && S.modal !== 'sb-done' && S.modal !== 'sb-discard') { S.modal = 'sb-discard'; return; }
      if (S.modal === 'sb-done') { actions.sbContinue(); return; }
      if (S.modal === 'addCfgThanks') { actions.addCfgBack(); return; }
      if (S.modal === 'reportThanks') { actions.reportDone(); return; }
      if (S.modal === 'requestSent' && S.route === 'm-request') { S.modal = null; S.route = 'dashboard'; window.scrollTo(0, 0); return; }
      S.modal = null; closeDropdowns();
    },

    /* select-project modal / page */
    selOpen(v) { S.sel.open = S.sel.open === v ? null : v; if (v === 'loc') S.sel.locDraft = [...S.sel.locs]; S.sel.citySearch = ''; S.sel.locSearch = ''; },
    pickCity(v) { S.sel.city = v === 'Gurugram' ? 'Gurgaon' : v; S.sel.open = null; S.sel.project = null; S.sel.query = ''; },
    toggleLoc(v) { const d = S.sel.locDraft; const i = d.indexOf(v); i >= 0 ? d.splice(i, 1) : d.push(v); },
    applyLocs() { S.sel.locs = [...S.sel.locDraft]; S.sel.open = null; },
    clearSearch(v) { S.sel[v] = ''; },
    pickProject(v) { S.sel.project = v; const p = selProject(); S.sel.query = `${p.name}, ${p.locality}, ${p.city}`; S.sel.open = null; S.sel.forcePinned = false; },
    clearProject() { S.sel.project = null; S.sel.query = ''; S.sel.open = null; },
    startThis() {
      const p = selProject();
      if (!p) return;
      if (p.pinned || S.sel.forcePinned) { S.modal = null; S.route = 'dashboard'; S.tab = 'All'; toast({ kind: 'info', title: 'Opening your existing pinning', sub: `${p.name} · Ending soon · 4 days left` }, 3000); return; }
      goCreate(p.name);
    },
    requestProject() { S.sel.open = null; S.req = { name: '', dev: '', city: '', loc: '', rera: '', launch: '', poss: '', tried: false, sent: null }; if (isMobile()) { S.route = 'm-request'; S.modal = null; window.scrollTo(0, 0); } else S.modal = 'request'; },
    submitRequest() {
      const r = S.req; r.tried = true;
      if (!r.name.trim() || !r.city || !r.loc) return;
      r.sent = `${r.name.trim()}, ${r.loc}, ${r.city}`;
      S.modal = 'requestSent';
    },
    reqOpen(v) { S.req.open = S.req.open === v ? null : v; },
    reqPick(v) { const [k, val] = v.split('|'); S.req[k] = val; S.req.open = null; },

    /* create pinning */
    dateOpen() { S.create.dateOpen = !S.create.dateOpen; S.create.calMonth = S.create.date.getMonth(); },
    calMonth(v) { S.create.calMonth = Math.min(9, Math.max(8, S.create.calMonth + (+v))); },
    pickDate(v) { S.create.date = new Date(2026, +v.split('-')[0], +v.split('-')[1]); S.create.dateOpen = false; },
    duration(v) { S.create.duration = +v; },
    toggleRow(id) { const r = S.create.rows.find(x => x.id === id); if (r.status === 'Sold out') return; r.selected = !r.selected; if (selectedRows().length) S.create.error = false; },
    selectAll() { const rows = S.create.rows.filter(r => r.status !== 'Sold out'); const all = rows.every(r => r.selected); rows.forEach(r => r.selected = !all); if (!all) S.create.error = false; },
    editPrice(id) {
      const r = S.create.rows.find(x => x.id === id);
      if (isMobile()) { S.edit = { id, total: inr(r.total), rate: inr(r.rate) }; S.modal = 'editPrice'; return; }
      S.create.rows.forEach(x => { if (x.status === 'Editing price') { x.status = x.prevStatus || 'Default'; } });
      r.prevStatus = r.status; r.draft = inr(r.rate); r.status = 'Editing price';
    },
    savePrice(id) {
      const r = S.create.rows.find(x => x.id === id), v = num(r.draft);
      if (!v) return actions.cancelPrice(id);
      if (v !== r.rate) { r.oldRate = r.oldRate || r.rate; r.rate = v; r.total = v * r.area; r.status = 'Price updated'; }
      else r.status = r.prevStatus || 'Default';
    },
    cancelPrice(id) { const r = S.create.rows.find(x => x.id === id); r.status = r.prevStatus || 'Default'; },
    removeRow(id) { S.create.rows = S.create.rows.filter(r => r.id !== id); },
    viewReport(id) { const r = S.create.rows.find(x => x.id === id); S.report = r.report; S.modal = 'reportThanks'; S.report.viewOnly = true; },
    submit() {
      const n = selectedRows().length;
      if (!n) { S.create.error = true; if (isMobile()) toast({ kind: 'error', title: 'Select at least 1 configuration to pin' }, 0); return; }
      const c = S.create, used = pinsFor(c.duration);
      S.budget.used += used;
      S.firstTime = false;
      S.pinnings.unshift({ name: c.project, loc: 'Sector 49, Gurugram', start: '—', ends: '—', status: 'Pending approval', by: manager().name });
      S.route = 'dashboard'; S.modal = null; window.scrollTo(0, 0);
      toast({ kind: 'success', title: 'Pinning request submitted', sub: `${c.project} · ${n} configuration${n > 1 ? 's' : ''} · ${used} pinning${used > 1 ? 's' : ''} used` });
    },

    /* add missing configuration */
    addCfg() { S.addCfg = { type: null, bhk: null, area: '', unit: 'sq.ft.', price: '', rate: '', tried: false }; S.modal = 'addCfg'; },
    cfgType(v) { S.addCfg.type = v; },
    cfgBhk(v) { S.addCfg.bhk = v; },
    cfgUnit() { S.addCfg.unit = S.addCfg.unit === 'sq.ft.' ? 'sq.m.' : 'sq.ft.'; },
    addCfgSubmit() {
      const a = S.addCfg; a.tried = true;
      if (!a.type || !a.bhk || !num(a.area) || !num(a.price) || !num(a.rate)) return;
      a.ref = 'CFG-' + (48213 + Math.floor(Math.random() * 9));
      a.ref = 'CFG-48213';
      S.modal = 'addCfgThanks';
    },
    addCfgBack() {
      const a = S.addCfg, area = num(a.area);
      S.create.rows.push({ id: 'n' + Date.now(), bhk: a.bhk, area, label: `${a.bhk} ${a.type} · ${inr(area)} sq.ft`, total: num(a.price), rate: num(a.rate), selected: !isMobile(), status: 'Under review' });
      S.modal = null;
    },

    /* report an issue */
    report(id) {
      const r = S.create.rows.find(x => x.id === id);
      S.report = { id, short: `${r.bhk} · ${inr(r.area)} sq.ft`, reasons: { price: true, area: false, exist: false, other: false }, price: inr(r.total), rate: inr(r.rate), area: inr(r.area), d1: '', d2: '', tried: false };
      S.modal = 'report';
    },
    reason(v) { S.report.reasons[v] = !S.report.reasons[v]; },
    sendReport() {
      const r = S.report; r.tried = true;
      const any = Object.values(r.reasons).some(Boolean);
      if (!any) return;
      r.ref = 'RPT-20931';
      const map = { price: 'Price is wrong', area: 'Built-up area is wrong', exist: 'Configuration doesn’t exist', other: 'Something else' };
      r.label = Object.keys(r.reasons).filter(k => r.reasons[k]).map(k => map[k]).join(', ');
      r.suggested = r.reasons.price ? rupee(num(r.price)) : r.reasons.area ? `${r.area} sq.ft` : '—';
      S.modal = 'reportThanks';
    },
    reportDone() {
      const r = S.report;
      if (!r.viewOnly) { const row = S.create.rows.find(x => x.id === r.id); if (row) { row.status = 'Reported'; row.report = { ...r }; } }
      S.modal = null;
    },

    /* mobile edit price sheet */
    savePriceSheet() {
      const e = S.edit, r = S.create.rows.find(x => x.id === e.id), rate = num(e.rate);
      if (!rate) return;
      const prev = { rate: r.rate, total: r.total, status: r.status, selected: r.selected };
      r.oldRate = r.oldRate || r.rate; r.rate = rate; r.total = num(e.total) || rate * r.area; r.status = 'Price updated'; r.selected = true;
      S.modal = null; S.create.error = false;
      toast({ kind: 'success', title: 'Thanks — price updated', sub: `₹${inr(rate)}/sq.ft for ${r.bhk} · ${inr(r.area)} sq.ft`, undo: { id: r.id, prev } }, 6000);
    },
    undo() {
      const u = S.toast && S.toast.undo; if (!u) return;
      const r = S.create.rows.find(x => x.id === u.id); Object.assign(r, u.prev); if (r.status !== 'Price updated') r.oldRate = null;
      S.toast = null;
    },
    dismissToast() { S.toast = null; },

    /* managed by / sub-broker */
    managed() { if (isMobile()) { S.modal = 'manager'; return; } S.create.managedOpen = !S.create.managedOpen; },
    pickManager(v) { S.create.managerId = v; S.create.managedOpen = false; S.modal = null; },
    createSb() {
      S.create.managedOpen = false;
      S.sb = { phone: '', otp: '', name: '', email: '', pw: '', sendCreds: true, verified: false, resend: 0 };
      S.modal = 'sb-phone';
    },
    sendOtp() { if (sbPhoneState() !== 'ok') return; S.sb.otp = ''; S.modal = 'sb-otp'; startResend(); },
    changeNumber() { S.modal = 'sb-phone'; },
    resend() { if (S.sb.resend > 0) return; S.sb.otp = ''; startResend(); },
    verifyOtp() { if (digits(S.sb.otp).length !== 4) return; S.sb.verified = true; S.modal = 'sb-details'; },
    sendCreds() { S.sb.sendCreds = !S.sb.sendCreds; },
    createSbSubmit() {
      if (!sbDetailsValid()) return;
      const sb = S.sb, name = sb.name.trim();
      const initials = name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const id = 'sb' + Date.now();
      S.create.team.push({ id, initials, name, meta: 'Sub-broker · 1 pinning', isNew: true });
      sb.created = { id, name, initials };
      S.modal = 'sb-done';
    },
    sbContinue() {
      const c = S.sb.created;
      S.create.managerId = c.id; S.modal = null;
      toast({ kind: 'success', title: `${c.name} added to your team`, sub: 'Now managing this pinning', change: true }, 8000);
    },
    manageTeam() { S.modal = null; toast({ kind: 'info', title: 'Team management', sub: 'Opens the team page (outside this flow).' }, 2500); },
    keepEditing() { S.modal = 'sb-details'; },
    discard() { S.modal = null; S.sb = null; clearInterval(otpTimer); },
    changeManager() { S.toast = null; if (isMobile()) S.modal = 'manager'; else S.create.managedOpen = true; },
    noop() { }
  };

  /* ---------- binding of text inputs ---------- */
  const setPath = (path, value) => {
    const keys = path.split('.'); let o = S;
    for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
    o[keys[keys.length - 1]] = value;
  };
  const afterInput = {
    'sel.query'() { S.sel.project = null; S.sel.open = S.sel.query.trim() ? 'proj' : null; S.sel.hl = 0; },
    'sb.phone'() { S.sb.phone = digits(S.sb.phone).slice(0, 10); },
    'sb.otp'() { S.sb.otp = digits(S.sb.otp).slice(0, 4); },
    'addCfg.area'() { S.addCfg.area = inr(num(S.addCfg.area)) === '0' ? '' : inr(num(S.addCfg.area)); recalcAddCfg('area'); },
    'addCfg.price'() { S.addCfg.price = num(S.addCfg.price) ? inr(num(S.addCfg.price)) : ''; recalcAddCfg('price'); },
    'addCfg.rate'() { S.addCfg.rate = num(S.addCfg.rate) ? inr(num(S.addCfg.rate)) : ''; recalcAddCfg('rate'); },
    'report.price'() { const r = S.report, row = S.create.rows.find(x => x.id === r.id); r.price = num(r.price) ? inr(num(r.price)) : ''; if (num(r.price)) r.rate = inr(Math.round(num(r.price) / row.area)); },
    'report.rate'() { const r = S.report, row = S.create.rows.find(x => x.id === r.id); r.rate = num(r.rate) ? inr(num(r.rate)) : ''; if (num(r.rate)) r.price = inr(num(r.rate) * row.area); },
    'edit.total'() { const e = S.edit, row = S.create.rows.find(x => x.id === e.id); e.total = num(e.total) ? inr(num(e.total)) : ''; if (num(e.total)) e.rate = inr(Math.round(num(e.total) / row.area)); },
    'edit.rate'() { const e = S.edit, row = S.create.rows.find(x => x.id === e.id); e.rate = num(e.rate) ? inr(num(e.rate)) : ''; if (num(e.rate)) e.total = inr(num(e.rate) * row.area); }
  };

  /* ---------- render loop with focus preservation ---------- */
  const app = document.getElementById('app');
  function render() {
    const ae = document.activeElement;
    const focus = ae && ae.dataset && ae.dataset.bind ? { key: ae.dataset.bind, s: ae.selectionStart, e: ae.selectionEnd, len: ae.value.length } : null;
    const mobile = isMobile();
    document.body.classList.toggle('is-mobile', mobile);
    document.body.classList.toggle('framed', mobile && window.innerWidth >= 768);
    document.body.classList.toggle('lock', !!S.modal);
    app.innerHTML = mobile ? window.NPMobile.render(S, NP) : window.NPDesktop.render(S, NP);
    if (focus) {
      const el = app.querySelector(`[data-bind="${focus.key}"]`);
      if (el) {
        el.focus();
        const shift = el.value.length - focus.len;
        try { el.setSelectionRange(focus.s + shift, focus.e + shift); } catch (e) { }
      }
    }
    const af = app.querySelector('[data-autofocus]');
    if (af && !focus && document.activeElement !== af) af.focus();
    if (window.NPHooks) window.NPHooks.sync();
  }

  document.addEventListener('click', e => {
    if (e.target.closest('#hooks')) return;
    const el = e.target.closest('[data-a]');
    if (!e.target.closest('[data-dd]')) closeDropdowns();
    if (el && app.contains(el)) {
      e.preventDefault();
      const fn = actions[el.dataset.a];
      if (fn) fn(el.dataset.v);
    }
    render();
  });
  document.addEventListener('input', e => {
    const el = e.target;
    if (!el.dataset || !el.dataset.bind) return;
    setPath(el.dataset.bind, el.type === 'checkbox' ? el.checked : el.value);
    const f = afterInput[el.dataset.bind]; if (f) f();
    render();
  });
  document.addEventListener('keydown', e => {
    const el = e.target;
    if (el.dataset && el.dataset.enter && e.key === 'Enter') { e.preventDefault(); actions[el.dataset.enter](el.dataset.v); render(); }
    if (el.dataset && el.dataset.esc && e.key === 'Escape') { e.preventDefault(); actions[el.dataset.esc](el.dataset.v); render(); return; }
    if (e.key === 'Escape' && S.modal) { actions.closeModal(); render(); }
    if (el.dataset && el.dataset.bind === 'sel.query' && S.sel.open === 'proj') {
      const list = NP.projectMatches();
      if (e.key === 'ArrowDown') { e.preventDefault(); S.sel.hl = Math.min(list.length - 1, S.sel.hl + 1); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); S.sel.hl = Math.max(0, S.sel.hl - 1); render(); }
      if (e.key === 'Enter' && list[S.sel.hl]) { e.preventDefault(); actions.pickProject(list[S.sel.hl].id); render(); }
    }
  });
  let lastMobile = null;
  window.addEventListener('resize', () => { const m = isMobile(); if (m !== lastMobile) { lastMobile = m; render(); } });

  /* ---------- public API (used by layouts + hooks) ---------- */
  const NP = window.NP = {
    D, A, img, meter, reqStar, esc, inr, rupee, short, digits, num, phoneFmt, fmtDate, ddmmyy, MONTHS_L, TODAY, EXPIRY,
    left, budgetState, pinsFor, selectedRows, manager, locSummary, selProject, isMobile, sbPhoneState, sbErrors, sbDetailsValid,
    get S() { return S; },
    set S(v) { S = v; },
    fresh, newCreate, actions, render, startResend,
    projectMatches() {
      const q = S.sel.query.trim().toLowerCase();
      if (!q) return [];
      return D.projects.filter(p => `${p.name}, ${p.locality}, ${p.city}`.toLowerCase().includes(q));
    }
  };

  window.addEventListener('DOMContentLoaded', () => { lastMobile = isMobile(); if (window.NPHooks) window.NPHooks.boot(); render(); });
})();
