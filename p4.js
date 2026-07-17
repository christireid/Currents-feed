/* ================= UI (daily.dev × Panda) ================= */
let query='';

const ICONS = {
  spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.7L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.3z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.2l-.6-.6a5.5 5.5 0 1 0-7.8 7.8l.6.6L12 21l7.8-8 .6-.6a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  heartFill:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.2l-.6-.6a5.5 5.5 0 1 0-7.8 7.8l.6.6L12 21l7.8-8 .6-.6a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  bookmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  bookmarkFill:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-2.5"/></svg>',
  mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13.7 3.3 8 8H4v8h4l5.7 4.7V3.3zM22 9l-6 6M16 9l6 6"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>',
  folder:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h0a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h0a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v0a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/></svg>',
};

function getArticle(id){ return articles.get(id) || S.library[id] || null; }
function snapshot(a){ const c={...a}; c.content=(c.content||'').slice(0,60000); delete c._why; delete c._discovery; return c; }
function inAnyCollection(id){ return Object.values(S.collections).some(ids=>ids.includes(id)); }
function sourceName(id){ const s=SOURCES.find(x=>x.id===id); return s?s.name:id; }
function favicon(srcId){
  const s=SOURCES.find(x=>x.id===srcId); if(!s) return null;
  try{ return 'https://www.google.com/s2/favicons?domain='+new URL(s.url).hostname+'&sz=64'; }catch(e){ return null; }
}
function initials(a){ const n=sourceName(a.src); return n.split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
function prettyTag(t){ return (typeof INTEREST_LABELS!=='undefined' && INTEREST_LABELS[t]) || t.replace(/-/g,' '); }
function readTime(a){ const w=stripTags(a.content||a.snippet||'').split(/\s+/).filter(Boolean).length; return Math.max(1, Math.round(w/220)); }
const PH_GRADS = {ai:'linear-gradient(135deg,#4338ca,#7c3aed)', health:'linear-gradient(135deg,#047857,#10b981)', parenting:'linear-gradient(135deg,#b45309,#f59e0b)'};
const CAT_COLOR = {ai:'var(--ai)', health:'var(--health)', parenting:'var(--parenting)'};

/* ---------- navigation ---------- */
// Live count of relevant, non-hidden articles carrying each interest tag.
function interestCounts(){
  const hidden=new Set(S.hidden), disabled=new Set(S.disabled), c={};
  for(const a of articles.values()){
    if(hidden.has(a.id)||disabled.has(a.src)) continue;
    for(const t of (a.tags||[])) c[t]=(c[t]||0)+1;
  }
  return c;
}
function navItems(){
  return {
    feed:[
      {id:'foryou', label:'For You', icon:ICONS.spark},
      {id:'latest', label:'Latest', icon:ICONS.clock},
    ],
    topics:[
      {id:'ai', label:'AI & Tech', dot:CAT_COLOR.ai},
      {id:'health', label:'Health & Wellness', dot:CAT_COLOR.health},
      {id:'parenting', label:'Parenting', dot:CAT_COLOR.parenting},
    ],
    library:[
      {id:'favs', label:'Favorites', icon:ICONS.heart, cnt:S.favs.length},
      ...Object.keys(S.collections).map(n=>({id:'coll:'+n, label:n, icon:ICONS.folder, cnt:S.collections[n].length})),
    ],
  };
}
function isActive(id){
  if(id.startsWith('coll:')) return S.tab==='saved' && S.activeColl===id.slice(5);
  if(id.startsWith('int:'))  return S.tab==='interest' && S.interest===id.slice(4);
  return S.tab===id && !S.interest;
}
function selectTab(id){
  if(id.startsWith('coll:')){ S.tab='saved'; S.activeColl=id.slice(5); S.interest=null; }
  else if(id.startsWith('int:')){ S.tab='interest'; S.interest=id.slice(4); }
  else { S.tab=id; S.interest=null; }
  saveState(); render(); window.scrollTo({top:0});
  // "Latest" always pulls the freshest articles from the live sources.
  if(id==='latest') fetchAll(false);
}
function sitem(t){
  const ic = t.dot ? `<span class="ic"><span class="tdot" style="background:${t.dot}"></span></span>` : `<span class="ic">${t.icon||''}</span>`;
  return `<button class="sitem ${isActive(t.id)?'active':''}" data-nav="${esc(t.id)}">${ic}<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(t.label)}</span>${t.cnt?`<span class="cnt">${t.cnt}</span>`:''}</button>`;
}
// Grouped interest hashtags — Christi's exact 33, the only taxonomy used.
const INTEREST_GROUPS = [
  {cat:'ai',        label:'AI & Building'},
  {cat:'health',    label:'Health & Wellness'},
  {cat:'parenting', label:'Parenting'},
];
function renderSidebar(){
  const n=navItems();
  const counts=interestCounts();
  const ihtml = INTEREST_GROUPS.map(g=>{
    const items=INTERESTS.filter(i=>i.cat===g.cat);
    return `<div class="shead" style="color:${CAT_COLOR[g.cat]}">${esc(g.label)}</div>`+
      items.map(i=>{
        const c=counts[i.id]||0;
        return `<button class="sitem ${isActive('int:'+i.id)?'active':''}" data-nav="int:${esc(i.id)}" ${c?'':'style="opacity:.45"'}>
          <span class="ic"><span class="tdot" style="background:${CAT_COLOR[i.cat]}"></span></span>
          <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(i.label)}</span>
          <span class="cnt">${c}</span></button>`;
      }).join('');
  }).join('');
  $('#sidebar').innerHTML=`
    <div class="slogo"><span class="dot">〜</span><span>Currents<small>your feed</small></span></div>
    <div class="snav">
      ${n.feed.map(sitem).join('')}
      <div class="shead">Browse</div>
      ${n.topics.map(sitem).join('')}
      <div class="shead" style="margin-top:14px">Interests · your 33 hashtags</div>
      ${ihtml}
      <div class="shead">Library</div>
      ${n.library.map(sitem).join('')}
    </div>
    <div class="sfoot">
      <button class="sitem" id="sbSettings"><span class="ic">${ICONS.gear}</span>Sources & settings</button>
    </div>`;
  $$('#sidebar [data-nav]').forEach(b=>b.onclick=()=>selectTab(b.dataset.nav));
  $('#sbSettings').onclick=openSettings;
  // mobile chips: feed + topics + a scrollable run of interests + library
  const iChips = INTERESTS.map(i=>({id:'int:'+i.id, label:i.label, dot:CAT_COLOR[i.cat]}));
  const chips=[...n.feed, ...n.topics, ...iChips, ...n.library];
  $('#tabbar').innerHTML=chips.map(t=>`<button class="tab ${isActive(t.id)?'active':''}" data-nav="${esc(t.id)}">${t.dot?`<span class="tdot" style="background:${t.dot}"></span>`:''}${esc(t.label)}${t.cnt?`<span class="cnt">${t.cnt}</span>`:''}</button>`).join('');
  $$('#tabbar [data-nav]').forEach(b=>b.onclick=()=>selectTab(b.dataset.nav));
}

/* ---------- lists ---------- */
function visibleList(tab){
  const hidden=new Set(S.hidden), disabled=new Set(S.disabled);
  let list;
  const savedView = (tab==='favs'||tab==='saved');
  if(tab==='favs'){ list=S.favs.map(getArticle).filter(Boolean); }
  else if(tab==='saved'){
    const names=Object.keys(S.collections);
    const act=names.includes(S.activeColl)?S.activeColl:names[0];
    S.activeColl=act;
    list=act? S.collections[act].map(getArticle).filter(Boolean) : [];
  } else {
    list=[...articles.values()].filter(a=>!hidden.has(a.id)&&!disabled.has(a.src));
    // STRICT RELEVANCE: only articles matching ≥1 of the 33 interests appear in the feed.
    list=list.filter(isRelevant);
    if(tab==='ai'||tab==='health'||tab==='parenting') list=list.filter(a=>a.cat===tab);
    if(tab==='interest' && S.interest) list=list.filter(a=>(a.tags||[]).includes(S.interest));
  }
  if(query){
    const q=query.toLowerCase();
    list=list.filter(a=>a.title.toLowerCase().includes(q)||(a.snippet||'').toLowerCase().includes(q)||sourceName(a.src).toLowerCase().includes(q)||(a.tags||[]).some(t=>t.includes(q)||prettyTag(t).toLowerCase().includes(q)));
  }
  list.forEach(a=>{a._discovery=false;a._why=null;});
  if(tab==='foryou') return rankForYou(list);
  return list.sort((a,b)=>b.ts-a.ts);
}

/* ---------- card templates ---------- */
/* NOTE: no onerror handlers in card templates — fallbacks are pure CSS layers.
   The placeholder sits UNDER the image; a failed/blocked image reveals it (and a
   broken-image glyph is covered by the img's own gradient background + ::after).
   This keeps real image URLs intact in the pre-rendered static HTML. */
function favIconHTML(a){
  const u=favicon(a.src);
  const fb=`<span class="fav-fb" style="background:${PH_GRADS[a.cat]}">${esc(initials(a)[0]||'?')}</span>`;
  return u? `<span class="favwrap">${fb}<img class="fav-ic" src="${u}" alt="" loading="lazy" style="background:${PH_GRADS[a.cat]}"></span>` : fb;
}
function thumbHTML(a){
  const cat=CATS[a.cat]||CATS.ai;
  const ph=`<div class="ph" style="background:${PH_GRADS[a.cat]}">${esc(initials(a))}<i class="phs">${esc(sourceName(a.src))}</i></div>`;
  const img=a.img? ph+`<img src="${esc(a.img)}" alt="" loading="lazy" style="background:${PH_GRADS[a.cat]}">` : ph;
  const disc=a._discovery?`<span class="discov">✦ discovery</span>`:'';
  return `<div class="thumb">${img}<span class="chip ${cat.cls}">${cat.label}</span>${disc}</div>`;
}
function actsHTML(a, cls){
  const isFav=S.favs.includes(a.id), isSaved=inAnyCollection(a.id);
  return `<div class="${cls}">
    <button class="act ${isFav?'on-fav':''}" data-act="fav" title="Favorite">${isFav?ICONS.heartFill:ICONS.heart}</button>
    <button class="act ${isSaved?'on-save':''}" data-act="save" title="Save to collection">${isSaved?ICONS.bookmarkFill:ICONS.bookmark}</button>
    <button class="act right" data-act="share" title="Share with friends">${ICONS.share}</button>
  </div>`;
}
function shareArticle(a){
  signal(a,'ext');   // sharing is a strong positive signal
  if(navigator.share){ navigator.share({title:a.title, url:a.link}).catch(()=>{}); }
  else copyLink(a);
}
function tagsHTML(a){
  const tags=(a.tags||[]).slice(0,3);
  return `<div class="ctags">${tags.map(t=>`<button class="tag" data-tag="${esc(t)}">${esc(prettyTag(t))}</button>`).join('')}</div>`;
}
function cardHTML(a, list){
  const why=(S.tab==='foryou'&&a._why)?`<div class="creason">✦ because you engage with ${esc(prettyTag(a._why))}</div>`:'';
  const meta=`<div class="cmeta">${timeAgo(a.ts)} · ${readTime(a)}m read</div>`;
  const head=`<div class="chead">${favIconHTML(a)}<span class="srcnm">${esc(sourceName(a.src))}</span>
    <button class="hidebtn" data-act="menu" title="Options">${ICONS.dots}</button></div>`;
  // Title is a real link: if scripts can't run in this viewer, tapping still opens the article.
  // With scripts running, the inline onclick suppresses navigation and the in-app reader opens instead.
  // Title is a REAL link — clicking it always opens the article in a new tab.
  const title=`<h3 class="ctitle"><a class="tlink" href="${esc(a.link)}" target="_blank" rel="noopener">${esc(a.title)}</a></h3>`;
  // One DOM for both grid and list — the list layout is applied purely in CSS
  // (grid-template-areas keyed off the #vwList radio), so it works without JS.
  return `<article class="card" data-id="${a.id}">
    ${head}
    ${title}
    ${tagsHTML(a)}
    ${meta}${why}
    ${miniBriefHTML(a)}
    ${thumbHTML(a)}
    ${actsHTML(a,'cacts')}
  </article>`;
}
/* Why each article was chosen — maps its interest tags (the 33 hashtags) back to Christi. */
const CAT_WHY = {ai:'the AI world you track', health:'your health & wellness pillar', parenting:'your parenting pillar'};
function whyChosen(a){
  const reasons=[...new Set((a.tags||[]).map(t=>prettyTag(t)).filter(Boolean))].slice(0,2);
  const base = reasons.length
    ? `Matches your interests: <b>${reasons.join('</b>, <b>')}</b>`
    : `From ${esc(CAT_WHY[a.cat]||'your feed')}`;
  // live layer: learned-profile match, when the algorithm knows her
  if(typeof S!=='undefined' && personalized()){
    const hot=(a.tags||[]).map(t=>[t,S.profile.tags[t]||0]).filter(([,w])=>w>2).sort((x,y)=>y[1]-x[1]);
    if(hot.length) return base+` — and your activity shows <b>${prettyTag(hot[0][0])}</b> is one of your strongest interests right now.`;
  }
  return base+`.`;
}
/* Inline expandable AI brief on the card itself — a native <details> element,
   so it opens on tap even in viewers that block ALL scripts. */
function miniBriefHTML(a){
  const b=a.brief;
  if(!b && !a.snippet) return '';
  const tl=b?b.tl:a.snippet;
  const kp=b?(b.kp||[]):[];
  return `<details class="cbrief"><summary>✨ AI brief &amp; why it's for you</summary><div class="cbx">
    <span class="bmeta">≈ ${readTime(a)} min read · ${esc(sourceName(a.src))}</span>
    ${b&&b.wm?`<p class="bwm"><b>💡 What's in it for me?</b> ${esc(b.wm)}</p>`:''}
    <p class="btl"><b>⚡ TL;DR</b> — ${esc(tl)}</p>
    ${kp.length?`<ul>${kp.map(k=>`<li>${esc(k)}</li>`).join('')}</ul>`:''}
    <p class="bwhy">🎯 ${whyChosen(a)}</p>
    ${b&&b.act?`<p class="bact"><b>✅ Do this:</b> ${esc(b.act)}</p>`:''}
    <a class="bsrc" href="${esc(a.link)}" target="_blank" rel="noopener">Read the original ↗</a>
  </div></details>`;
}
function ccardHTML(a){
  const u=favicon(a.src);
  const thumb=`<span class="cc-thumbwrap"><span class="cc-ph" style="background:${PH_GRADS[a.cat]}">${esc(initials(a))}</span>${a.img?`<img class="cc-thumb" src="${esc(a.img)}" alt="" loading="lazy" style="background:${PH_GRADS[a.cat]}">`:''}</span>`;
  return `<div class="ccard" data-id="${a.id}">
    <div class="cc-main">
      <div class="cc-src">${u?`<img src="${u}" alt="" style="background:${PH_GRADS[a.cat]}">`:''}${esc(sourceName(a.src))}${a._discovery?' · <span style="color:var(--accent2)">✦</span>':''}</div>
      <div class="cc-title">${esc(a.title)}</div>
      <div class="cc-meta">${timeAgo(a.ts)} · ${readTime(a)}m</div>
      ${actsHTML(a,'cc-acts')}
    </div>
    ${thumb}
  </div>`;
}

/* ---------- render ---------- */
function renderMeta(done, total){
  const disabled=new Set(S.disabled), hidden=new Set(S.hidden);
  let n=0; for(const a of articles.values()){ if(!hidden.has(a.id)&&!disabled.has(a.src)&&isRelevant(a)) n++; }
  const upd=NET_BLOCKED?('snapshot from '+new Date(SNAPSHOT_TS).toLocaleDateString(undefined,{month:'short',day:'numeric'})):(S.lastRefresh?('updated '+timeAgo(S.lastRefresh)):'updating…');
  const prog=(done!=null&&done<total)?` · loading feeds ${done}/${total}…`:'';
  const mode=(S.view==='columns'||S.tab==='foryou')?(personalized()?' · ✦ personalized':' · chronological (learning)'):'';
  const filt=(S.tab==='interest'&&S.interest)?`<button id="clearInt" style="display:inline-flex;align-items:center;gap:6px;background:var(--grad);color:#fff;border-radius:99px;padding:3px 10px;font-size:12px;font-weight:700;cursor:pointer">${esc(prettyTag(S.interest))} <span style="opacity:.85">✕</span></button>`:'';
  $('#feedmeta').innerHTML=`<span class="live"${NET_BLOCKED?' style="background:var(--warn,#fbbf24);box-shadow:0 0 8px #fbbf24"':''}></span> ${SOURCES.length-S.disabled.length} sources · ${n} articles · ${upd}${prog}${esc(mode)}${filt}`;
  const ci=$('#clearInt'); if(ci) ci.onclick=()=>selectTab('foryou');
}
function wireCards(scope){
  $$(scope+' [data-tag]').forEach(b=>b.onclick=e=>{e.stopPropagation();$('#search').value='';query='';selectTab('int:'+b.dataset.tag);});
  $$(scope+' [data-id]').forEach(el=>{
    const a=getArticle(el.dataset.id); if(!a) return;
    const isCard=el.classList.contains('card');
    // Card click EXPANDS the card in place (AI brief + relevance + read time).
    // Compact board cards keep the reader modal (no room to expand).
    el.onclick=()=>{
      if(isCard){
        const d=el.querySelector('.cbrief');
        if(d) d.open=!d.open; else openReader(a);
      } else openReader(a);
    };
    el.querySelectorAll('.tlink').forEach(t=>t.onclick=e=>{ e.stopPropagation(); signal(a,'ext'); }); // let the link open naturally
    el.querySelectorAll('.cbrief').forEach(d=>{
      d.onclick=e=>{ if(e.target.closest('summary')||e.target.closest('a')) e.stopPropagation(); };
      d.ontoggle=()=>{ if(d.open) signal(a,'open',0.5); };     // reading the brief is an engagement signal
    });
    el.querySelectorAll('[data-act]').forEach(btn=>{
      btn.onclick=e=>{
        e.stopPropagation();
        const act=btn.dataset.act;
        if(act==='fav') toggleFav(a);
        else if(act==='save') openCollPop(a,btn);
        else if(act==='hide') hideArticle(a, isCard?el:null);
        else if(act==='menu') openCardMenu(a, btn, isCard?el:null);
        else if(act==='share') shareArticle(a);
        else if(act==='ext'){ signal(a,'ext'); window.open(a.link,'_blank','noopener'); }
      };
    });
  });
}
function render(){
  renderSidebar();
  renderMeta();
  // topbar badges (favorites / collections counts)
  const fb=$('#favBdg'), sb=$('#savBdg');
  const savedCnt=Object.values(S.collections).reduce((n,ids)=>n+ids.length,0);
  if(fb){ fb.textContent=S.favs.length; fb.classList.toggle('show',S.favs.length>0); }
  if(sb){ sb.textContent=savedCnt; sb.classList.toggle('show',savedCnt>0); }
  $('#netbar').style.display = NET_BLOCKED ? 'block' : 'none';
  const lb=$('#learnbar');
  if(!personalized() && (S.tab==='foryou'||S.view==='columns')){
    lb.style.display='block';
    $('#learnFill').style.width=Math.min(100,S.profile.interactions/COLD_START*100)+'%';
    $('#learnCount').textContent=`${S.profile.interactions}/${COLD_START} signals`;
  } else lb.style.display='none';
  if(S.view==='columns'){ renderBoard(); return; }
  const feed=$('#feed');
  feed.className='grid';
  const list=visibleList(S.tab);
  if(articles.size===0&&fetching){
    feed.innerHTML=Array.from({length:9},()=>`<div class="skel"><div class="b"><i></i><i></i></div><div class="a"></div></div>`).join('');
    return;
  }
  if(list.length===0){
    const msgs={favs:['♥','No favorites yet','Tap the heart on any article you love.'],
                saved:['🔖','No collections yet','Save articles into named collections — recipes, workouts, AI tools…'],
                interest:['🏷️',`No “${S.interest?prettyTag(S.interest):''}” articles right now`,'Hit refresh for the latest — new matches appear here as sources update.'],
                foryou:['✦','Nothing here yet','Hit refresh or check your source settings.']};
    const m=msgs[S.tab]||['📭','No articles','Try refreshing, or broaden your search.'];
    feed.innerHTML=`<div class="empty" style="grid-column:1/-1"><div class="big">${m[0]}</div><h3>${esc(m[1])}</h3><p>${m[2]}</p></div>`;
  } else {
    feed.innerHTML=list.slice(0,120).map(a=>cardHTML(a)).join('');
  }
  wireCards('#feed');
}
function renderBoard(){
  const feed=$('#feed');
  feed.className='board';
  const cols=[
    {tab:'foryou', label:'✦ For You', dot:null},
    {tab:'ai', label:'AI & Tech', dot:CAT_COLOR.ai},
    {tab:'health', label:'Health & Wellness', dot:CAT_COLOR.health},
    {tab:'parenting', label:'Parenting', dot:CAT_COLOR.parenting},
  ];
  feed.innerHTML=cols.map(c=>{
    const list=visibleList(c.tab).slice(0,45);
    return `<div class="col">
      <div class="colhead">${c.dot?`<span class="tdot" style="background:${c.dot}"></span>`:'<span style="color:var(--accent2)">✦</span>'}${c.label}<span class="cnt">${list.length}</span></div>
      <div class="colbody">${list.length?list.map(ccardHTML).join(''):'<div class="empty" style="padding:30px 10px"><div class="big">📭</div><p>Nothing yet</p></div>'}</div>
    </div>`;
  }).join('');
  wireCards('#feed');
}

/* ---------- actions ---------- */
function toggleFav(a){
  const i=S.favs.indexOf(a.id);
  if(i>-1){ S.favs.splice(i,1); signal(a,'unfav'); if(!inAnyCollection(a.id)) delete S.library[a.id]; toast('Removed from favorites'); }
  else { S.favs.unshift(a.id); S.library[a.id]=snapshot(a); signal(a,'fav'); toast('♥ Favorited — more like this coming'); }
  saveState(); render();
  if($('#readerOverlay').classList.contains('open')&&currentArticle&&currentArticle.id===a.id) paintReaderActs(a);
}
function hideArticle(a, el){
  S.hidden.unshift(a.id); if(S.hidden.length>800) S.hidden.length=800;
  signal(a,'hide'); saveState();
  if(el){ el.classList.add('removing'); setTimeout(render,260); } else render();
  toast('Hidden — showing less like this', ()=>{
    S.hidden=S.hidden.filter(x=>x!==a.id); signal(a,'unhide'); saveState(); render();
  });
}
function saveToColl(a, name){
  if(!S.collections[name]) S.collections[name]=[];
  const ids=S.collections[name];
  const i=ids.indexOf(a.id);
  if(i>-1){ ids.splice(i,1); signal(a,'unsave'); if(ids.length===0){ delete S.collections[name]; if(S.activeColl===name) S.activeColl=Object.keys(S.collections)[0]; }
    if(!S.favs.includes(a.id)&&!inAnyCollection(a.id)) delete S.library[a.id];
    toast(`Removed from “${name}”`);
  } else { ids.unshift(a.id); S.library[a.id]=snapshot(a); signal(a,'save'); toast(`🔖 Saved to “${name}”`); }
  saveState(); render();
  if($('#readerOverlay').classList.contains('open')&&currentArticle&&currentArticle.id===a.id) paintReaderActs(a);
}

/* ---------- card options menu (daily.dev style ⋯) ---------- */
function positionPop(pop, anchor){
  const r=anchor.getBoundingClientRect();
  pop.classList.add('open');
  const pw=pop.offsetWidth||240, ph=pop.offsetHeight||200;
  pop.style.left=Math.max(8, Math.min(window.innerWidth-pw-8, r.right-pw))+'px';
  pop.style.top =(r.bottom+ph>window.innerHeight-10 ? Math.max(8,r.top-ph-6) : r.bottom+6)+'px';
  setTimeout(()=>document.addEventListener('click', closePop, {once:true}),0);
}
function copyLink(a){
  const done=()=>toast('🔗 Link copied');
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(a.link).then(done).catch(()=>fallbackCopy(a.link,done)); }
  else fallbackCopy(a.link,done);
}
function fallbackCopy(text,done){
  const ta=document.createElement('textarea'); ta.value=text; ta.style.cssText='position:fixed;opacity:0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); done(); }catch(e){ toast('Copy failed — long-press the link in the reader instead'); }
  ta.remove();
}
function muteSource(a){
  if(!S.disabled.includes(a.src)) S.disabled.push(a.src);
  signal(a,'hide',0.6);      // muting a source is a strong negative signal
  saveState(); render();
  toast(`🔕 Muted ${sourceName(a.src)}`, ()=>{ S.disabled=S.disabled.filter(x=>x!==a.src); saveState(); render(); });
}
function openCardMenu(a, anchor, cardEl){
  const pop=$('#collPop');
  pop.innerHTML=`
    <button class="item" data-m="reader">${ICONS.book} Reader view</button>
    <button class="item" data-m="hide">${ICONS.x} Hide this article</button>
    <button class="item" data-m="mute">${ICONS.mute} Show less from ${esc(sourceName(a.src))}</button>
    <button class="item" data-m="copy">${ICONS.copy} Copy link</button>
    <button class="item" data-m="open">${ICONS.ext} Open original</button>`;
  pop.querySelectorAll('.item').forEach(b=>b.onclick=e=>{
    e.stopPropagation(); closePop();
    const m=b.dataset.m;
    if(m==='reader') openReader(a);
    else if(m==='hide') hideArticle(a, cardEl);
    else if(m==='mute') muteSource(a);
    else if(m==='copy') copyLink(a);
    else if(m==='open'){ signal(a,'ext'); window.open(a.link,'_blank','noopener'); }
  });
  pop.onclick=e=>e.stopPropagation();
  positionPop(pop, anchor);
}

/* ---------- collections popover ---------- */
function openCollPop(a, anchor){
  const pop=$('#collPop');
  const names=Object.keys(S.collections);
  pop.innerHTML=`<h5>Save to collection</h5>
    ${names.map(n=>{const on=S.collections[n].includes(a.id);
      return `<button class="item ${on?'checked':''}" data-n="${esc(n)}">${on?'✓':ICONS.bookmark} ${esc(n)}</button>`;}).join('')}
    <input id="newColl" placeholder="＋ New collection… (Enter)">`;
  pop.querySelectorAll('.item').forEach(b=>b.onclick=e=>{e.stopPropagation();saveToColl(a,b.dataset.n);closePop();});
  pop.querySelector('#newColl').onkeydown=e=>{
    e.stopPropagation();
    if(e.key==='Enter'){ const v=e.target.value.trim(); if(v){ saveToColl(a,v); closePop(); } }
  };
  pop.onclick=e=>e.stopPropagation();
  pop.classList.add('open');
  const r=anchor.getBoundingClientRect();
  const pw=245, ph=Math.min(320, 92+names.length*38);
  pop.style.left=Math.max(8, Math.min(window.innerWidth-pw-8, r.left-40))+'px';
  pop.style.top =(r.bottom+ph>window.innerHeight-10 ? r.top-ph-6 : r.bottom+6)+'px';
  setTimeout(()=>document.addEventListener('click', closePop, {once:true}),0);
}
function closePop(){ $('#collPop').classList.remove('open'); }

/* ---------- reader ---------- */
let currentArticle=null, readerT0=0;
function sanitizeHtml(html){
  const doc=new DOMParser().parseFromString(html||'','text/html');
  doc.querySelectorAll('script,style,iframe,object,embed,form,noscript,link,meta,svg').forEach(n=>n.remove());
  doc.querySelectorAll('*').forEach(el=>{
    [...el.attributes].forEach(at=>{
      const n=at.name.toLowerCase();
      if(n.startsWith('on')||(n==='href'&&/^\s*javascript:/i.test(at.value))||n==='srcset'||(n==='style'&&/position\s*:\s*fixed/i.test(at.value))) el.removeAttribute(at.name);
    });
    if(el.tagName==='A'){ el.setAttribute('target','_blank'); el.setAttribute('rel','noopener'); }
    if(el.tagName==='IMG'){ el.setAttribute('loading','lazy');
      const src=el.getAttribute('src')||'';
      if(!/^https?:/i.test(src)) el.remove(); else el.setAttribute('src', src.replace(/^http:\/\//i,'https://'));
    }
  });
  return doc.body.innerHTML;
}
function paintReaderActs(a){
  const isFav=S.favs.includes(a.id), isSaved=inAnyCollection(a.id);
  const el=$('#readerActs'); if(!el) return;
  el.innerHTML=`
    <a class="pill primary" id="rExt" href="${esc(a.link)}" target="_blank" rel="noopener">${ICONS.ext} Read original</a>
    <button class="pill ${isFav?'on-fav':''}" id="rFav">${isFav?ICONS.heartFill:ICONS.heart} ${isFav?'Favorited':'Favorite'}</button>
    <button class="pill ${isSaved?'on-save':''}" id="rSave">${isSaved?ICONS.bookmarkFill:ICONS.bookmark} ${isSaved?'Saved':'Save'}</button>
    <button class="pill" id="rHide">${ICONS.x} Hide</button>`;
  $('#rExt').onclick=()=>signal(a,'ext');
  $('#rFav').onclick=()=>toggleFav(a);
  $('#rSave').onclick=e=>openCollPop(a, e.currentTarget);
  $('#rHide').onclick=()=>{ closeReader(); hideArticle(a); };
}
/* --- Blinkist-style brief builders --- */
function sentencesOf(text){
  return (text||'').replace(/\s+/g,' ').split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
    .map(s=>s.trim()).filter(s=>s.length>35 && s.length<300);
}
function extractHighlights(a, n){
  const sents=sentencesOf(stripTags(a.content||''));
  if(!sents.length) return [];
  const kw=new Set([...(a.tags||[]),...keywords(a.title)]);
  return sents.map((s,i)=>{
    let sc = Math.max(0, 3-i*0.25);                                  // earlier = better
    if(/\d/.test(s)) sc+=1;                                          // numbers = concrete
    if(/\b(should|how to|key|important|means|because|instead)\b/i.test(s)) sc+=1;
    const low=s.toLowerCase(); kw.forEach(k=>{ if(low.includes(k)) sc+=0.5; });
    return {s, sc, i};
  }).sort((x,y)=>y.sc-x.sc).slice(0,n).sort((x,y)=>x.i-y.i).map(x=>x.s);
}
function relevanceOf(a){
  const p=S.profile;
  const matched=(a.tags||[]).map(t=>[t,p.tags[t]||0]).filter(([,w])=>w>0.4).sort((x,y)=>y[1]-x[1]);
  const srcW=p.sources[a.src]||0;
  const pillar={ai:'AI & Tech',health:'Health & Wellness',parenting:'Parenting'}[a.cat];
  let line;
  if(!personalized()){
    line=`This sits in your <b>${pillar}</b> pillar. I'm still learning your taste (${p.interactions}/${COLD_START} signals) — favorite, save, or hide to sharpen this section.`;
  } else if(matched.length){
    const names=matched.slice(0,4).map(([t])=>'#'+prettyTag(t)).join(', ');
    const strength=interestOf(a).score>0.7?'a strong match for':'aligned with';
    line=`It's ${strength} interests you've shown: <b>${esc(names)}</b>${srcW>2?` — and ${esc(sourceName(a.src))} is a source you keep coming back to`:''}.`;
  } else {
    line=`Outside your usual patterns — surfaced from your <b>${pillar}</b> pillar so your feed doesn't become an echo chamber. Hide it and I'll show fewer like it.`;
  }
  const chips=(a.tags||[]).slice(0,5).map(t=>`<button class="tag" data-tag="${esc(t)}">#${esc(prettyTag(t))}</button>`).join('');
  return {line, chips};
}
function briefHTML(a){
  const b=a.brief;
  const tl = b?b.tl : (sentencesOf(stripTags(a.content||'')).slice(0,2).join(' ') || a.snippet || '');
  const kp = b?(b.kp||[]) : extractHighlights(a,3);
  const rel=relevanceOf(a);
  const label = b
    ? `✨ AI brief — written by Claude for this article`
    : (a.content? `⚡ Highlights auto-extracted from the article text` : `⚡ Quick brief from the feed summary — open the original for the full story`);
  return `
    <div class="blabel">${label}</div>
    ${b&&b.wm?`<div class="bsec wm"><h4>💡 What's in it for me?</h4><p>${esc(b.wm)}</p></div>`:''}
    ${tl?`<div class="bsec"><h4>⚡ TL;DR</h4><p>${esc(tl)}</p></div>`:''}
    ${kp.length?`<div class="bsec"><h4>🔑 Key ideas</h4><ul>${kp.map(k=>`<li>${esc(k)}</li>`).join('')}</ul></div>`:''}
    <div class="bsec rel"><h4>🎯 Why it's relevant to you</h4><p>${rel.line}</p><p style="margin-top:8px">${whyChosen(a)}</p><div class="reltags">${rel.chips}</div></div>
    ${b&&b.act?`<div class="bsec actn"><h4>✅ Actionable advice</h4><p>${esc(b.act)}</p></div>`:''}`;
}
function openReader(a){
  currentArticle=a; readerT0=Date.now();
  signal(a,'open');
  if(!S.read[a.id]) S.read[a.id]={};
  S.read[a.id].opened=Date.now(); saveState();
  const cat=CATS[a.cat];
  const body=a.content?sanitizeHtml(a.content):'';
  const why=a._why?`<div class="rwhy">✦ In your For You feed because you engage with ${esc(prettyTag(a._why))}</div>`:'';
  $('#reader').innerHTML=`
    <button class="rclose" id="rClose">${ICONS.x}</button>
    ${a.img?`<img class="rhero" src="${esc(a.img)}" alt="" onerror="this.remove()">`:''}
    <div class="rbody">
      <div class="rmeta"><span class="chip ${cat.cls}" style="position:static">${cat.label}</span>
        <b style="color:var(--txt2)">${esc(sourceName(a.src))}</b>
        ${a.author?`<span>· ${esc(a.author)}</span>`:''}
        <span>· ${timeAgo(a.ts)}</span>${a.content?`<span>· ${readTime(a)}m read</span>`:''}</div>
      <h1 class="rtitle">${esc(a.title)}</h1>
      ${why}
      <div class="racts" id="readerActs"></div>
      ${briefHTML(a)}
      ${body?`<details class="fulltext"><summary>Read the full text preview</summary><div class="rcontent">${body}</div></details>`:''}
      <div class="rfoot">Reading time counts toward your personalization. Source: <a href="${esc(a.link)}" target="_blank" rel="noopener" style="color:var(--accent2)">${esc(a.link)}</a></div>
    </div>`;
  $$('#reader .tag').forEach(t=>t.onclick=e=>{e.stopPropagation();closeReader();$('#search').value=t.dataset.tag;query=t.dataset.tag;render();});
  paintReaderActs(a);
  $('#rClose').onclick=closeReader;
  const ov=$('#readerOverlay');
  ov.classList.add('open'); document.body.style.overflow='hidden';
  ov.scrollTop=0;
  ov.onclick=e=>{ if(e.target===ov) closeReader(); };
}
function closeReader(){
  if(currentArticle && readerT0){
    const dwell=(Date.now()-readerT0)/1000;
    const chunks=Math.min(6, Math.floor(dwell/20));
    if(chunks>0){ signal(currentArticle,'dwell',chunks); toastOnce('dwell','📖 Noted — you spent time on this. Feed adjusting.'); }
  }
  currentArticle=null; readerT0=0;
  $('#readerOverlay').classList.remove('open'); document.body.style.overflow='';
  render();
}

/* ---------- settings ---------- */
function openSettings(){
  const m=$('#settingsModal');
  const groups=['ai','health','parenting'];
  const ints=topInterests(10);
  const maxW=Math.max(1,...ints.map(([,w])=>Math.abs(w)));
  m.innerHTML=`
    <h2>⚙️ Sources & personalization</h2>
    <div class="sub">${SOURCES.length} curated sources · profile built from ${S.profile.interactions} interactions</div>
    ${!PERSISTENT?`<div class="msec"><div class="note">⚠️ <b>Heads up:</b> this preview can't store data between sessions. Download the file and open it in your browser — favorites, collections, and your learned taste will then persist automatically.</div></div>`:''}
    <div class="msec"><h4>Your top interests (learned)</h4>
      ${ints.length? ints.map(([t,w])=>`<div class="bar"><span class="lbl">${esc(prettyTag(t))}</span><span class="tr"><i style="width:${Math.abs(w)/maxW*100}%;background:${w>=0?'var(--grad)':'var(--danger)'}"></i></span><span class="val">${w>0?'+':''}${w.toFixed(1)}</span></div>`).join('')
      : '<div class="note">Interact with the feed and your taste profile will appear here.</div>'}
    </div>
    <div class="msec"><h4>Sources</h4>
      ${groups.map(g=>`<div style="margin-bottom:10px"><div style="font-size:12.5px;font-weight:700;color:${CAT_COLOR[g]};margin:10px 0 2px">${CATS[g].label}</div>
        ${SOURCES.filter(s=>s.cat===g).map(s=>{
          const h=feedHealth[s.id]; const on=!S.disabled.includes(s.id);
          return `<div class="srcrow">
            <span class="hdot ${h?(h.ok?'ok':'err'):''}" title="${h?(h.ok?h.count+' articles':'fetch failed'):'not fetched yet'}"></span>
            <span class="nm">${esc(s.name)}</span>
            <span class="ct">${h&&h.ok?h.count+' items':(h?'unreachable':'')}</span>
            <button class="sw ${on?'on':''}" data-src="${s.id}"><i></i></button>
          </div>`;}).join('')}</div>`).join('')}
    </div>
    <div class="msec"><h4>Your data</h4>
      <div class="btnrow">
        <button class="mbtn" id="expBtn">⬇ Export data</button>
        <button class="mbtn" id="impBtn">⬆ Import data</button>
        <button class="mbtn red" id="rstProf">Reset personalization</button>
        <button class="mbtn red" id="rstAll">Reset everything</button>
      </div>
      <input type="file" id="impFile" accept=".json" style="display:none">
    </div>
    <div class="btnrow"><button class="mbtn" id="closeSet" style="margin-left:auto">Done</button></div>`;
  m.querySelectorAll('.sw').forEach(sw=>sw.onclick=()=>{
    const id=sw.dataset.src;
    if(S.disabled.includes(id)) S.disabled=S.disabled.filter(x=>x!==id); else S.disabled.push(id);
    sw.classList.toggle('on'); saveState(); render();
  });
  $('#expBtn').onclick=()=>{
    const blob=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='currents-data.json'; a.click();
  };
  $('#impBtn').onclick=()=>$('#impFile').click();
  $('#impFile').onchange=e=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=()=>{ try{ S=Object.assign(DEFAULT_STATE(), JSON.parse(r.result)); saveState(); hydrateCache(); closeSettings(); render(); toast('Data imported ✓'); }catch(err){ toast('Import failed — invalid file'); } };
    r.readAsText(f);
  };
  $('#rstProf').onclick=()=>{ if(confirm('Reset your learned taste profile? Favorites and collections are kept.')){ S.profile={tags:Object.assign({},SEED_TAGS),sources:{},words:{},interactions:0}; saveState(); openSettings(); render(); } };
  $('#rstAll').onclick=()=>{ if(confirm('Reset everything — favorites, collections, hidden items, and personalization?')){ S=DEFAULT_STATE(); saveState(); closeSettings(); render(); } };
  $('#closeSet').onclick=closeSettings;
  const ov=$('#settingsOverlay');
  ov.classList.add('open'); document.body.style.overflow='hidden';
  ov.onclick=e=>{ if(e.target===ov) closeSettings(); };
}
function closeSettings(){ $('#settingsOverlay').classList.remove('open'); document.body.style.overflow=''; }

/* ---------- toasts ---------- */
const toastShown=new Set();
function toastOnce(key,msg){ if(toastShown.has(key))return; toastShown.add(key); toast(msg); }
function toast(msg, undo){
  const t=document.createElement('div'); t.className='toast';
  t.innerHTML=`<span>${msg}</span>${undo?'<button>Undo</button>':''}`;
  if(undo) t.querySelector('button').onclick=()=>{ undo(); t.remove(); };
  $('#toasts').appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),350); }, undo?5000:2600);
}

/* ---------- search with live autosuggest ---------- */
function buildSuggestions(q){
  const ql=q.toLowerCase();
  const mark=s=>esc(s).replace(new RegExp('('+ql.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<span class="k">$1</span>');
  // tags with frequency
  const tagFreq={};
  articles.forEach(a=>(a.tags||[]).forEach(t=>{ if(t.includes(ql)) tagFreq[t]=(tagFreq[t]||0)+1; }));
  const tags=Object.entries(tagFreq).sort((x,y)=>y[1]-x[1]).slice(0,4);
  const srcs=SOURCES.filter(s=>s.name.toLowerCase().includes(ql)).slice(0,3);
  const arts=[...articles.values()].filter(a=>a.title.toLowerCase().includes(ql)).sort((a,b)=>b.ts-a.ts).slice(0,5);
  let html='';
  if(tags.length) html+=`<h6>Topics</h6>`+tags.map(([t,n])=>`<button class="sit" data-sg-tag="${esc(t)}">#${mark(prettyTag(t))}<span class="muted">${n} articles</span></button>`).join('');
  if(srcs.length) html+=`<h6>Sources</h6>`+srcs.map(s=>`<button class="sit" data-sg-src="${esc(s.name)}">${mark(s.name)}<span class="muted">${CATS[s.cat].label}</span></button>`).join('');
  if(arts.length) html+=`<h6>Articles</h6>`+arts.map(a=>`<button class="sit" data-sg-art="${a.id}">${mark(a.title.length>64?a.title.slice(0,64)+'…':a.title)}<span class="muted">${timeAgo(a.ts)}</span></button>`).join('');
  return html;
}
function initSearch(){
  const inp=$('#search'), sg=$('#sugg');
  let st;
  const apply=v=>{ query=v.trim(); render(); };
  const showSugg=()=>{
    const q=inp.value.trim();
    if(q.length<2){ sg.classList.remove('open'); return; }
    const html=buildSuggestions(q);
    if(!html){ sg.classList.remove('open'); return; }
    sg.innerHTML=html; sg.classList.add('open');
    sg.querySelectorAll('[data-sg-tag]').forEach(b=>b.onmousedown=e=>{e.preventDefault();inp.value=b.dataset.sgTag;apply(b.dataset.sgTag);sg.classList.remove('open');});
    sg.querySelectorAll('[data-sg-src]').forEach(b=>b.onmousedown=e=>{e.preventDefault();inp.value=b.dataset.sgSrc;apply(b.dataset.sgSrc);sg.classList.remove('open');});
    sg.querySelectorAll('[data-sg-art]').forEach(b=>b.onmousedown=e=>{e.preventDefault();sg.classList.remove('open');const a=getArticle(b.dataset.sgArt);if(a)openReader(a);});
  };
  inp.oninput=()=>{ clearTimeout(st); st=setTimeout(()=>{ apply(inp.value); showSugg(); },90); };  // filters immediately as you type
  inp.onfocus=showSugg;
  inp.onblur=()=>setTimeout(()=>sg.classList.remove('open'),150);
  inp.onkeydown=e=>{ if(e.key==='Escape'){ sg.classList.remove('open'); } if(e.key==='Enter'){ sg.classList.remove('open'); apply(inp.value); } };
}

/* ---------- pull-to-refresh (mobile) ---------- */
function initPullToRefresh(){
  const ind=document.createElement('div');
  ind.id='ptr';
  ind.style.cssText='position:fixed;top:0;left:50%;transform:translate(-50%,-64px);z-index:200;display:flex;align-items:center;gap:8px;padding:8px 15px;border-radius:99px;background:var(--card2,#161a22);border:1px solid var(--line2,#2a2f3a);color:var(--txt2,#cbd5e1);font-size:13px;font-weight:700;box-shadow:0 10px 28px rgba(0,0,0,.45);transition:transform .18s ease,opacity .18s;opacity:0;pointer-events:none';
  ind.innerHTML='<svg id="ptrSvg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" style="transition:transform .15s"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/></svg><span id="ptrTxt">Pull to refresh</span>';
  document.body.appendChild(ind);
  const svg=()=>ind.querySelector('#ptrSvg'), txt=()=>ind.querySelector('#ptrTxt');
  const THRESH=72; let startY=0, pulling=false, dist=0, busy=false;
  const atTop=()=>(window.scrollY||document.documentElement.scrollTop||0)<=0;
  const show=(d,ready)=>{
    const y=Math.min(d*0.5,84)-64;
    ind.style.opacity=Math.min(1,d/THRESH);
    ind.style.transform=`translate(-50%,${y}px)`;
    svg().style.animation=''; svg().style.transform=`rotate(${Math.min(180,d/THRESH*180)}deg)`;
    txt().textContent=ready?'Release to refresh':'Pull to refresh';
  };
  const hide=()=>{ ind.style.opacity=0; ind.style.transform='translate(-50%,-64px)'; };
  window.addEventListener('touchstart',e=>{
    if(!busy && atTop() && !fetching){ startY=e.touches[0].clientY; pulling=true; dist=0; }
    else pulling=false;
  },{passive:true});
  window.addEventListener('touchmove',e=>{
    if(!pulling) return;
    dist=e.touches[0].clientY-startY;
    if(dist>0 && atTop()){ e.preventDefault(); show(dist, dist>=THRESH); }
    else if(dist<=0){ pulling=false; hide(); }
  },{passive:false});
  window.addEventListener('touchend',async ()=>{
    if(!pulling) return; pulling=false;
    if(dist<THRESH){ hide(); return; }
    busy=true;
    ind.style.opacity=1; ind.style.transform='translate(-50%,14px)';
    svg().style.transform='rotate(0deg)'; svg().style.animation='spin 1s linear infinite';
    txt().textContent='Refreshing…';
    try{ await fetchAll(false); }catch(e){}
    svg().style.animation='';
    txt().textContent=NET_BLOCKED?'Live refresh blocked in this viewer':'Feed updated ✓';
    setTimeout(()=>{ hide(); busy=false; },1000);
  },{passive:true});
}

/* ---------- init ---------- */
function hydrateCache(){
  articles.clear();
  (S.cache||[]).forEach(a=>{ if(a&&a.id){ if(!a.tags) a.tags=articleTags(a); articles.set(a.id,a); } });
}
function setView(v){
  S.view=v; saveState();
  // grid/list are driven by the radios (works CSS-only too); columns is JS-rendered
  $('#vwList').checked = (v==='list');
  $('#vwGrid').checked = (v!=='list');
  $('#viewCols').classList.toggle('active',v==='columns');
  $('#vseg').classList.toggle('cols',v==='columns');
  render();
}
function init(){
  loadState();
  hydrateCache();
  loadSnapshot();   // real articles bundled at build time — feed is never empty
  // label clicks (not radio onchange): a change event never fires when the radio
  // is already checked — e.g. leaving columns view back to grid
  $('#viewGrid').onclick=()=>setView('grid');
  $('#viewList').onclick=()=>setView('list');
  $('#viewCols').onclick=()=>setView('columns');
  $('#refreshBtn').onclick=()=>fetchAll(false);
  $('#settingsBtn').onclick=openSettings;
  $('#tbFavs').onclick=()=>selectTab('favs');
  $('#tbSaved').onclick=()=>selectTab('saved');
  initSearch();
  initPullToRefresh();
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ if($('#readerOverlay').classList.contains('open')) closeReader(); closeSettings(); closePop(); }
  });
  setView(['grid','list','columns'].includes(S.view)?S.view:'grid');
  fetchAll(false);
  setInterval(()=>fetchAll(true), 20*60*1000);
  if(S.profile.interactions===0) setTimeout(()=>toastOnce('welcome','👋 Welcome! Favorite ♥, save 🔖, hide ✕, and read — Currents learns what you love.'),1500);
}
init();
