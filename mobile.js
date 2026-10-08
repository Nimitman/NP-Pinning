/* Mobile (<768px, or forced 360 device frame) markup for the NP pinning flow. */
window.NPMobile = (function () {
  let NP, S;
  const I = (...a) => NP.img(...a);
  const e = s => NP.esc(s);

  /* ---------------- chrome (device mock, only inside the desktop preview frame) ---------------- */
  const chrome = () => `<div class="m-chrome">
    <div class="m-sb"><span>9:30</span><span class="m-sb__r">${I('sb-wifi-16.svg', 16, 16, 'style="margin-right:-2px"')}${I('sb-signal-16.svg', 16, 16)}${I('sb-battery-16.svg', 16, 16)}</span></div>
    <div class="m-tb">${I('chrome-home-24.svg', 24, 24, 'class="m-tb__home"')}
      <div class="m-tb__url"><span class="m-tb__lock">${I('chrome-lock-8x11.svg', 8, 11.35)}</span>https://seller.housing.com/neo</div>
      <span class="m-tb__tabs">1</span>${I('chrome-more-24.svg', 24, 24, 'class="m-tb__more"')}</div>
  </div>`;

  const topPanel = (title, sub) => `<div class="m-top"><button class="m-top__back" data-a="back" aria-label="Back">${I('ic-back-24.svg', 24, 24)}</button>
    <div class="m-top__h"><b>${title}</b><small>${sub}</small></div></div>`;

  const toastEl = () => {
    const t = S.toast; if (!t) return '';
    if (t.kind === 'error') return `<div class="m-toast m-toast--error"><b>${e(t.title)}</b><button data-a="dismissToast" aria-label="Dismiss">${I('ic-x-danger-16.svg', 16, 16)}</button></div>`;
    return `<div class="m-toast m-toast--${t.kind}"><span><b>${e(t.title)}</b>${t.sub ? `<small>${e(t.sub)}</small>` : ''}</span>${t.undo ? '<a data-a="undo">Undo</a>' : t.change ? '<a data-a="changeManager">Change</a>' : ''}</div>`;
  };

  /* ---------------- dashboard ---------------- */
  const budget = () => {
    const b = S.budget, st = NP.budgetState(), w = Math.max(1, Math.round(b.used / b.total * 294));
    const first = S.firstTime;
    const icon = st === 'danger' || st === 'expired' ? 'ic-cal-x-fill-danger-14.svg' : first || st === 'normal' ? 'ic-cal-x-fill-dark-14.svg' : 'ic-cal-x-fill-warning-14.svg';
    return `<div class="m-budget m-budget--${first ? 'normal' : st}">
      <div class="budget__b1"><b>${b.used}</b><span class="budget__of">of ${b.total} pinnings used</span><span class="sp"></span><span class="budget__left">${NP.left()} left</span></div>
      <div class="budget__track"><i style="width:${w}px"></i></div>
      <div class="budget__b3">${I(icon, 14, 14)}<span>${st === 'expired' ? 'Package expired on 12 Oct 2026' : `Package valid till 12 Oct 2026 · ${b.daysLeft} days left`}</span></div>
      ${st === 'danger' || st === 'expired' ? '<button class="budget__renew" data-a="renew">Renew now</button>' : ''}
    </div>`;
  };

  const mPill = (label, { sel, caret, a, v } = {}) => `<button class="pill ${sel ? 'pill--selected' : ''}" data-a="${a}" ${v ? `data-v="${v}"` : ''}>${label}${caret ? I(sel ? 'ic-caret-down-18.svg' : 'ic-caret-down-muted-18.svg', 18, 18) : ''}</button>`;

  const recoCard = r => `<article class="m-reco">
    <div class="m-reco__id">${r.img ? `<span class="thumb" style="width:64px;height:64px">${I('project-thumb-1.jpg', 64, 64, 'class="cover"')}</span>` : `<span class="thumb thumb--empty" style="width:64px;height:64px">${I('ic-buildings-24.svg', 24, 24)}</span>`}
      <div class="m-reco__n"><b>${r.name}</b><span>${r.config}</span><small>${r.loc}</small></div>
      <button class="pin-btn" data-a="pinCard" data-v="${r.name}">${I('ic-plus-white-16.svg', 16, 16)}Pin</button></div>
    <div class="m-sig"><div class="m-sig__r"><span class="lvl">${NP.meter()}High demand</span><span class="vdiv"></span><span class="lvl">${r.competition}</span></div>
      <div class="m-sig__dev ${r.dev ? '' : 'is-off'}">${I(r.dev ? 'ic-user-circle-gear-12.svg' : 'ic-user-circle-gear-muted-12-2.svg', 12, 12)}${r.dev ? 'Developer is active' : 'Developer is not active'}</div></div>
  </article>`;

  const recos = () => {
    const f = S.filters;
    const list = NP.D.mRecos.filter(r => (!f.competition || r.competition === f.competition) && (!f.dev || r.dev));
    return `<section class="m-card m-recos">
      <div class="m-recos__h"><div class="m-recos__t">${I('ic-sparkle-fill-20.svg', 20, 20)}<b>Best opportunities</b></div><p>High buyer demand and few sellers in your localities</p></div>
      <div class="m-filters">
        <div class="m-filters__r">${mPill(e(f.city), { sel: true, caret: true, a: 'filter', v: 'city' })}${mPill(f.locs, { sel: true, caret: true, a: 'filter', v: 'locs' })}</div>
        <div class="m-filters__r m-hscroll" data-scroll-key="mfilters">${mPill('High demand', { sel: !!f.demand, a: 'filter', v: 'demand' })}${mPill(f.competition || 'Seller competition', { sel: !!f.competition, caret: true, a: 'filter', v: 'competition' })}${mPill('Developer is active', { sel: f.dev, a: 'toggleDev' })}</div>
      </div>
      <div class="m-cards m-hscroll" data-scroll-key="mcards">${list.length ? list.map(recoCard).join('') : '<div class="m-empty">No projects match these filters. <a data-a="clearFilters">Clear filters</a></div>'}</div>
    </section>`;
  };

  const statusChip = s => `<span class="m-chip m-chip--${s.replace(/\s/g, '-').toLowerCase()}">${s}</span>`;
  const pinCard = p => {
    const pend = p.status === 'Pending approval';
    return `<article class="m-pin">
      <div class="m-pin__r1"><div class="m-pin__t"><div class="m-pin__n"><b>${e(p.name)}</b>${I('ic-arrow-square-out-16.svg', 16, 16)}</div><small>${e(p.loc)}</small></div>
        <div class="m-pin__s">${statusChip(p.status)}${p.left && !pend ? `<span class="m-pin__d ${p.status === 'Ending soon' ? 'is-red' : ''}">${p.left}</span>` : ''}</div></div>
      <div class="m-pin__row"><div><small>Duration</small><span>${p.dur || '—'}</span></div><div class="${pend ? 'mut' : ''}"><small>Managed by</small><span>${e(p.by)}</span></div></div>
      <div class="m-pin__row ${pend ? 'mut' : ''}"><div><small>Start date</small><span>${p.mStart || p.start}</span></div><div><small>End date</small><span>${p.end || '—'}</span></div></div>
    </article>`;
  };

  const yourPinnings = () => {
    const extra = S.pinnings.length - NP.D.pinnings.length;
    const tabs = [['All', 12 + extra], ['Active', 8], ['Expired', 2], ['Pending', 2 + extra], ['Rejected', 0]];
    const match = { All: () => true, Active: p => p.status === 'Active' || p.status === 'Ending soon', Expired: p => p.status === 'Expired', Pending: p => p.status === 'Pending approval', Rejected: p => p.status === 'Rejected' }[S.tab];
    const rows = S.pinnings.filter(match);
    return `<section class="m-card m-pins">
      <div class="m-pins__h"><b>Your pinnings</b><div class="pins__r">${S.pinCollapsed ? '' : `<a class="link-brand" data-a="exportCsv">Export ${I('ic-export-brand-16.svg', 16, 16)}</a>`}
        <button class="icon-btn m-ib" data-a="collapse" aria-label="Toggle">${I(S.pinCollapsed ? 'ic-caret-down-dark-18.svg' : 'ic-caret-up-18.svg', 18, 18)}</button></div></div>
      ${S.pinCollapsed ? `<p class="m-pins__sum">You have total of 8 active, ${2 + extra} pending and 3 expired pinnings.</p>` : `
      <div class="tabs m-hscroll" data-scroll-key="mtabs">${tabs.map(([t, n]) => `<button class="tab ${S.tab === t ? 'is-sel' : ''}" data-a="tab" data-v="${t}">${t} (${n})</button>`).join('')}</div>
      <div class="m-pins__list">${rows.length ? rows.map(pinCard).join('') : `<p class="m-empty">No ${S.tab.toLowerCase()} pinnings</p>`}</div>
      <div class="m-pager"><button class="pg-nav" data-a="page" data-v="prev">${I('ic-pagination-prev-16.svg', 16, 16)}</button><span class="m-pager__c">${S.page} / 12</span><button class="pg-nav" data-a="page" data-v="next">${I('ic-pagination-next-16.svg', 16, 16)}</button></div>`}
    </section>`;
  };

  const bottomNav = () => `<nav class="m-nav">
    ${[['Dashboard', 'nav-dashboard-active-24.svg', 24], ['Leads', 'nav-leads-24.svg', 24], ['Listings', 'nav-listings-24.svg', 24], ['Packages', 'nav-packages-25x24.svg', 25.2], ['More', 'nav-more-24.svg', 24]]
      .map(([l, f, w], i) => `<a class="m-nav__i ${i === 0 ? 'is-on' : ''}" data-a="${i === 0 ? 'noop' : 'nav'}"><span class="m-nav__ic">${I(f, w, 24)}</span><span>${l}</span>${i === 0 ? I('nav-selection-indicator-59x3.svg', 59.2, 3, 'class="m-nav__sel"') : ''}</a>`).join('')}
  </nav>`;

  const dashboard = () => `${topPanel('New project pinning', S.firstTime ? 'Pin your listings on new-project pages' : `${S.pinnings.length + 8} pinned · 8 active`)}
    <div class="m-content ${S.firstTime ? 'm-content--24' : ''}">${budget()}${recos()}${S.firstTime ? '' : yourPinnings()}</div>
    <div class="m-bottom"><div class="m-cta"><button class="btn-primary btn-48" data-a="startPinning">${I('ic-plus-white-18.svg', 18, 18)}Add new project pinning</button></div>${bottomNav()}</div>`;

  /* ---------------- select project ---------------- */
  const fld = (o) => `<div class="fld">${o.label ? `<label>${o.label}${o.req ? NP.reqStar : ''}</label>` : ''}
    <div class="fld__box ${o.focus ? 'is-focus' : ''} ${o.err ? 'is-err' : ''}" ${o.a ? `data-a="${o.a}" ${o.v ? `data-v="${o.v}"` : ''}` : ''}>${o.lead || ''}
      ${o.bind ? `<input type="${o.type || 'text'}" data-bind="${o.bind}" value="${e(o.value)}" placeholder="${e(o.ph || '')}" ${o.inputmode ? `inputmode="${o.inputmode}"` : ''} ${o.attrs || ''}>` : `<span class="fld__v ${o.value ? '' : 'is-ph'}">${e(o.value || o.ph)}</span>`}
      ${o.trail || ''}${o.suffix || ''}</div>
    ${o.err ? `<div class="fld__help is-err">${I('ic-warning-circle-danger-16.svg', 16, 16)}<span>${o.err}</span></div>` : o.help || ''}</div>`;

  const projSummary = (p, { tag = false, link = false, cls = '' } = {}) => {
    const pd = NP.D.projectDetails;
    return `<div class="m-psum ${cls}">
      <div class="m-psum__row"><span class="thumb thumb--empty" style="width:72px;height:72px">${I('ic-buildings-28.svg', 28, 28)}</span>
        <div class="m-psum__t">${tag ? '<span class="tag-dark">Selected</span>' : ''}<b>${e(p)}</b><span>${pd.mConfig}  ·  ${pd.price}</span><small>${pd.address}</small></div>
        ${link ? `<a class="m-psum__ext" data-a="nav">${I('ic-arrow-square-out-12.svg', 12, 12)}</a>` : ''}</div>
      <div class="m-sig"><div class="m-sig__r"><span class="lvl">${NP.meter()}High demand</span><span class="vdiv"></span><span class="lvl">No competition yet</span></div>
        <div class="m-sig__dev">${I('ic-user-circle-gear-12.svg', 12, 12)}Developer is active</div></div>
    </div>`;
  };

  const selectPage = () => {
    const s = S.sel, p = NP.selProject(), pinned = p && (p.pinned || s.forcePinned);
    const typing = s.open === 'proj' || (!!s.query && !p);
    const list = NP.projectMatches();
    return `<div class="m-hdr"><button data-a="back" aria-label="Back">${I('ic-arrow-left-24.svg', 24, 24)}</button></div>
      <div class="m-ttl">Select a project to pin</div>
      <div class="m-form">
        ${fld({ label: 'Select city', value: s.city, ph: 'Choose a city', trail: I('ic-caret-down-16.svg', 16, 16), a: 'selOpen', v: 'city' })}
        ${fld({ label: 'Select locality', value: NP.locSummary(s.locs), ph: 'Choose localities', trail: I('ic-caret-down-16.svg', 16, 16), a: 'selOpen', v: 'loc' })}
        <div class="dd-wrap" data-dd>${fld({ label: 'Select project', bind: 'sel.query', value: s.query, ph: 'Search project name', lead: I('ic-magnifying-glass-16.svg', 16, 16), focus: typing,
      trail: typing && s.query ? `<button class="fld__clr" data-a="clearProject">${I('ic-x-16-2.svg', 16, 16)}</button>` : '' })}
          ${s.open === 'proj' ? `<div class="opt-panel opt-panel--proj"><div class="opt-list">${list.map((x, i) => `<button class="opt ${s.hl === i ? 'is-sel' : ''}" data-a="pickProject" data-v="${x.id}">${x.name}, ${x.locality}, ${x.city}</button>`).join('') || `<div class="opt opt--empty">No project match “${e(s.query)}”</div>`}</div>
            <div class="opt-foot">${I('ic-question-16.svg', 20, 20)}<span>Can’t find your project? </span><a data-a="requestProject">Add this project</a></div></div>` : ''}</div>
        ${p && !pinned ? projSummary(p.name, { cls: 'm-psum--sel' }) : ''}
        ${p && pinned ? '<div class="callout callout--warn"><b>You already pinned this project</b><span>Ending soon · started 05 Jul 2026 · 4 days left. A project can hold only one pinning at a time — extend the existing one instead.</span></div>' : ''}
      </div>
      <div class="m-fixcta"><button class="btn-primary btn-48 ${p ? '' : 'is-dis'}" ${p ? 'data-a="startThis"' : 'disabled'}>${pinned ? 'View &amp; extend existing pinning' : 'Start pinning this project'}</button></div>`;
  };

  const requestPage = () => {
    const r = S.req, err = k => r.tried && !r[k];
    const caret = I('ic-caret-down-16.svg', 16, 16);
    return `<div class="m-hdr"><button data-a="back" aria-label="Back">${I('ic-arrow-left-24.svg', 24, 24)}</button></div>
      <div class="m-ttl">Request missing project</div>
      <div class="m-form">
        ${fld({ label: 'Project name', req: true, bind: 'req.name', value: r.name, ph: 'e.g. Unitech Grande', err: err('name') ? 'Project name is required' : '' })}
        ${fld({ label: 'Developer name (optional)', bind: 'req.dev', value: r.dev, ph: 'e.g. Unitech Group' })}
        ${fld({ label: 'City', req: true, value: r.city, ph: 'Select city', trail: caret, a: 'reqOpen', v: 'city', err: err('city') ? 'City is required' : '' })}
        ${fld({ label: 'Locality', req: true, value: r.loc, ph: 'Select locality', trail: caret, a: 'reqOpen', v: 'loc', err: err('loc') ? 'Locality is required' : '' })}
        ${fld({ label: 'RERA ID (optional)', bind: 'req.rera', value: r.rera, ph: 'e.g. ASDF247376' })}
        ${fld({ label: 'Launch date in dd/mm/yyyy format (optional)', bind: 'req.launch', value: r.launch, ph: 'dd/mm/yyyy', inputmode: 'numeric' })}
        ${fld({ label: 'Possession date in dd/mm/yyyy format (optional)', bind: 'req.poss', value: r.poss, ph: 'dd/mm/yyyy', inputmode: 'numeric' })}
        <p class="note13">Housing verifies new projects within 48 hours. No pinning is used until the project is live — we will notify you to pin it.</p>
      </div>
      <div class="m-fixcta"><button class="btn-primary btn-48" data-a="submitRequest">Submit project request</button></div>`;
  };

  /* ---------------- create pinning ---------------- */
  const calendar = () => {
    const c = S.create, m = c.calMonth, y = 2026;
    const first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    let cells = ''; for (let i = 0; i < off; i++) cells += '<span></span>';
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d), dis = dt < NP.TODAY || dt > NP.EXPIRY;
      cells += `<button class="cal__d ${dt.getTime() === c.date.getTime() ? 'is-sel' : ''}" ${dis ? 'disabled' : `data-a="pickDate" data-v="${m}-${d}"`}>${d}</button>`;
    }
    return `<div class="cal m-cal"><div class="cal__h"><button data-a="calMonth" data-v="-1" ${m <= 8 ? 'disabled' : ''}>‹</button><b>${NP.MONTHS_L[m]} ${y}</b><button data-a="calMonth" data-v="1" ${m >= 9 ? 'disabled' : ''}>›</button></div>
      <div class="cal__w">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<span>${d}</span>`).join('')}</div><div class="cal__g">${cells}</div>
      <p class="cal__f">Past dates and dates after 12 Oct 2026 (package expiry) can’t be selected. Pinning goes live only after Housing approves it — usually within 24 hrs.</p></div>`;
  };

  const schedule = () => {
    const c = S.create, n = NP.pinsFor(c.duration);
    return `<section class="m-card m-sched"><b class="m-h16">When should it run?</b>
      <div class="dd-wrap" data-dd style="width:100%">${fld({ label: 'Pinning start date', value: NP.fmtDate(c.date), trail: I('ic-caret-down-16.svg', 16, 16), a: 'dateOpen' })}${c.dateOpen ? calendar() : ''}</div>
      <span class="m-sched__d">Duration</span>
      <div class="m-drow">${[30, 60, 90].map(d => `<button class="dpill ${c.duration === d ? 'is-sel' : ''}" data-a="duration" data-v="${d}"><b>${d} days${d === 90 && c.warn90 ? I('ic-warn-fill-14.svg', 14, 14) : ''}</b><small>${NP.pinsFor(d)} pinning${d > 30 ? 's' : ''}</small></button>`).join('')}</div>
      <p class="m-sched__h">${n} pinning${n > 1 ? 's' : ''} for ${c.duration} days · ${NP.left() - n} will remain</p>
    </section>`;
  };

  const cfgItem = r => {
    const st = { 'Under review': ['info', 'Under review', 'Added by you · verified within 48 hrs'], Reported: ['warn', 'Reported', `30 Sep · ${r.report ? r.report.ref : 'RPT-20931'} · Housing is reviewing`], 'Price updated': ['ok', 'Price updated', `it was ₹${NP.inr(r.oldRate || r.rate)}/sq.ft.`] }[r.status];
    const pencil = `<button class="m-pencil" data-a="editPrice" data-v="${r.id}" aria-label="Edit price">${I('ic-pencil-simple-16.svg', 16, 16)}</button>`;
    return `<div class="m-cfg ${r.selected ? 'is-sel' : ''}">
      <div class="m-cfg__top"><button class="cb m-cfg__cb" data-a="toggleRow" data-v="${r.id}"><span class="cbx16 ${r.selected ? 'is-on' : ''}">${r.selected ? I('ic-check-12-brand.svg', 12, 12) : ''}</span><b>${e(r.label)}</b></button>
        ${r.status === 'Under review' ? `<button class="m-cfg__rm" data-a="removeRow" data-v="${r.id}">Remove</button>` : r.status === 'Reported' ? `<button class="m-cfg__w" data-a="viewReport" data-v="${r.id}" aria-label="View report">${I('ic-warn-fill-16.svg', 16, 16)}</button>` : `<button class="m-cfg__w" data-a="report" data-v="${r.id}" aria-label="Report an issue">${I('ic-warn-fill-16.svg', 16, 16)}</button>`}</div>
      ${st ? `<div class="m-cfg__st ${st[0] === 'ok' ? 'is-bordered' : ''}"><span class="chip chip--${st[0]}">${st[1]}</span><small>${st[2]}</small></div>` : ''}
      <div class="m-cfg__p">
        <div class="m-cfg__pr is-b"><span><small>Price/sq.ft.</small><b>${NP.rupee(r.rate)}</b></span><span class="m-cfg__rt"><a class="unit-sel" data-a="noop">sq.ft.${I('ic-caret-down-brand-16.svg', 16, 16)}</a>${pencil}</span></div>
        <div class="m-cfg__pr"><span><small>Price</small><b>${NP.rupee(r.total)}</b></span><span class="m-cfg__rt"><small>${NP.short(r.total)}</small>${pencil}</span></div>
      </div>
    </div>`;
  };

  const units = () => {
    const c = S.create, rows = c.rows;
    const all = rows.length && rows.every(r => r.selected);
    return `<section class="m-card m-units ${c.error ? 'is-err' : ''}">
      <div class="m-units__h"><b class="m-h16">Which configurations are you selling?</b>
        <button class="cb sel-all" data-a="selectAll"><span class="cbx16 ${all ? 'is-on' : ''}">${all ? I('ic-check-12-brand.svg', 12, 12) : ''}</span>Select all</button></div>
      <div class="m-units__list">${rows.map(cfgItem).join('')}</div>
      <div class="m-units__f"><a class="m-addcfg" data-a="addCfg">${I('ic-plus-brand-16.svg', 16, 16)}Add missing configuration</a><small>Prices you edit improve pricing accuracy across Housing.com</small></div>
    </section>`;
  };

  const avatar = (p, size) => p.photo
    ? `<img class="ava" src="${NP.A}avatar-jitesh-kumar.png" width="${size}" height="${size}" alt="">`
    : `<span class="ava ava--i ${size <= 18 ? 'ava--brand' : ''}" style="width:${size}px;height:${size}px;font-size:${size <= 18 ? 8 : 12}px">${p.initials}</span>`;

  const stickyCta = () => {
    const c = S.create, n = NP.selectedRows().length, p = NP.pinsFor(c.duration), m = NP.manager();
    return `<div class="m-sticky">
      <div class="m-sticky__s"><b>${e(c.project)} · ${c.duration} days from ${NP.fmtDate(c.date)}</b>
        <span>${c.error && !n ? '<em>0 configurations</em>' : `${n} configuration${n === 1 ? '' : 's'}`} · ${p} pinning${p > 1 ? 's' : ''} · ${NP.left() - p} left after this</span></div>
      <div class="m-sticky__mb"><span>Managed by</span><button class="mgr" data-a="managed">${avatar(m, 18)}<span>${e(m.name)}</span>${I('ic-caret-down-16-2.svg', 16, 16)}</button></div>
      <button class="btn-primary btn-48 ${n ? '' : 'is-dis'}" data-a="submit">Submit pinning request</button>
    </div>`;
  };

  const create = () => `${topPanel('Confirm the project details', `${NP.left()} of ${S.budget.total} pinnings left · valid till 12 Oct`)}
    <div class="m-content m-content--create">${projSummary(S.create.project, { tag: true, link: true })}${schedule()}${units()}</div>${stickyCta()}`;

  /* ---------------- sheets & dialogs ---------------- */
  const sheet = (title, body, actions, { sub, sub12, cls = '' } = {}) => `<div class="m-scrim" data-a="closeModal"></div>
    <div class="m-sheet ${cls}" role="dialog" aria-modal="true">
      <div class="m-sheet__h"><b>${title}</b>${sub ? `<small class="${sub12 ? 'is12' : ''}">${sub}</small>` : ''}<button class="m-sheet__x" data-a="closeModal" aria-label="Close">${I('ic-x-16.svg', 16, 16)}</button></div>
      <div class="m-sheet__b" data-scroll-key="sheet">${body}</div>
      ${actions ? `<div class="m-sheet__a">${actions}</div>` : ''}
    </div>`;
  const dialog = (title, body, actions) => `<div class="m-scrim" data-a="closeModal"></div>
    <div class="m-dialog" role="dialog" aria-modal="true"><div class="m-sheet__h"><b>${title}</b><button class="m-sheet__x" data-a="closeModal" aria-label="Close">${I('ic-x-16.svg', 16, 16)}</button></div>
      <div class="m-dialog__b">${body}</div><div class="m-sheet__a">${actions}</div></div>`;
  const btn = (label, a, kind = 'primary', dis = false) => `<button class="btn-${kind} btn-48 ${dis ? 'is-dis' : ''}" ${dis ? 'disabled' : `data-a="${a}"`}>${label}</button>`;
  const hero = (t, p) => `<div class="m-hero">${I('ic-check-circle-success-48.svg', 48, 48)}<div><b>${t}</b><p>${p}</p></div></div>`;
  const kv = rows => `<div class="m-kv">${rows.map(([k, v]) => `<div><span>${k}</span><b>${e(v)}</b></div>`).join('')}</div>`;

  /* picker sheet (city / locality / filter lists) */
  const pickSheet = ({ title, search, bind, items, multi, cta, ctaA }) => `<div class="m-scrim m-scrim--50" data-a="closeModal"></div>
    <div class="m-pick" role="dialog" aria-modal="true">
      <button class="m-sheet__x" data-a="closeModal" aria-label="Close">${I('ic-x-16.svg', 16, 16)}</button>
      <div class="m-pick__t">${title}</div>
      ${search ? `<div class="m-pick__s">${fld({ bind, value: search.value, ph: search.ph, lead: I('ic-magnifying-glass-16.svg', 16, 16) })}</div>` : ''}
      <div class="m-pick__l ${cta ? 'has-cta' : ''}" data-scroll-key="pick">${items.length ? items.map(it => it.locked
    ? `<div class="opt is-lock">${it.label}<span class="lock">${I('ic-warning-12.svg', 12, 12)}Not allowed under your plan</span></div>`
    : it.disabled ? `<div class="opt is-lock">${it.label}<span class="lock">Disabled</span></div>`
      : `<button class="opt ${it.sel ? 'is-sel' : ''}" data-a="${it.a}" data-v="${e(it.v || it.label)}">${it.label}${multi ? `<span class="cbx16 ${it.sel ? 'is-on' : ''}">${it.sel ? I('ic-check-12-brand.svg', 12, 12) : ''}</span>` : ''}</button>`).join('')
      : `<div class="opt-none">No match “<b>${e(search && search.value)}</b>”.<a data-a="clearSearch" data-v="${bind && bind.split('.')[1]}">Clear search</a></div>`}</div>
      ${cta ? `<div class="m-pick__cta"><button class="btn-primary btn-48" data-a="${ctaA}">${cta}</button></div>` : ''}
    </div>`;

  const selSheets = () => {
    const s = S.sel;
    if (s.open === 'city') {
      const q = s.citySearch.toLowerCase();
      return pickSheet({ title: 'Select city', bind: 'sel.citySearch', search: { value: s.citySearch, ph: 'Search city...' }, items: NP.D.cities.filter(c => c.name.toLowerCase().includes(q)).map(c => ({ label: c.name, locked: c.locked, a: 'pickCity', sel: s.city === c.name || (s.city === 'Gurgaon' && c.name === 'Gurugram') })) });
    }
    if (s.open === 'loc') {
      const q = s.locSearch.toLowerCase();
      return pickSheet({ title: 'Select locality', bind: 'sel.locSearch', search: { value: s.locSearch, ph: 'Search locality...' }, multi: true, cta: 'Select locality', ctaA: 'applyLocs', items: NP.D.localities.filter(c => c.name.toLowerCase().includes(q)).map(c => ({ label: c.name, locked: c.locked, a: 'toggleLoc', sel: s.locDraft.includes(c.name) })) });
    }
    return '';
  };
  const filterSheets = () => {
    const f = S.filters;
    const map = {
      city: { title: 'Select city', items: NP.D.cities.map(c => ({ label: c.name, locked: c.locked, a: 'pickFilterCity', sel: f.city === c.name })) },
      locs: { title: 'Select locality', items: ['Sector 71, +2', 'Sector 49', 'Sohna Road'].map(l => ({ label: l, a: 'pickLocsFilter', sel: f.locs === l })) },
      demand: { title: 'Buyer demand', items: [{ label: 'High demand', disabled: true }, { label: 'Moderate demand', a: 'pickDemand', sel: f.demand === 'Moderate demand' }] },
      competition: { title: 'Seller competition', items: ['No competition yet', 'Low competition', 'Moderate competition', 'Crowded'].map(l => ({ label: l, a: 'pickCompetition', sel: f.competition === l })) }
    }[f.open];
    return map ? pickSheet(map) : '';
  };
  const reqSheets = () => {
    const r = S.req; if (!r.open) return '';
    const opts = r.open === 'city' ? NP.D.cities : NP.D.localities;
    return pickSheet({ title: r.open === 'city' ? 'Select city' : 'Select locality', items: opts.map(o => ({ label: o.name, locked: o.locked, a: 'reqPick', v: `${r.open}|${o.name}`, sel: r[r.open] === o.name })) });
  };

  const suffixFld = (o) => fld({ ...o, inputmode: 'numeric', suffix: `<span class="addon ${o.dd ? 'addon--dd' : ''}">${o.suf}</span>` });

  const addCfgSheet = () => {
    const a = S.addCfg, err = a.tried, c3 = I('ic-caret-down-16-3.svg', 16, 16);
    const pills = (list, cur, act) => `<div class="pills">${list.map(p => `<button class="spill ${cur === p ? 'is-sel' : ''}" data-a="${act}" data-v="${p}">${p}</button>`).join('')}</div>`;
    const errRow = t => `<div class="fld__help is-err">${I('ic-warning-circle-danger-16.svg', 16, 16)}<span>${t}</span></div>`;
    return sheet('Add a missing configuration', `<div class="stack16">
      <div class="grp"><label>Property Type${NP.reqStar}</label>${pills(NP.D.propertyTypes, a.type, 'cfgType')}${err && !a.type ? errRow('Select a property type') : ''}</div>
      <div class="grp"><label>Select BHK${NP.reqStar}</label>${pills(NP.D.bhks, a.bhk, 'cfgBhk')}${err && !a.bhk ? errRow('Select BHK') : ''}</div>
      ${fld({ label: `Built up area${NP.reqStar} ${c3}`, bind: 'addCfg.area', value: a.area, ph: 'Enter area', inputmode: 'numeric', suffix: `<button class="addon addon--dd" data-a="cfgUnit">${a.unit}${c3}</button>`, err: err && !NP.num(a.area) ? 'Enter built up area' : '' })}
      <div class="stack12">
        ${suffixFld({ label: 'Price (₹)', req: true, bind: 'addCfg.price', value: a.price, ph: '0', suf: NP.num(a.price) ? NP.short(NP.num(a.price)) : '₹0', err: err && !NP.num(a.price) ? 'Enter price' : '' })}
        ${suffixFld({ label: 'Rate as price/sq.ft. (₹)', req: true, bind: 'addCfg.rate', value: a.rate, ph: '0', suf: '/sq.ft.', err: err && !NP.num(a.rate) ? 'Enter rate' : '' })}
      </div>
      <p class="note13">Housing verifies new configurations before buyers see them. Your pinning goes live for the other selected configurations meanwhile.</p>
    </div>`, btn('Add configuration', 'addCfgSubmit'), { sub: 'Please add the configuration details which you think are missing for this project.', sub12: true, cls: 'm-sheet--tall m-sheet--np' });
  };

  const addCfgThanks = () => {
    const a = S.addCfg, area = NP.num(a.area);
    return sheet('Configuration added', `<div class="stack16">${hero(`Thanks — ${a.bhk} · ${NP.inr(area)} sq.ft is added`, 'It’s part of this pinning now, marked “Under review”. We’ll notify you either way.')}
      ${kv([['Configuration', `${a.bhk} ${a.type} · ${NP.inr(area)} sq.ft`], ['Your price', `${NP.short(NP.num(a.price))} · ₹${a.rate}/sq.ft`], ['Reference', a.ref]])}</div>`, btn('Back to pinning', 'addCfgBack'), { cls: 'm-sheet--thanks' });
  };

  const reportSheet = () => {
    const r = S.report, c3 = I('ic-caret-down-16-3.svg', 16, 16);
    const cb = (k, label, extra) => `<div class="rgrp"><button class="cb" data-a="reason" data-v="${k}"><span class="cbx16 ${r.reasons[k] ? 'is-on' : ''}">${r.reasons[k] ? I('ic-check-12-brand.svg', 12, 12) : ''}</span>${label}</button>${r.reasons[k] ? extra : ''}</div>`;
    const ta = key => `<div class="fld"><label>Description</label><textarea class="ta" data-bind="report.${key}" placeholder="Type here...">${e(r[key])}</textarea></div>`;
    return sheet('Report an issue', `<div class="stack16">
      ${cb('price', 'Price is wrong', `<div class="stack12">${suffixFld({ label: 'Correct price (₹)', req: true, bind: 'report.price', value: r.price, suf: NP.short(NP.num(r.price)) })}${suffixFld({ label: 'Rate as price/sq.ft. (₹)', req: true, bind: 'report.rate', value: r.rate, suf: '/sq.ft.' })}</div>`)}
      ${cb('area', 'Built-up area is wrong', fld({ label: `Built up area${NP.reqStar} ${c3}`, bind: 'report.area', value: r.area, inputmode: 'numeric', suffix: `<span class="addon addon--dd">sq.ft.${c3}</span>` }))}
      ${cb('exist', 'This configuration doesn’t exist in the project', ta('d1'))}
      ${cb('other', 'Something else', ta('d2'))}
      ${r.tried && !Object.values(r.reasons).some(Boolean) ? `<div class="fld__help is-err">${I('ic-warning-circle-danger-16.svg', 16, 16)}<span>Select at least one issue to report</span></div>` : ''}
      <p class="note13">Reports are reviewed by Housing within 72 hrs. Your pinning is not affected.</p>
    </div>`, btn('Send report', 'sendReport'), { sub: r.short, cls: 'm-sheet--tall' });
  };

  const reportThanks = () => {
    const r = S.report;
    return sheet('Issue reported', `<div class="stack16">${hero('Thanks for flagging this', `We’ll verify ${r.short} against the developer’s latest price list within 72 hrs and update it for everyone. Your pinning isn’t affected meanwhile.`)}
      ${kv([['Reported', r.label], ['Suggested', r.suggested], ['Reference', r.ref]])}</div>`, btn('Done', 'reportDone'), { sub: r.short, cls: 'm-sheet--thanks' });
  };

  const editSheet = () => {
    const ed = S.edit, r = S.create.rows.find(x => x.id === ed.id);
    return sheet('Edit price', `<div class="stack16"><p class="note13">Edit either field — the other updates. Applies to your listing on this project; Housing uses it to keep prices accurate.</p>
      <div class="stack12">${suffixFld({ label: 'Total price (₹)', bind: 'edit.total', value: ed.total, suf: NP.short(NP.num(ed.total)) })}
      ${suffixFld({ label: 'Price per sq.ft (₹)', bind: 'edit.rate', value: ed.rate, suf: '/sq.ft.' })}</div></div>`,
      btn('Save price', 'savePriceSheet', 'primary', !NP.num(ed.rate)), { sub: `${r.bhk} Apartment · ${NP.inr(r.area)} sq.ft` });
  };

  const managerSheet = () => `<div class="m-scrim" data-a="closeModal"></div>
    <div class="m-sheet" role="dialog" aria-modal="true">
      <div class="m-sheet__h"><b>Who manages this pinning?</b><small class="is12">Leads from this pinning go to the manager</small><button class="m-sheet__x" data-a="closeModal" aria-label="Close">${I('ic-x-16.svg', 16, 16)}</button></div>
      <div class="m-mgr">${S.create.team.map(p => `<button class="sbdd__row ${S.create.managerId === p.id ? 'is-sel' : ''}" data-a="pickManager" data-v="${p.id}">${avatar(p, 32)}<span><b>${e(p.name)}</b><small>${e(p.meta.replace(/ · /g, ' • '))}</small></span></button>`).join('')}
        <button class="sbdd__create" data-a="createSb"><span class="plus">+</span><span><b>Create new sub-broker</b><small>${S.create.team.length} of 5 sub-brokers used · verify by OTP</small></span></button></div>
    </div>`;

  const phoneFld = (label, st, ro) => {
    const sb = S.sb;
    const help = st === 'inTeam' ? '<div class="fld__help info">Already your sub-broker</div>' : st === 'verified' ? '<div class="fld__help ok">✓ Verified just now</div>' : st === 'linked' ? '' : '<div class="fld__help">We’ll send a 4-digit OTP to this number</div>';
    return fld({ label, bind: ro ? null : 'sb.phone', value: NP.phoneFmt(sb.phone), ph: '10-digit mobile number', inputmode: 'numeric', type: 'tel', lead: `<span class="cc ${sb.phone ? 'is-on' : ''}">+91${I('ic-caret-right-12.svg', 12, 12, 'class="rot90"')}</span><span class="cc-div"></span>`, err: st === 'linked' ? 'This number is linked to another Housing account' : '', help, attrs: 'maxlength="11" data-enter="sendOtp"' });
  };
  const intro = '<p class="sb-intro">Sub-brokers log in with their own number and manage the pinnings, listings and leads you assign to them.</p>';
  const sbSheets = () => {
    const sb = S.sb;
    switch (S.modal) {
      case 'sb-phone': {
        const st = NP.sbPhoneState();
        return sheet('Create a sub-broker', `<div class="stack24"><span class="eyebrow">STEP 1 OF 3 · VERIFY PHONE</span>${intro}${phoneFld('Sub-broker’s mobile number', st)}
          ${st === 'inTeam' ? '<div class="callout callout--info"><b>Rohit Mehra is already in your team</b><span>Added on 14 Aug 2026 · manages 3 pinnings. You don’t need to create him again.</span></div>' : ''}
          ${st === 'linked' ? '<div class="callout callout--err"><b>Can’t add this number</b><span>It belongs to a seller or owner account outside your team. A number can be linked to only one account. Ask them to use another number, or contact support to move it.</span><a data-a="nav">Contact support</a></div>' : ''}</div>`,
          btn('Send OTP', 'sendOtp', 'primary', st !== 'ok'), { cls: 'm-sheet--sb' });
      }
      case 'sb-otp': {
        const o = NP.digits(sb.otp);
        return sheet('Create a sub-broker', `<div class="stack24"><span class="eyebrow">STEP 2 OF 3 · VERIFY OTP</span>
          <div class="sent-to"><span>OTP sent to +91 ${NP.phoneFmt(sb.phone)}</span><a data-a="changeNumber">Change number</a></div>
          <label class="otp">${[0, 1, 2, 3].map(i => `<span class="${o[i] ? 'is-on' : ''} ${i === o.length ? 'is-cur' : ''}">${o[i] || '-'}</span>`).join('')}<input data-bind="sb.otp" value="${e(o)}" inputmode="numeric" autocomplete="one-time-code" maxlength="4" data-enter="verifyOtp" aria-label="OTP"></label>
          <div class="otp-meta"><span>OTP is valid for 10 minutes</span>${sb.resend > 0 ? `<b>Resend in 00:${String(sb.resend).padStart(2, '0')}</b>` : '<a data-a="resend">Resend OTP</a>'}</div>
          <p class="note13">Ask the person to share the OTP received. Entering it confirms he agrees to join your team as a sub-broker.</p></div>`,
          btn('Verify OTP', 'verifyOtp', 'primary', o.length !== 4), { cls: 'm-sheet--sb' });
      }
      case 'sb-details': {
        const er = NP.sbErrors();
        return sheet('Create a sub-broker', `<div class="stack24"><span class="eyebrow">STEP 3 OF 3 · ENTER DETAILS</span>${phoneFld('Mobile number', 'verified', true)}
          ${fld({ label: 'Full name', bind: 'sb.name', value: sb.name, ph: 'Enter full name' })}
          ${fld({ label: 'Email', bind: 'sb.email', value: sb.email, ph: 'name@example.com', type: 'email', err: er.email })}
          ${fld({ label: 'Set a password', bind: 'sb.pw', value: sb.pw, ph: 'At least 8 characters with 1 number', type: 'password', err: er.pw })}
          <button class="creds" data-a="sendCreds"><span class="cbx18 ${sb.sendCreds ? 'is-on' : ''}">${sb.sendCreds ? '✓' : ''}</span>Send login details by SMS and email</button></div>`,
          btn('Create sub-broker', 'createSbSubmit', 'primary', !NP.sbDetailsValid()), { cls: 'm-sheet--sb m-sheet--tall' });
      }
      case 'sb-discard':
        return dialog('Discard this sub-broker?', '<p class="discard">The phone number is verified, but the account isn’t created yet.<br><br>If you leave now nothing is saved and you’ll need a fresh OTP next time.</p>', btn('Keep editing', 'keepEditing', 'secondary') + btn('Discard', 'discard', 'danger'));
      case 'sb-done': {
        const c = sb.created;
        return sheet('Sub-broker created', `<div class="stack16">${hero(`${e(c.name)} is now your sub-broker`, `Login details are on their way to +91 ${NP.phoneFmt(sb.phone)} and ${e(sb.email)}.`)}
          ${kv([['Role', 'Sub-broker'], ['Assigned project', S.create.project], ['Team', `${S.create.team.length} of 5 sub-brokers`]])}</div>`,
          `<button class="m-textbtn" data-a="manageTeam">Manage team</button>${btn('Continue', 'sbContinue')}`, { cls: 'm-sheet--thanks' });
      }
    }
    return '';
  };

  const statusDialog = (title, ok, heading, text, cta, a) => dialog(title, `<div class="m-hero">${I(ok ? 'ic-check-circle-success-48.svg' : 'ic-warning-fill-danger-48.svg', 48, 48)}<div><b>${heading}</b><p>${text}</p></div></div>`, btn(cta, a));
  const thanks = 'Thank you for your interest, your account manager will reach out to you as soon as possible.';

  const overlays = () => {
    if (S.route === 'm-select' && S.sel.open && S.sel.open !== 'proj') return selSheets();
    if (S.route === 'm-request' && S.req.open) return reqSheets();
    if (S.route === 'dashboard' && S.filters.open) return filterSheets();
    switch (S.modal) {
      case 'requestSent': return sheet('Project request sent', `<div class="stack12 m-sent"><span class="status-pill">Under verification · ETA 48 hrs</span><b class="sent__t">${e(S.req.sent)}</b>
        <p>You will get an SMS and an in-app alert once the project is live. It will then appear in “Select a project” and in Best opportunities if it qualifies. Nothing has been deducted from your ${NP.left()} pinnings.</p></div>`, btn('Done', 'closeModal'), { cls: 'm-sheet--r24' });
      case 'limit': return statusDialog('Limit reached', false, 'New project pinning limit reached', 'You\'ve reached the limit of New project pinning slots included in your package. To add more, please purchase additional slots.', 'Yes, I want more slots', 'moreSlots');
      case 'limitThanks': return statusDialog('Limit reached', true, 'Request submitted successfully', thanks, 'Done', 'closeModal');
      case 'expired': return statusDialog('Expired', false, 'New project pinning plan is expired', 'Your time duration for new project pinnings as per the package has expired now. To add more, please purchase additional slots.', 'Yes, I want to extend / purchase again', 'extendPlan');
      case 'expiredThanks': return statusDialog('Expired', true, 'Request submitted successfully', thanks, 'Done', 'closeModal');
      case 'addCfg': return addCfgSheet();
      case 'addCfgThanks': return addCfgThanks();
      case 'report': return reportSheet();
      case 'reportThanks': return reportThanks();
      case 'editPrice': return editSheet();
      case 'manager': return managerSheet();
      default: return S.modal && S.modal.startsWith('sb-') ? sbSheets() : '';
    }
  };

  return {
    render(state, np) {
      NP = np; S = state;
      const framed = document.body.classList.contains('framed');
      const page = S.route === 'create' && S.create ? create() : S.route === 'm-select' ? selectPage() : S.route === 'm-request' ? requestPage() : dashboard();
      return `<div class="mb-frame"><div class="mb ${'mb--' + S.route}">${framed ? chrome() : ''}<div class="mb-scroll" data-scroll-key="page">${page}</div>${toastEl()}${overlays()}</div></div>`;
    }
  };
})();
