/* Desktop (≥768px) markup for the NP pinning flow. Pure string templates; state lives in app.js. */
window.NPDesktop = (function () {
  let NP, S, D;
  const I = (...a) => NP.img(...a);
  const e = s => NP.esc(s);

  /* ---------------- shared pieces ---------------- */
  const navbar = () => `
  <header class="d-nav"><div class="d-nav__in">
    <a class="d-nav__logo" data-a="nav">${I('housing-logo-seller-dark.svg', 140, 35)}</a>
    <nav class="d-nav__menu">
      <a class="d-nav__item is-active" data-a="nav"><i></i>Dashboard</a>
      <a class="d-nav__item" data-a="nav">Leads</a>
      <a class="d-nav__item" data-a="nav">Listings</a>
      <a class="d-nav__item" data-a="nav">Packages</a>
      <a class="d-nav__item is-more" data-a="nav">More ${I('ic-chevron-down-white-16.svg', 16, 16)}</a>
    </nav>
    <div class="d-nav__rhs">
      <a class="d-nav__coin" data-a="nav">${I('ic-coin-16.svg', 15.46, 16)}<span>890</span></a>
      <button class="d-nav__add" data-a="nav"><span class="mask-plus"></span>Add Property</button>
    </div>
  </div></header>`;

  const budget = () => {
    const st = NP.budgetState(), b = S.budget, used = b.used, l = NP.left();
    const w = Math.max(1, Math.round(used / b.total * 308));
    const icon = { normal: 'ic-calendar-dot-14.svg', warning: 'ic-cal-x-fill-warning-14.svg', danger: 'ic-cal-x-fill-danger-14.svg', expired: 'ic-cal-x-fill-danger-14.svg' }[st];
    const days = st === 'expired' ? 'Package expired on 12 Oct 2026' : `Package valid till 12 Oct 2026 · ${b.daysLeft} days left`;
    return `<div class="budget budget--${st}">
      <div class="budget__b1"><b>${used}</b><span class="budget__of">of ${b.total} pinnings used</span><span class="sp"></span><span class="budget__left">${l} left</span></div>
      <div class="budget__track"><i style="width:${w}px"></i></div>
      <div class="budget__b3">${I(icon, 14, 14)}<span>${days}</span></div>
      ${st === 'danger' || st === 'expired' ? '<button class="budget__renew" data-a="renew">Renew now</button>' : ''}
    </div>`;
  };

  const backBtn = () => `<button class="back-btn" data-a="back" aria-label="Back">${I('ic-caret-right-16.svg', 16, 16, 'class="rot180"')}</button>`;

  const thumb = (hasImg, size = 64) => hasImg
    ? `<span class="thumb" style="width:${size}px;height:${size}px">${I('project-thumb-1.jpg', size, size, 'class="cover"')}</span>`
    : `<span class="thumb thumb--empty" style="width:${size}px;height:${size}px">${I(size > 64 ? 'ic-buildings-28.svg' : 'ic-buildings-24.svg', size > 64 ? 28 : 24, size > 64 ? 28 : 24)}</span>`;

  const toastEl = () => {
    const t = S.toast; if (!t) return '';
    if (t.kind === 'error') return `<div class="d-toast d-toast--error"><b>${e(t.title)}</b><button data-a="dismissToast">${I('ic-x-danger-16.svg', 16, 16)}</button></div>`;
    return `<div class="d-toast d-toast--${t.kind}"><span><b>${e(t.title)}</b>${t.sub ? ` · ${e(t.sub)}` : ''}</span>${t.change ? '<a data-a="changeManager">Change</a>' : t.undo ? '<a data-a="undo">Undo</a>' : ''}</div>`;
  };

  /* ---------------- dashboard ---------------- */
  const header = () => {
    const first = S.firstTime;
    return `<section class="p-head ${first ? 'p-head--top' : ''}">
      <div class="p-head__l">${backBtn()}
        <div class="p-head__t">
          <div class="p-head__tt"><h1>New project pinning</h1><p>Spend your pinnings where buyers are already searching and few sellers have shown up</p></div>
          ${first ? '' : `<button class="btn-outline" data-a="startPinning">${I('ic-plus-brand-16.svg', 16, 16)}Pin a project</button>`}
        </div>
      </div>
      ${budget()}
    </section>`;
  };

  const howItWorks = () => `<section class="card how">
    <div class="how__h"><h2>How it works</h2><p>Your package includes 150 pinnings. Each pinning features your listing on a new project's page for up to 90 days.</p></div>
    <div class="how__steps">
      ${[['Pick a project', 'We rank projects by how many buyers search them and how few sellers are already there.'],
        ['Pin it', 'You can pin a project. Pin (1 pinning) lists you with the project\'s sellers.'],
        ['Get leads', 'Once Housing approves it, buyers on that project page see your listing.']]
      .map((s, i) => `<div class="how__step"><div class="how__st"><span class="how__n">${i + 1}</span><h3>${s[0]}</h3></div><p>${s[1]}</p></div>`).join('')}
    </div></section>`;

  const pill = (label, { state = 'default', caret = false, a, v, dd } = {}) =>
    `<button class="pill pill--${state}" ${a ? `data-a="${a}"` : ''} ${v ? `data-v="${v}"` : ''}>${label}${caret ? I(state === 'selected' ? 'ic-caret-down-18.svg' : 'ic-caret-down-muted-18.svg', 18, 18) : ''}</button>`;

  const ddPanel = (items, cur, act) => `<div class="dd-panel">${items.map(it => {
    const dis = it.disabled;
    return `<button class="dd-item ${cur === it.label ? 'is-sel' : ''} ${dis ? 'is-dis' : ''}" ${dis ? '' : `data-a="${act}" data-v="${it.label}"`}>${it.label}${dis ? '<span class="tip">Disabled</span>' : ''}</button>`;
  }).join('')}</div>`;

  const recoCard = (r) => `<article class="reco">
    <div class="reco__id">${thumb(r.img)}
      <div class="reco__names"><b>Godrej Meridien</b><span class="t2">2, 3 BHK Apartments</span><span class="t3">Sector 106, Dwarka Expressway</span></div>
      <button class="pin-btn" data-a="pinCard">${I('ic-plus-white-16.svg', 16, 16)}Pin</button>
    </div>
    <div class="reco__sig">
      <div class="reco__row">
        <div class="lvl">${NP.meter()}<span>High demand</span></div>
        <span class="vdiv"></span>
        <div class="lvl ${r.competition === 'No competition yet' ? '' : 'lvl--pad'}"><span>${r.competition}</span></div>
      </div>
      <div class="reco__dev ${r.dev ? '' : 'is-off'}">${I(r.dev ? 'ic-user-circle-gear-12.svg' : 'ic-user-circle-gear-muted-12.svg', 12, 12)}<span>${r.dev ? 'Developer is active' : 'Developer is not active'}</span></div>
    </div>
  </article>`;

  const recoBand = () => {
    const f = S.filters;
    let list = NP.D.recos.filter(r => (!f.competition || r.competition === f.competition) && (!f.dev || r.dev));
    const max = Math.max(0, list.length - 3);
    const pos = Math.min(S.carousel, max);
    return `<section class="card band ${S.firstTime ? 'band--20' : ''}">
      <div class="band__h"><div class="band__t">${I('ic-sparkle-fill-20.svg', 20, 20)}<h2>Best opportunities for you (24)</h2></div>
        <p>We recommend high buyer demand, few sellers tagged projects in your selected locality</p></div>
      <div class="band__bar">
        <div class="band__filters">
          <span class="band__lbl">Filters:</span>
          <div class="dd-wrap" data-dd>${pill(e(f.city), { state: 'selected', caret: true, a: 'filter', v: 'city' })}
            ${f.open === 'city' ? ddPanel(NP.D.cities.filter(c => !c.locked).slice(0, 5).map(c => ({ label: c.name })), f.city, 'pickFilterCity') : ''}</div>
          <div class="dd-wrap" data-dd>${pill(f.locs, { state: 'selected', caret: true, a: 'filter', v: 'locs' })}
            ${f.open === 'locs' ? ddPanel([{ label: 'Sector 71, +2' }, { label: 'Sector 49' }, { label: 'Sohna Road' }], f.locs, 'pickLocsFilter') : ''}</div>
          <span class="band__div"></span>
          ${pill('High demand', { state: f.demand ? 'selected' : 'default', a: 'pickDemand', v: 'High demand' })}
          <div class="dd-wrap" data-dd>${pill(f.competition && f.open !== 'competition' ? f.competition : 'Seller competition', { state: f.competition ? 'selected' : 'default', caret: true, a: 'filter', v: 'competition' })}
            ${f.open === 'competition' ? ddPanel(['No competition yet', 'Low competition', 'Moderate competition', 'Crowded'].map(l => ({ label: l })), f.competition, 'pickCompetition') : ''}</div>
          ${pill('Developer is active', { state: f.dev ? 'selected' : 'default', a: 'toggleDev' })}
        </div>
        <div class="band__arrows">
          <button class="icon-btn ${pos === 0 ? 'is-dis' : ''}" data-a="carousel" data-v="-1">${I('ic-caret-left-18.svg', 18, 18)}</button>
          <button class="icon-btn ${pos >= max ? 'is-dis' : ''}" data-a="carousel" data-v="1">${I('ic-caret-right-18.svg', 18, 18)}</button>
        </div>
      </div>
      <div class="band__view">${list.length
        ? `<div class="band__row" style="transform:translateX(${-pos * 376}px)">${list.map(recoCard).join('')}</div>`
        : `<div class="band__empty">No projects match these filters. <a data-a="clearFilters">Clear filters</a></div>`}</div>
    </section>`;
  };

  const badge = s => `<span class="badge badge--${s.replace(/\s/g, '-').toLowerCase()}">${s}</span>`;

  const pinnings = () => {
    const extra = S.pinnings.length - NP.D.pinnings.length;
    if (S.pinCollapsed) return `<section class="card pins-banner"><div><h2>Your pinnings</h2><p>You have total of 8 active, ${2 + extra} pending and 3 expired pinnings.</p></div>
      <button class="icon-btn" data-a="collapse" aria-label="Expand">${I('ic-caret-down-dark-18.svg', 18, 18)}</button></section>`;
    const tabs = [['All', 12 + extra], ['Active', 8], ['Expired', 2], ['Pending', 2 + extra], ['Rejected', 0]];
    const match = { All: () => true, Active: p => p.status === 'Active' || p.status === 'Ending soon', Expired: p => p.status === 'Expired', Pending: p => p.status === 'Pending approval', Rejected: p => p.status === 'Rejected' }[S.tab];
    const rows = S.pinnings.filter(match);
    const dash = v => v === '—' ? `<span class="dash">—</span>` : v;
    return `<section class="card pins ${S.collapsible ? 'pins--c' : ''}">
      <div class="pins__h"><h2>Your pinnings</h2><div class="pins__r">
        <a class="link-brand" data-a="exportCsv">Export ${I('ic-export-brand-16.svg', 16, 16)}</a>
        ${S.collapsible ? `<button class="icon-btn" data-a="collapse" aria-label="Collapse">${I('ic-caret-up-18.svg', 18, 18)}</button>` : ''}
      </div></div>
      <div class="tabs">${tabs.map(([t, n]) => `<button class="tab ${S.tab === t ? 'is-sel' : ''}" data-a="tab" data-v="${t}">${t} (${n})</button>`).join('')}</div>
      <div class="ptable">
        <div class="ptable__h"><span class="c1">Project</span><span class="c2">Start date</span><span class="c3">Ends in</span><span class="c4">Status</span><span class="c5">Managed by</span></div>
        ${rows.length ? rows.map(p => `<div class="ptable__r">
          <span class="c1"><b>${e(p.name)}</b><small>${e(p.loc)}</small></span>
          <span class="c2 ${p.start === '—' ? 'em' : ''}">${p.start}</span>
          <span class="c3 ${p.status === 'Ending soon' ? 'warn' : ''}">${dash(p.ends)}</span>
          <span class="c4">${badge(p.status)}</span>
          <span class="c5 ${p.by === '—' ? 'mut' : ''}">${e(p.by)}</span></div>`).join('')
        : `<div class="ptable__empty">No ${S.tab.toLowerCase()} pinnings</div>`}
      </div>
      <div class="pager">
        <button class="pg-nav" data-a="page" data-v="prev">${I('ic-pagination-prev-16.svg', 16, 16)}</button>
        <div class="pg-grp">${[1, 2, 3, 4].map(n => `<button class="pg ${S.page === n ? 'is-sel' : ''}" data-a="page" data-v="${n}">${n}</button>`).join('')}
          <span class="pg pg--el">...</span>${S.page > 4 && S.page < 12 ? `<button class="pg is-sel">${S.page}</button>` : ''}<button class="pg ${S.page === 12 ? 'is-sel' : ''}" data-a="page" data-v="12">12</button></div>
        <button class="pg-nav" data-a="page" data-v="next">${I('ic-pagination-next-16.svg', 16, 16)}</button>
      </div>
    </section>`;
  };

  const dashboard = () => `${header()}${S.firstTime ? howItWorks() : ''}${recoBand()}${S.firstTime ? '' : pinnings()}
    <div class="cta-bar"><button class="btn-primary btn-48" data-a="startPinning">+ Add new project pinning</button></div>`;

  /* ---------------- create pinning ---------------- */
  const summaryCard = () => {
    const pd = NP.D.projectDetails, c = S.create;
    return `<section class="psum">
      <span class="thumb thumb--empty psum__thumb">${I('ic-buildings-28.svg', 28, 28)}</span>
      <div class="psum__pn">
        <div class="psum__g">
          <div class="psum__top"><h2>${e(c.project)}</h2><span class="tag-dark">Selected</span></div>
          <p class="psum__meta">${pd.config}  ·  ${pd.price}</p>
          <p class="psum__addr">${pd.address}</p>
        </div>
        <div class="sigstrip">
          <span class="sigstrip__c">${NP.meter('meter--16')}High demand</span>
          <span class="sigstrip__c">${I('ic-users-fill-16.svg', 16, 16)}No competition yet • 0 sellers tagged</span>
          <span class="sigstrip__c">${I('ic-user-circle-gear-16.svg', 16, 16)}Developer is active here</span>
        </div>
      </div>
      <a class="psum__prev" data-a="nav">${I('ic-arrow-square-out-14.svg', 14, 14)}Preview project</a>
    </section>`;
  };

  const calendar = () => {
    const c = S.create, m = c.calMonth, y = 2026;
    const first = new Date(y, m, 1), offset = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<span></span>';
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d), dis = dt < NP.TODAY || dt > NP.EXPIRY;
      const sel = dt.getTime() === c.date.getTime();
      cells += `<button class="cal__d ${sel ? 'is-sel' : ''}" ${dis ? 'disabled' : `data-a="pickDate" data-v="${m}-${d}"`}>${d}</button>`;
    }
    return `<div class="cal">
      <div class="cal__h"><button data-a="calMonth" data-v="-1" ${m <= 8 ? 'disabled' : ''}>‹</button><b>${NP.MONTHS_L[m]} ${y}</b><button data-a="calMonth" data-v="1" ${m >= 9 ? 'disabled' : ''}>›</button></div>
      <div class="cal__w">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<span>${d}</span>`).join('')}</div>
      <div class="cal__g">${cells}</div>
      <p class="cal__f">Past dates and dates after 12 Oct 2026 (package expiry) can’t be selected. Pinning goes live only after Housing approves it — usually within 24 hrs.</p>
    </div>`;
  };

  const schedule = () => {
    const c = S.create, n = NP.pinsFor(c.duration);
    return `<section class="card sched">
      <h2>When should it run?</h2>
      <div class="sched__f"><label>Pinning start date</label>
        <div class="dd-wrap" data-dd><button class="datef" data-a="dateOpen"><span>${NP.fmtDate(c.date)}</span>${I('ic-caret-down-16-2.svg', 16, 16)}</button>${c.dateOpen ? calendar() : ''}</div></div>
      <div class="sched__f"><label>Select duration</label>
        <div class="drow">${[30, 60, 90].map(d => `<button class="dpill ${c.duration === d ? 'is-sel' : ''}" data-a="duration" data-v="${d}">
          <b>${d} days${d === 90 && c.warn90 ? I('ic-warn-fill-14.svg', 14, 14) : ''}</b><small>${NP.pinsFor(d)} pinning${d > 30 ? 's' : ''}</small></button>`).join('')}
          <span class="hint">${I('ic-info-18.svg', 18, 18)}${n} pinning${n > 1 ? 's' : ''} will be used for ${c.duration} days · ${NP.left() - n} will remain</span>
        </div></div>
    </section>`;
  };

  const chip = st => {
    const m = { 'Under review': 'info', Reported: 'warn', 'Price updated': 'ok', 'Sold out': 'mute' }[st];
    return m ? `<span class="chip chip--${m}">${st === 'Price updated' ? 'Price updated by you' : st}</span>` : '';
  };
  const note = r => ({
    'Under review': 'Added by you · verified within 48 hrs',
    Reported: `30 Sep · ${r.report ? r.report.ref : 'RPT-20931'} · Housing is reviewing`,
    'Price updated': `Was ₹${NP.inr(r.oldRate || r.rate)}/sq.ft · your listing only`,
    'Editing price': 'Total updates as you type · Enter to save, Esc to cancel',
    'Sold out': 'Marked sold out by the developer · can’t be selected'
  })[r.status];

  const pencil = (id) => `<button class="pencil" data-a="editPrice" data-v="${id}" aria-label="Edit price">${I('ic-pencil-simple-16.svg', 16, 16)}</button>`;
  const cfgRow = r => {
    const sold = r.status === 'Sold out', editing = r.status === 'Editing price';
    const showEdit = !sold && !editing;
    const total = editing ? NP.num(r.draft) * r.area : r.total;
    const action = editing
      ? `<button class="txt-btn brand" data-a="savePrice" data-v="${r.id}">Save</button><button class="txt-btn" data-a="cancelPrice" data-v="${r.id}">Cancel</button>`
      : r.status === 'Under review' ? `<button class="txt-btn" data-a="removeRow" data-v="${r.id}">Remove</button>`
        : r.status === 'Reported' ? `<button class="txt-btn" data-a="viewReport" data-v="${r.id}">Reported</button>`
          : `<button class="report-btn" data-a="report" data-v="${r.id}">${I('ic-warn-fill-16.svg', 16, 16)}Report</button>`;
    return `<div class="crow ${r.selected && !sold ? 'is-sel' : ''} ${sold ? 'is-sold' : ''}">
      <span class="c-sel"><button class="cbx ${r.selected && !sold ? 'is-on' : ''} ${sold ? 'is-dis' : ''}" data-a="toggleRow" data-v="${r.id}" aria-label="Select">${r.selected && !sold ? I('ic-check-white-12.svg', 12, 12) : ''}</button></span>
      <span class="c-cfg"><b>${e(r.label)}</b>${note(r) ? `<span class="status-line">${chip(r.status)}<small>${note(r)}</small></span>` : ''}</span>
      <span class="c-price"><b>${NP.rupee(total)}</b><small>${NP.short(total)}</small>${showEdit ? pencil(r.id) : ''}</span>
      <span class="c-unit">${editing
        ? `<span class="unit-input"><span class="ui-pre">₹</span><input data-bind="create.rows.${S.create.rows.indexOf(r)}.draft" value="${e(r.draft)}" data-enter="savePrice" data-esc="cancelPrice" data-v="${r.id}" inputmode="numeric" data-autofocus><span class="ui-suf">/sq.ft.</span></span>`
        : `<b>${NP.rupee(r.rate)}</b><small>/sq.ft</small>${showEdit ? pencil(r.id) : ''}`}</span>
      <span class="c-act">${action}</span>
    </div>`;
  };

  const units = () => {
    const c = S.create, rows = c.rows.filter(r => r.status !== 'Sold out');
    const all = rows.length && rows.every(r => r.selected);
    return `<section class="card units">
      <div class="units__h"><div><h2>Which configurations are you selling?</h2><p>Buyers searching these configurations will see you. Areas shown are built-up area.</p></div>
        <button class="sel-all" data-a="selectAll"><span class="cbx16 ${all ? 'is-on' : ''}">${all ? I('ic-check-12-brand.svg', 12, 12) : ''}</span>Select all</button></div>
      <div class="ctable ${c.error ? 'is-err' : ''}">
        <div class="chead"><span class="c-sel"></span><span class="c-cfg">Configuration · built-up area</span><span class="c-price">Total price</span>
          <span class="c-unit">Price / <a class="unit-sel" data-a="toggleUnit">${S.unit === 'sqft' ? 'sq.ft.' : 'sq.m.'}${I('ic-caret-down-brand-16.svg', 16, 16)}</a></span><span class="c-act">Report an issue</span></div>
        ${c.rows.map(cfgRow).join('')}
      </div>
      ${c.error ? '<p class="units__err">Select at least one configuration you are selling — buyers are matched to you by configuration.</p>' : ''}
      <div class="units__f"><a class="link-brand" data-a="addCfg">+ Add missing configuration</a><span class="sp"></span><small>Prices you edit improve pricing accuracy across Housing.com</small></div>
    </section>`;
  };

  const avatar = (p, size) => p.photo
    ? `<img class="ava" src="${NP.A}${size <= 18 ? 'avatar-jitesh-kumar-17.png' : 'avatar-jitesh-kumar.png'}" width="${size}" height="${size}" alt="">`
    : `<span class="ava ava--i ${p.isNew || size <= 18 ? 'ava--brand' : ''}" style="width:${size}px;height:${size}px;font-size:${size <= 18 ? 8 : 12}px">${p.initials}</span>`;

  const managerDd = () => `<div class="sbdd">
    <div class="sbdd__t"><b>Who manages this pinning?</b><small>Leads from this pinning go to the manager</small></div>
    ${S.create.team.map(p => `<button class="sbdd__row ${S.create.managerId === p.id ? 'is-sel' : ''}" data-a="pickManager" data-v="${p.id}">${avatar(p.isNew ? p : p, 32)}<span><b>${e(p.name)}</b><small>${e(p.meta)}</small></span></button>`).join('')}
    <button class="sbdd__create" data-a="createSb"><span class="plus">+</span><span><b>Create new sub-broker</b><small>${S.create.team.length} of 5 sub-brokers used · verify by OTP</small></span></button>
  </div>`;

  const submitBar = () => {
    const c = S.create, n = NP.selectedRows().length, p = NP.pinsFor(c.duration), m = NP.manager();
    return `<section class="card subbar">
      <div class="subbar__l"><b>Pinning ${e(c.project)} for ${c.duration} days from ${NP.fmtDate(c.date)}</b>
        <small>${n} configuration${n === 1 ? '' : 's'} selected · ${p} pinning${p > 1 ? 's' : ''} used · ${NP.left() - p} remaining after this</small></div>
      <span class="subbar__mb">Managed by</span>
      <div class="dd-wrap dd-wrap--up" data-dd>
        <button class="mgr" data-a="managed">${avatar(m, 17)}<span>${e(m.name)}</span>${I('ic-caret-down-16-2.svg', 16, 16)}</button>
        ${c.managedOpen ? managerDd() : ''}
      </div>
      <button class="btn-primary btn-44" data-a="submit">Submit pinning request</button>
    </section>`;
  };

  const create = () => `<section class="p-head">
      <div class="p-head__l">${backBtn()}<div class="p-head__t"><div class="p-head__tt"><h1>Creating new project pinning</h1><p>Confirm the details before pinning the project</p></div></div></div>
      ${budget()}
    </section>
    ${summaryCard()}${schedule()}${units()}${submitBar()}`;

  /* ---------------- modals ---------------- */
  const modal = (title, body, actions, { sub, w = 560, cls = '', top } = {}) => `
    <div class="scrim" data-a="closeModal"></div>
    <div class="modal ${cls}" role="dialog" aria-modal="true" style="width:${w}px;${top ? `top:${top}px` : ''}">
      <div class="modal__h"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}<button class="modal__x" data-a="closeModal" aria-label="Close">${I('ic-x-16.svg', 16, 16)}</button></div>
      <div class="modal__b">${body}</div>
      ${actions ? `<div class="modal__a">${actions}</div>` : ''}
    </div>`;
  const btn = (label, a, kind = 'primary', dis = false) => `<button class="btn-${kind} btn-48 ${dis ? 'is-dis' : ''}" ${dis ? 'disabled' : `data-a="${a}"`}>${label}</button>`;

  const field = ({ label, req, value, ph, bind, lead, trail, cls = '', a, v, ro, focus, err, help, type = 'text', inputmode, suffix, attrs = '' }) => `
    <div class="fld ${cls}">
      ${label ? `<label>${label}${req ? NP.reqStar : ''}</label>` : ''}
      <div class="fld__box ${focus ? 'is-focus' : ''} ${err ? 'is-err' : ''}" ${a ? `data-a="${a}" ${v ? `data-v="${v}"` : ''}` : ''}>
        ${lead || ''}
        ${bind ? `<input type="${type}" data-bind="${bind}" value="${e(value)}" placeholder="${e(ph || '')}" ${inputmode ? `inputmode="${inputmode}"` : ''} ${ro ? 'readonly' : ''} ${attrs}>`
      : `<span class="fld__v ${value ? '' : 'is-ph'}">${e(value || ph)}</span>`}
        ${trail || ''}${suffix || ''}
      </div>
      ${err ? `<div class="fld__help is-err">${I('ic-warning-circle-danger-16.svg', 16, 16)}<span>${err}</span></div>` : help || ''}
    </div>`;

  const cityPanel = () => {
    const q = S.sel.citySearch.trim().toLowerCase(), list = NP.D.cities.filter(c => c.name.toLowerCase().includes(q));
    return `<div class="opt-panel" style="height:${list.length ? 360 : 'auto'}">
      <div class="opt-panel__s">${field({ bind: 'sel.citySearch', value: S.sel.citySearch, ph: 'Search city...', lead: I('ic-magnifying-glass-16.svg', 16, 16), attrs: 'data-autofocus' })}</div>
      ${list.length ? `<div class="opt-list">${list.map(c => c.locked
      ? `<div class="opt is-lock">${c.name}<span class="lock">${I('ic-warning-12.svg', 12, 12)}Not allowed under your plan</span></div>`
      : `<button class="opt ${(S.sel.city === c.name || (S.sel.city === 'Gurgaon' && c.name === 'Gurugram')) ? 'is-sel' : ''}" data-a="pickCity" data-v="${c.name}">${c.name}</button>`).join('')}</div>`
        : `<div class="opt-none">No city match “<b>${e(S.sel.citySearch)}</b>”.<a data-a="clearSearch" data-v="citySearch">Clear search</a></div>`}
    </div>`;
  };
  const locPanel = () => {
    const q = S.sel.locSearch.trim().toLowerCase(), list = NP.D.localities.filter(c => c.name.toLowerCase().includes(q));
    return `<div class="opt-panel opt-panel--multi" style="height:${list.length ? 360 : 'auto'}">
      <div class="opt-panel__s">${field({ bind: 'sel.locSearch', value: S.sel.locSearch, ph: 'Search locality...', lead: I('ic-magnifying-glass-16.svg', 16, 16), attrs: 'data-autofocus' })}</div>
      ${list.length ? `<div class="opt-list">${list.map(c => {
      if (c.locked) return `<div class="opt is-lock">${c.name}<span class="lock">${I('ic-warning-12.svg', 12, 12)}Not allowed under your plan</span></div>`;
      const on = S.sel.locDraft.includes(c.name);
      return `<button class="opt ${on ? 'is-sel' : ''}" data-a="toggleLoc" data-v="${c.name}">${c.name}<span class="cbx16 ${on ? 'is-on' : ''}">${on ? I('ic-check-12-brand.svg', 12, 12) : ''}</span></button>`;
    }).join('')}</div>
      <div class="opt-cta"><button class="btn-secondary btn-48" data-a="applyLocs">Select locality</button></div>`
        : `<div class="opt-none">No locality match “<b>${e(S.sel.locSearch)}</b>”.<a data-a="clearSearch" data-v="locSearch">Clear search</a></div>`}
    </div>`;
  };
  const projPanel = () => {
    const list = NP.projectMatches();
    return `<div class="opt-panel opt-panel--proj">
      <div class="opt-list">${list.map((p, i) => `<button class="opt ${S.sel.hl === i ? 'is-sel' : ''}" data-a="pickProject" data-v="${p.id}">${p.name}, ${p.locality}, ${p.city}</button>`).join('') || `<div class="opt opt--empty">No project match “${e(S.sel.query)}”</div>`}</div>
      <div class="opt-foot">${I('ic-question-20.svg', 20, 20)}<span>Can’t find your project? </span><a data-a="requestProject">Add this project</a></div>
    </div>`;
  };

  const projectSummaryMini = (p) => `<div class="pmini">
    <div class="pmini__row"><span class="thumb thumb--empty" style="width:72px;height:72px">${I('ic-buildings-28-3.svg', 28, 28)}</span>
      <div class="pmini__t"><b>${p.name}</b><span class="m">${NP.D.projectDetails.config}  ·  ${NP.D.projectDetails.price}</span><small>${NP.D.projectDetails.address}</small></div></div>
    <div class="reco__sig"><div class="reco__row"><div class="lvl">${NP.meter()}<span>High demand</span></div><span class="vdiv"></span><div class="lvl"><span>No competition yet</span></div></div>
      <div class="reco__dev">${I('ic-user-circle-gear-12.svg', 12, 12)}<span>Developer is active</span></div></div>
  </div>`;

  const selectModal = () => {
    const s = S.sel, p = NP.selProject(), pinned = p && (p.pinned || s.forcePinned);
    const caret = I('ic-caret-down-16.svg', 16, 16);
    const typing = s.open === 'proj' || (!!s.query && !p);
    const body = `<div class="stack24">
      <div class="dd-wrap" data-dd>${field({ label: 'Select city', value: s.open === 'city' ? '' : s.city, ph: 'Choose a city', trail: caret, a: 'selOpen', v: 'city', cls: 'fld--select' })}${s.open === 'city' ? cityPanel() : ''}</div>
      <div class="dd-wrap" data-dd>${field({ label: 'Select locality', value: s.open === 'loc' ? '' : NP.locSummary(s.locs), ph: 'Choose localities', trail: caret, a: 'selOpen', v: 'loc', cls: 'fld--select' })}${s.open === 'loc' ? locPanel() : ''}</div>
      <div class="dd-wrap" data-dd>${field({ label: 'Select project', bind: 'sel.query', value: s.query, ph: 'Search project name', lead: I('ic-magnifying-glass-16.svg', 16, 16), focus: typing, cls: p ? 'is-filled' : 'is-typing',
      trail: typing && s.query ? `<button class="fld__clr" data-a="clearProject">${I('ic-x-16-2.svg', 16, 16)}</button>` : '' })}${s.open === 'proj' ? projPanel() : ''}</div>
      ${p && !pinned ? projectSummaryMini(p) : ''}
      ${p && pinned ? `<div class="callout callout--warn"><b>You already pinned this project</b><span>Ending soon · started 05 Jul 2026 · 4 days left. A project can hold only one pinning at a time — extend the existing one instead.</span></div>` : ''}
    </div>`;
    return modal('Select a project to pin', body, btn(pinned ? 'View &amp; extend existing pinning' : 'Start pinning this project', 'startThis', 'primary', !p), { top: 69, cls: 'modal--select' });
  };

  const requestModal = () => {
    const r = S.req, err = k => r.tried && !r[k];
    const caret = I('ic-caret-down-16.svg', 16, 16);
    const sel = (label, key, opts) => `<div class="dd-wrap" data-dd>${field({ label, req: true, value: r[key], ph: `Select ${label.toLowerCase()}`, trail: caret, a: 'reqOpen', v: key, cls: 'fld--select', err: err(key) ? `${label} is required` : '' })}
      ${r.open === key ? `<div class="opt-panel opt-panel--proj"><div class="opt-list">${opts.map(o => `<button class="opt ${r[key] === o ? 'is-sel' : ''}" data-a="reqPick" data-v="${key}|${o}">${o}</button>`).join('')}</div></div>` : ''}</div>`;
    const body = `<div class="stack16">
      ${field({ label: 'Project name', req: true, bind: 'req.name', value: r.name, ph: 'e.g. Unitech Grande', err: err('name') ? 'Project name is required' : '', attrs: 'data-autofocus' })}
      ${field({ label: 'Developer name (optional)', bind: 'req.dev', value: r.dev, ph: 'e.g. Unitech Group' })}
      ${sel('City', 'city', NP.D.cities.filter(c => !c.locked).map(c => c.name))}
      ${sel('Locality', 'loc', NP.D.localities.filter(c => !c.locked).map(c => c.name))}
      ${field({ label: 'RERA ID (optional)', bind: 'req.rera', value: r.rera, ph: 'e.g. ASDF247376' })}
      ${field({ label: 'Launch date in dd/mm/yyyy format (optional)', bind: 'req.launch', value: r.launch, ph: 'dd/mm/yyyy' })}
      ${field({ label: 'Possession date in dd/mm/yyyy format (optional)', bind: 'req.poss', value: r.poss, ph: 'dd/mm/yyyy' })}
      <p class="note13">Housing verifies new projects within 48 hours. No pinning is used until the project is live — we will notify you to pin it.</p>
    </div>`;
    return modal('Request a missing project', body, btn('Submit project request', 'submitRequest'), { top: 69 });
  };

  const requestSent = () => modal('Project request sent', `<div class="stack12 sent">
      <span class="status-pill">Under verification · ETA 48 hrs</span>
      <b class="sent__t">${e(S.req.sent)}</b>
      <p>You will get an SMS and an in-app alert once the project is live. It will then appear in “Select a project” and in Best opportunities if it qualifies. Nothing has been deducted from your ${NP.left()} pinnings.</p>
    </div>`, btn('Done', 'closeModal'), { top: 69 });

  const statusModal = (title, ok, heading, text, cta, a) => modal(title, `<div class="smod">${I(ok ? 'ic-check-circle-success-48.svg' : 'ic-warning-fill-danger-48.svg', 48, 48)}<div><b>${heading}</b><p>${text}</p></div></div>`, btn(cta, a), { cls: 'modal--status' });
  const thanks = 'Thank you for your interest, your account manager will reach out to you as soon as possible.';

  const kv = rows => `<div class="kv">${rows.map(([k, v]) => `<div><span>${k}</span><b>${e(v)}</b></div>`).join('')}</div>`;
  const hero = (t, p) => `<div class="hero">${I('ic-check-circle-success-48.svg', 48, 48)}<div><b>${t}</b><p>${p}</p></div></div>`;

  const addCfgModal = () => {
    const a = S.addCfg, err = a.tried;
    const pills = (list, cur, act) => `<div class="pills">${list.map(p => `<button class="spill ${cur === p ? 'is-sel' : ''}" data-a="${act}" data-v="${p}">${p}</button>`).join('')}</div>`;
    const c3 = I('ic-caret-down-16-3.svg', 16, 16);
    const body = `<div class="stack16">
      <div class="grp"><label>Property Type${NP.reqStar}</label>${pills(NP.D.propertyTypes, a.type, 'cfgType')}${err && !a.type ? '<div class="fld__help is-err">' + I('ic-warning-circle-danger-16.svg', 16, 16) + '<span>Select a property type</span></div>' : ''}</div>
      <div class="grp"><label>Select BHK${NP.reqStar}</label>${pills(NP.D.bhks, a.bhk, 'cfgBhk')}${err && !a.bhk ? '<div class="fld__help is-err">' + I('ic-warning-circle-danger-16.svg', 16, 16) + '<span>Select BHK</span></div>' : ''}</div>
      ${field({ label: `Built up area${NP.reqStar} ${c3}`, bind: 'addCfg.area', value: a.area, ph: 'Enter area', inputmode: 'numeric', suffix: `<button class="addon addon--dd" data-a="cfgUnit">${a.unit}${c3}</button>`, err: err && !NP.num(a.area) ? 'Enter built up area' : '' })}
      <div class="prow">
        ${field({ label: 'Price (₹)', req: true, bind: 'addCfg.price', value: a.price, ph: '0', inputmode: 'numeric', suffix: `<span class="addon">${NP.num(a.price) ? NP.short(NP.num(a.price)) : '₹0'}</span>`, err: err && !NP.num(a.price) ? 'Enter price' : '' })}
        ${I('ic-arrows-left-right-24.svg', 24, 24, 'class="swap"')}
        ${field({ label: 'Rate as price/sq.ft. (₹)', req: true, bind: 'addCfg.rate', value: a.rate, ph: '0', inputmode: 'numeric', suffix: '<span class="addon">/sq.ft.</span>', err: err && !NP.num(a.rate) ? 'Enter rate' : '' })}
      </div>
      <p class="note13">Housing verifies new configurations before buyers see them. Your pinning goes live for the other selected configurations meanwhile.</p>
    </div>`;
    return modal('Add a missing configuration', body, btn('Add configuration', 'addCfgSubmit'), { w: 620, top: 180, sub: 'Please add the configuration details which you think are missing for this project.', cls: 'modal--sub12' });
  };

  const addCfgThanks = () => {
    const a = S.addCfg, area = NP.num(a.area);
    return modal('Configuration added', `<div class="stack16">${hero(`Thanks — ${a.bhk} · ${NP.inr(area)} sq.ft is added`, 'It’s part of this pinning now, marked “Under review”. Housing checks it against the developer’s price list within 48 hrs; buyers see it once verified. We’ll notify you either way.')}
      ${kv([['Configuration', `${a.bhk} ${a.type} · ${NP.inr(area)} sq.ft`], ['Your price', `${NP.short(NP.num(a.price))} · ₹${a.rate}/sq.ft`], ['Reference', a.ref]])}</div>`, btn('Back to pinning', 'addCfgBack'), { top: 170 });
  };

  const reportModal = () => {
    const r = S.report, row = S.create.rows.find(x => x.id === r.id);
    const cb = (k, label, extra) => `<div class="rgrp"><button class="cb" data-a="reason" data-v="${k}"><span class="cbx16 ${r.reasons[k] ? 'is-on' : ''}">${r.reasons[k] ? I('ic-check-12-brand.svg', 12, 12) : ''}</span>${label}</button>${r.reasons[k] ? extra : ''}</div>`;
    const c3 = I('ic-caret-down-16-3.svg', 16, 16);
    const ta = (bind) => `<div class="fld"><label>Description</label><textarea class="ta" data-bind="${bind}" placeholder="Type here...">${e(NP.S.report[bind.split('.')[1]])}</textarea></div>`;
    const body = `<div class="stack16">
      ${cb('price', 'Price is wrong', `<div class="prow">
        ${field({ label: 'Correct price (₹)', req: true, bind: 'report.price', value: r.price, inputmode: 'numeric', suffix: `<span class="addon">${NP.short(NP.num(r.price))}</span>` })}
        ${I('ic-arrows-left-right-24.svg', 24, 24, 'class="swap"')}
        ${field({ label: 'Rate as price/sq.ft. (₹)', req: true, bind: 'report.rate', value: r.rate, inputmode: 'numeric', suffix: '<span class="addon">/sq.ft.</span>' })}</div>`)}
      ${cb('area', 'Built-up area is wrong', field({ label: `Built up area${NP.reqStar} ${c3}`, bind: 'report.area', value: r.area, inputmode: 'numeric', suffix: `<span class="addon addon--dd">sq.ft.${c3}</span>` }))}
      ${cb('exist', 'This configuration doesn’t exist in the project', ta('report.d1'))}
      ${cb('other', 'Something else', ta('report.d2'))}
      ${r.tried && !Object.values(r.reasons).some(Boolean) ? `<div class="fld__help is-err">${I('ic-warning-circle-danger-16.svg', 16, 16)}<span>Select at least one issue to report</span></div>` : ''}
      <p class="note13">Reports are reviewed by Housing within 72 hrs. Your pinning is not affected.</p>
    </div>`;
    return modal('Report and update the correct information', body, btn('Send report', 'sendReport'), { top: 180, sub: r.short });
  };

  const reportThanks = () => {
    const r = S.report;
    return modal('Issue reported', `<div class="stack16">${hero('Thanks for flagging this', `We’ll verify ${r.short} against the developer’s latest price list within 72 hrs and update it for everyone. Your pinning isn’t affected meanwhile.`)}
      ${kv([['Reported', r.label], ['Suggested', r.suggested], ['Reference', r.ref]])}</div>`, btn('Done', 'reportDone'), { top: 180, sub: r.short });
  };

  /* sub-broker */
  const phoneField = (label, st, { ro } = {}) => {
    const sb = S.sb, filled = !!sb.phone;
    const help = st === 'inTeam' ? '<div class="fld__help info">Already your sub-broker</div>'
      : st === 'verified' ? '<div class="fld__help ok">✓ Verified just now</div>'
        : st === 'linked' ? '' : `<div class="fld__help">We’ll send a 4-digit OTP to this number</div>`;
    return field({
      label, bind: ro ? null : 'sb.phone', value: ro ? NP.phoneFmt(sb.phone) : NP.phoneFmt(sb.phone), ph: '10-digit mobile number', inputmode: 'numeric', type: 'tel',
      lead: `<span class="cc ${filled ? 'is-on' : ''}">+91${I('ic-caret-right-12.svg', 12, 12, 'class="rot90"')}</span><span class="cc-div"></span>`,
      err: st === 'linked' ? 'This number is linked to another Housing account' : '', help, cls: 'fld--phone', attrs: ro ? '' : 'data-autofocus maxlength="11" data-enter="sendOtp"'
    });
  };
  const sbIntro = '<p class="sb-intro">Sub-brokers log in with their own number and manage the pinnings, listings and leads you assign to them.</p>';

  const sbPhone = () => {
    const st = NP.sbPhoneState();
    const body = `<div class="stack24"><span class="eyebrow">STEP 1 OF 3 · VERIFY PHONE</span>${sbIntro}${phoneField('Sub-broker’s mobile number', st)}
      ${st === 'inTeam' ? '<div class="callout callout--info"><b>Rohit Mehra is already in your team</b><span>Added on 14 Aug 2026 · manages 3 pinnings. You don’t need to create him again.</span></div>' : ''}
      ${st === 'linked' ? '<div class="callout callout--err"><b>Can’t add this number</b><span>It belongs to a seller or owner account outside your team. A number can be linked to only one account. Ask them to use another number, or contact support to move it.</span><a data-a="nav">Contact support</a></div>' : ''}
    </div>`;
    return modal('Create a sub-broker', body, btn('Send OTP', 'sendOtp', 'primary', st !== 'ok'), { top: 160 });
  };

  const otpBox = () => {
    const o = NP.digits(S.sb.otp);
    return `<label class="otp">${[0, 1, 2, 3].map(i => `<span class="${o[i] ? 'is-on' : ''} ${i === o.length ? 'is-cur' : ''}">${o[i] || '-'}</span>`).join('')}
      <input data-bind="sb.otp" value="${e(o)}" inputmode="numeric" autocomplete="one-time-code" maxlength="4" data-autofocus data-enter="verifyOtp" aria-label="OTP"></label>`;
  };
  const sbOtp = () => {
    const sb = S.sb, rs = sb.resend;
    const body = `<div class="stack24"><span class="eyebrow">STEP 2 OF 3 · VERIFY OTP</span>
      <div class="sent-to"><span>OTP sent to +91 ${NP.phoneFmt(sb.phone)}</span><a data-a="changeNumber">Change number</a></div>
      ${otpBox()}
      <div class="otp-meta"><span>OTP is valid for 10 minutes</span>${rs > 0 ? `<b>Resend in 00:${String(rs).padStart(2, '0')}</b>` : '<a data-a="resend">Resend OTP</a>'}</div>
      <p class="note13">Ask the person to share the OTP received. Entering it confirms he agrees to join your team as a sub-broker.</p></div>`;
    return modal('Create a sub-broker', body, btn('Verify OTP', 'verifyOtp', 'primary', NP.digits(sb.otp).length !== 4), { top: 160 });
  };

  const sbDetails = () => {
    const sb = S.sb, er = NP.sbErrors();
    const body = `<div class="stack24"><span class="eyebrow">STEP 3 OF 3 · ENTER DETAILS</span>
      ${phoneField('Mobile number', 'verified', { ro: true })}
      ${field({ label: 'Full name', bind: 'sb.name', value: sb.name, ph: 'Enter full name', attrs: 'data-autofocus' })}
      ${field({ label: 'Email', bind: 'sb.email', value: sb.email, ph: 'name@example.com', type: 'email', err: er.email })}
      ${field({ label: 'Set a password', bind: 'sb.pw', value: sb.pw, ph: 'At least 8 characters with 1 number', type: 'password', err: er.pw })}
      <button class="creds" data-a="sendCreds"><span class="cbx18 ${sb.sendCreds ? 'is-on' : ''}">${sb.sendCreds ? '✓' : ''}</span>Send login details by SMS and email</button>
    </div>`;
    return modal('Create a sub-broker', body, btn('Create sub-broker', 'createSbSubmit', 'primary', !NP.sbDetailsValid()), { top: 160 });
  };

  const sbDiscard = () => modal('Discard this sub-broker?', `<p class="discard">The phone number is verified, but the account isn’t created yet.<br><br>If you leave now nothing is saved and you’ll need a fresh OTP next time.</p>`,
    btn('Keep editing', 'keepEditing', 'secondary') + btn('Discard', 'discard', 'danger'), { top: 160 });

  const sbDone = () => {
    const sb = S.sb, c = sb.created;
    return modal('Sub-broker created', `<div class="stack16">${hero(`${e(c.name)} is now your sub-broker`, `Login details are on their way to +91 ${NP.phoneFmt(sb.phone)} and ${e(sb.email)}. He can now manage the pinnings, listings and leads you assign to him.`)}
      ${kv([['Role', 'Sub-broker'], ['Assigned to', `${S.create.project} pinning`], ['Team', `${S.create.team.length} of 5 sub-brokers`]])}</div>`,
      btn('Manage team', 'manageTeam', 'secondary') + btn('Continue to create pinning', 'sbContinue'), { top: 180 });
  };

  const modals = () => {
    switch (S.modal) {
      case 'select': return selectModal();
      case 'request': return requestModal();
      case 'requestSent': return requestSent();
      case 'limit': return statusModal('Limit reached', false, 'New project pinning limit reached', 'You\'ve reached the limit of New project pinning slots included in your package. To add more, please purchase additional slots.', 'Yes, I want more slots', 'moreSlots');
      case 'limitThanks': return statusModal('Limit reached', true, 'Request submitted successfully', thanks, 'Done', 'closeModal');
      case 'expired': return statusModal('Expired', false, 'New project pinning plan is expired', 'Your time duration for new project pinnings as per the package has expired now. To add more, please purchase additional slots.', 'Yes, I want to extend / purchase again', 'extendPlan');
      case 'expiredThanks': return statusModal('Expired', true, 'Request submitted successfully', thanks, 'Done', 'closeModal');
      case 'addCfg': return addCfgModal();
      case 'addCfgThanks': return addCfgThanks();
      case 'report': return reportModal();
      case 'reportThanks': return reportThanks();
      case 'sb-phone': return sbPhone();
      case 'sb-otp': return sbOtp();
      case 'sb-details': return sbDetails();
      case 'sb-discard': return sbDiscard();
      case 'sb-done': return sbDone();
      default: return '';
    }
  };

  return {
    render(state, np) {
      NP = np; S = state; D = np.D;
      return `<div class="dk">${navbar()}<main class="d-main">${S.route === 'create' ? create() : dashboard()}</main>${toastEl()}${modals()}</div>`;
    }
  };
})();
