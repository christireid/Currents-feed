'use strict';
/* ============================================================
   CURRENTS — personalized feed
   Sections: config → state/storage → utils → fetch/parse →
             personalization engine → (part 3) UI
   ============================================================ */

/* ---------------- CONFIG: curated sources ---------------- */
const SOURCES = [
  // ——— AI & tech ———
  {id:'tc-ai',    name:'TechCrunch AI',        cat:'ai', url:'https://techcrunch.com/category/artificial-intelligence/feed/', tags:['ai-news','startups','tools']},
  {id:'vb-ai',    name:'VentureBeat AI',       cat:'ai', url:'https://venturebeat.com/category/ai/feed/', tags:['ai-news','business','agents']},
  {id:'verge-ai', name:'The Verge · AI',       cat:'ai', url:'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', tags:['ai-news','tools']},
  {id:'mittr',    name:'MIT Technology Review',cat:'ai', url:'https://www.technologyreview.com/feed/', tags:['ai-news','research']},
  {id:'openai',   name:'OpenAI News',          cat:'ai', url:'https://openai.com/blog/rss.xml', tags:['chatgpt','models']},
  {id:'deepmind', name:'Google DeepMind',      cat:'ai', url:'https://deepmind.google/blog/rss.xml', tags:['models','research']},
  {id:'googai',   name:'Google AI Blog',       cat:'ai', url:'https://blog.google/technology/ai/rss/', tags:['models','tools']},
  {id:'hf',       name:'Hugging Face',         cat:'ai', url:'https://huggingface.co/blog/feed.xml', tags:['models','tutorials','tools']},
  {id:'simonw',   name:'Simon Willison',       cat:'ai', url:'https://simonwillison.net/atom/everything/', tags:['claude','agents','tools','howto']},
  {id:'mollick',  name:'One Useful Thing',     cat:'ai', url:'https://www.oneusefulthing.org/feed', tags:['howto','ai-work']},
  {id:'latent',   name:'Latent Space',         cat:'ai', url:'https://www.latent.space/feed', tags:['agents','engineering','skills']},
  {id:'every',    name:'Every',                cat:'ai', url:'https://every.to/feed.xml', tags:['ai-work','business','howto']},
  {id:'bensbites',name:"Ben's Bites",          cat:'ai', url:'https://bensbites.beehiiv.com/feed', tags:['tools','startups','ai-money']},
  {id:'mtp',      name:'MarkTechPost',         cat:'ai', url:'https://www.marktechpost.com/feed/', tags:['research','tutorials','models']},
  {id:'decoder',  name:'The Decoder',          cat:'ai', url:'https://the-decoder.com/feed/', tags:['ai-news','models']},
  {id:'zapier',   name:'Zapier Blog',          cat:'ai', url:'https://zapier.com/blog/feeds/latest/', tags:['automation','howto','tools']},
  {id:'hn',       name:'Hacker News',          cat:'ai', url:'https://hnrss.org/frontpage', tags:['tech','tools','startups']},
  {id:'wired-ai', name:'Wired · AI',           cat:'ai', url:'https://www.wired.com/feed/tag/ai/latest/rss', tags:['ai-news']},
  {id:'kdn',      name:'KDnuggets',            cat:'ai', url:'https://www.kdnuggets.com/feed', tags:['tutorials','skills']},
  {id:'tds',      name:'Towards Data Science', cat:'ai', url:'https://towardsdatascience.com/feed', tags:['tutorials','skills','agents']},
  // ——— health & wellness ———
  {id:'wg',       name:'Well+Good',            cat:'health', url:'https://www.wellandgood.com/feed/', tags:['wellness','fitness']},
  {id:'mbg',      name:'mindbodygreen',        cat:'health', url:'https://www.mindbodygreen.com/rss', tags:['wellness','supplements','holistic']},
  {id:'draxe',    name:'Dr. Axe',              cat:'health', url:'https://draxe.com/feed/', tags:['holistic','herbs','nutrition']},
  {id:'wm',       name:'Wellness Mama',        cat:'health', url:'https://wellnessmama.com/feed/', tags:['holistic','remedies','recipes']},
  {id:'mda',      name:"Mark's Daily Apple",   cat:'health', url:'https://www.marksdailyapple.com/feed/', tags:['nutrition','fitness']},
  {id:'kresser',  name:'Chris Kresser',        cat:'health', url:'https://chriskresser.com/feed/', tags:['functional-med','nutrition']},
  {id:'nf',       name:'NutritionFacts.org',   cat:'health', url:'https://nutritionfacts.org/feed/', tags:['nutrition','evidence']},
  {id:'sd-nut',   name:'ScienceDaily Nutrition',cat:'health', url:'https://www.sciencedaily.com/rss/health_medicine/nutrition.xml', tags:['nutrition','research']},
  {id:'sd-fit',   name:'ScienceDaily Fitness', cat:'health', url:'https://www.sciencedaily.com/rss/health_medicine/fitness.xml', tags:['fitness','research']},
  {id:'bm',       name:'Breaking Muscle',      cat:'health', url:'https://breakingmuscle.com/feed/', tags:['fitness','workouts']},
  {id:'mf',       name:'Muscle & Fitness',     cat:'health', url:'https://www.muscleandfitness.com/feed/', tags:['workouts','abs']},
  {id:'bg',       name:'Ben Greenfield Life',  cat:'health', url:'https://bengreenfieldlife.com/feed/', tags:['biohacking','supplements','nootropics']},
  {id:'fitt',     name:'Fitt Insider',         cat:'health', url:'https://insider.fitt.co/feed/', tags:['wellness-startups','health-tech']},
  {id:'mommyp',   name:'Mommypotamus',         cat:'health', url:'https://mommypotamus.com/feed/', tags:['herbs','remedies','natural']},
  {id:'fff',      name:'Fit Foodie Finds',     cat:'health', url:'https://fitfoodiefinds.com/feed/', tags:['recipes','protein','meal-prep']},
  {id:'skinny',   name:'Skinnytaste',          cat:'health', url:'https://www.skinnytaste.com/feed/', tags:['recipes','meal-prep']},
  {id:'chalk',    name:'The Chalkboard',       cat:'health', url:'https://thechalkboardmag.com/feed/', tags:['wellness','holistic']},
  {id:'noot',     name:'Nootropics Expert',    cat:'health', url:'https://nootropicsexpert.com/feed/', tags:['nootropics','supplements']},
  // ——— parenting ———
  {id:'lansbury', name:'Janet Lansbury',       cat:'parenting', url:'https://www.janetlansbury.com/feed/', tags:['respectful-parenting','emotional']},
  {id:'sigmund',  name:'Hey Sigmund',          cat:'parenting', url:'https://www.heysigmund.com/feed/', tags:['child-anxiety','emotional']},
  {id:'blj',      name:'Big Life Journal',     cat:'parenting', url:'https://biglifejournal.com/blogs/blog.atom', tags:['growth-mindset','confidence']},
  {id:'motherly', name:'Motherly',             cat:'parenting', url:'https://www.mother.ly/feed/', tags:['parenting-news','emotional']},
  {id:'simpleh',  name:'Simple Homeschool',    cat:'parenting', url:'https://simplehomeschool.net/feed/', tags:['homeschool']},
  {id:'hsmom',    name:'The Homeschool Mom',   cat:'parenting', url:'https://www.thehomeschoolmom.com/feed/', tags:['homeschool']},
  {id:'rll',      name:'Raising Lifelong Learners', cat:'parenting', url:'https://raisinglifelonglearners.com/feed/', tags:['homeschool','gifted']},
  {id:'fatherly', name:'Fatherly',             cat:'parenting', url:'https://www.fatherly.com/feed', tags:['parenting-news','kids-skills']},
];

const CATS = {
  ai:        {label:'AI & Tech',  cls:'ai'},
  health:    {label:'Health',     cls:'health'},
  parenting: {label:'Parenting',  cls:'parenting'},
};

/* Keyword → subtopic tagging (finer-grained personalization) */
const TOPIC_RULES = [
  [/\bclaude|anthropic\b/i,               'claude'],
  [/\bchatgpt|openai|gpt-?\d/i,           'chatgpt'],
  [/\bagent(s|ic)?\b/i,                   'agents'],
  [/\bautomat(e|ion|ing)|workflow|zapier|n8n\b/i, 'automation'],
  [/\bstartup|funding|raised|seed round|series [ab]\b/i, 'startups'],
  [/\bhow to|guide|tutorial|step[- ]by[- ]step|beginner/i, 'howto'],
  [/\bplugin|extension|mcp\b/i,           'plugins'],
  [/\bprompt(ing|s)?\b/i,                 'prompting'],
  [/\bmake money|monetiz|side hustle|income|revenue\b/i, 'ai-money'],
  [/\bbuild(ing)? (a |an )?(app|website|site|saas)\b/i, 'ai-building'],
  [/\bcontent creation|create content|youtube|newsletter\b/i, 'content'],
  [/\bmodel|llm|benchmark\b/i,            'models'],
  [/\bsupplement|vitamin|magnesium|creatine|omega/i, 'supplements'],
  [/\bnootropic|cognitive|brain health|focus\b/i, 'nootropics'],
  [/\bworkout|exercise|training|gym\b/i,  'workouts'],
  [/\babs|core|plank|stomach|oblique/i,   'abs-core'],
  [/\bherb(al|s)?|clove|turmeric|ginger|ashwagandha|remedy|remedies\b/i, 'herbs'],
  [/\bchinese medicine|tcm|acupunctur|holistic|functional med|naturopath/i, 'holistic'],
  [/\brecipe|meal prep|high[- ]protein|breakfast|dinner\b/i, 'recipes'],
  [/\bgut|microbiome|digest/i,            'gut-health'],
  [/\bsleep|circadian\b/i,                'sleep'],
  [/\blongevity|anti[- ]aging\b/i,        'longevity'],
  [/\bhomeschool|unschool|microschool|charter\b/i, 'homeschool'],
  [/\bemotional regulation|big feelings|tantrum|meltdown|co[- ]?regulat/i, 'emotional-regulation'],
  [/\bconfiden(ce|t)|resilien|mentally strong|growth mindset\b/i, 'confidence'],
  [/\bshame|gentle parenting|respectful parenting|conscious parenting\b/i, 'gentle-parenting'],
  [/\bkids? (and )?(money|finance)|allowance|financial literacy\b/i, 'kids-finance'],
  [/\bscreen time|kids? (and )?ai|children.{0,12}ai\b/i, 'kids-and-ai'],
];

/* Interest boosters Christi asked for explicitly — head start, pre-learned */
const SEED_TAGS = {claude:2, agents:2, automation:1.5, howto:1.5, 'ai-money':1.5, supplements:1, herbs:1, 'abs-core':1, homeschool:1, 'emotional-regulation':1.5};

const PROXIES = [
  {json:true,  wrap:u => 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(u)},
  {json:false, wrap:u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u)},
  {json:false, wrap:u => 'https://corsproxy.io/?url=' + encodeURIComponent(u)},
  {json:false, wrap:u => 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u)},
];
let NET_BLOCKED = false;

const COLD_START = 8;          // interactions before For You turns personalized
const HALF_LIFE_H = 42;        // freshness half-life, hours
const MAX_CACHE = 600;
const SIGNALS = {open:1.5, dwell:0.8, fav:4, unfav:-4, save:3, unsave:-3, hide:-5, unhide:5, ext:2};

/* ---------------- storage (guarded — falls back to memory) ---------------- */
const store = (() => {
  try { const t='__cur_test'; localStorage.setItem(t,'1'); localStorage.removeItem(t); return localStorage; }
  catch(e) { const m={}; return {getItem:k=>(k in m?m[k]:null), setItem:(k,v)=>{m[k]=String(v)}, removeItem:k=>{delete m[k]}}; }
})();
const PERSISTENT = (()=>{ try{const t='__p';localStorage.setItem(t,'1');localStorage.removeItem(t);return true}catch(e){return false} })();

const DEFAULT_STATE = () => ({
  profile:{tags:Object.assign({},SEED_TAGS), sources:{}, words:{}, interactions:0},
  favs:[], hidden:[], collections:{}, library:{},   // library: snapshots of saved/faved articles
  read:{},                                          // id -> {opened, dwell}
  disabled:[], view:'grid', tab:'foryou',
  cache:[], lastRefresh:0,
});

let S = DEFAULT_STATE();
function loadState(){
  try{
    const raw = store.getItem('currents.v1');
    if(raw){ const p = JSON.parse(raw); S = Object.assign(DEFAULT_STATE(), p);
      S.profile = Object.assign({tags:{},sources:{},words:{},interactions:0}, p.profile);
    }
  }catch(e){ console.warn('state load failed', e); }
}
let saveTimer=null;
function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{ try{ store.setItem('currents.v1', JSON.stringify(S)); }catch(e){
    // storage full → drop cache and retry once
    try{ const s2=Object.assign({},S,{cache:S.cache.slice(0,150)}); store.setItem('currents.v1', JSON.stringify(s2)); }catch(_){}
  }}, 300);
}

/* ---------------- utils ---------------- */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function hash(s){ let h=5381; for(let i=0;i<s.length;i++){ h=((h<<5)+h+s.charCodeAt(i))>>>0; } return h.toString(36); }
function timeAgo(t){
  const s = Math.max(0,(Date.now()-t)/1000);
  if(s<90) return 'just now';
  const m=s/60, h=m/60, d=h/24;
  if(m<60) return Math.round(m)+'m ago';
  if(h<24) return Math.round(h)+'h ago';
  if(d<7)  return Math.round(d)+'d ago';
  return new Date(t).toLocaleDateString(undefined,{month:'short',day:'numeric'});
}
function decodeEntities(s){ const ta=document.createElement('textarea'); ta.innerHTML=s; return ta.value; }
function stripTags(html){ const d=document.createElement('div'); d.innerHTML=html||''; return (d.textContent||'').replace(/\s+/g,' ').trim(); }
function normalizeLink(u){
  try{ const url=new URL(u);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid','gclid','ref'].forEach(p=>url.searchParams.delete(p));
    return (url.origin+url.pathname).replace(/\/+$/,'')+ (url.search||'');
  }catch(e){ return (u||'').trim(); }
}
const STOP = new Set('the a an and or but for nor with this that these those from into over your you our their his her its they them then than when what which while will would could should have has had been being are is was were not just also more most some such only very can may might about after before between during under above below out off all any each few how why who whom does did doing said says new best top ways make makes making made need needs get gets getting use uses using used way year years week weeks day days time times thing things here there'.split(' '));
function keywords(title){
  return [...new Set((title||'').toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/)
    .filter(w=>w.length>3 && !STOP.has(w)))].slice(0,8);
}
function articleTags(a){
  const src = SOURCES.find(s=>s.id===a.src);
  const tags = new Set(src ? src.tags : []);
  const text = a.title + ' ' + (a.snippet||'');
  for(const [re,tag] of TOPIC_RULES) if(re.test(text)) tags.add(tag);
  return [...tags];
}

/* ---------------- fetching & parsing ---------------- */
const feedHealth = {};   // srcId -> {ok, count, at, err}

async function fetchFeedItems(source){
  let lastErr;
  for(const p of PROXIES){
    try{
      const ctl = new AbortController();
      const to = setTimeout(()=>ctl.abort(), 10000);
      const res = await fetch(p.wrap(source.url), {signal:ctl.signal});
      clearTimeout(to);
      if(!res.ok) throw new Error('HTTP '+res.status);
      const text = await res.text();
      if(!text || text.length < 60) throw new Error('empty response');
      const items = p.json ? parseRss2Json(text, source) : parseFeed(text, source);
      if(!items.length) throw new Error('no items');
      return items;
    }catch(e){ lastErr=e; }
  }
  throw lastErr || new Error('all proxies failed');
}

function parseRss2Json(text, source){
  const data = JSON.parse(text);
  if(data.status!=='ok' || !Array.isArray(data.items)) throw new Error('rss2json: '+(data.message||data.status));
  const out=[];
  for(const it of data.items.slice(0,25)){
    const title = decodeEntities(stripTags(it.title||'')).trim();
    const link = (it.link||'').trim();
    if(!title || !link) continue;
    const ts = it.pubDate ? (Date.parse(it.pubDate.replace(' ','T')) || Date.parse(it.pubDate) || Date.now()) : Date.now();
    const body = it.content || it.description || '';
    let img = it.thumbnail || (it.enclosure && /^image/.test(it.enclosure.type||'') ? it.enclosure.link : null) || null;
    if(!img && body){
      const m = body.match(/<img[^>]+src=["']([^"']+)["']/i);
      if(m && !/1x1|pixel|spacer|emoji|\.svg(\?|$)/i.test(m[1]) && /^https?:/i.test(m[1])) img=m[1];
    }
    if(img && !/^https?:/i.test(img)) img=null;
    if(img) img=img.replace(/^http:\/\//i,'https://');
    const nl = normalizeLink(link);
    out.push({
      id: hash(nl), link, title, ts: Math.min(ts, Date.now()+864e5),
      src: source.id, cat: source.cat, img,
      snippet: decodeEntities(stripTags(it.description||body)).slice(0,260),
      author: (it.author||'').trim(),
      content: (body||'').slice(0,120000),
    });
  }
  return out;
}

function firstNS(node, local){
  const els = node.getElementsByTagName('*');
  for(let i=0;i<els.length;i++){ if(els[i].localName===local) return els[i]; }
  return null;
}
function extractImage(item, contentHtml){
  // media:content / media:thumbnail / enclosure / itunes:image
  const els = item.getElementsByTagName('*');
  let candidate = null;
  for(let i=0;i<els.length;i++){
    const e=els[i], ln=e.localName;
    if(ln==='content'||ln==='thumbnail'||ln==='image'){
      const u=e.getAttribute('url')||e.getAttribute('href');
      const type=e.getAttribute('type')||'', medium=e.getAttribute('medium')||'';
      if(u && /^https?:/i.test(u) && !/\.(mp3|mp4|m4a|avi)(\?|$)/i.test(u) && (type.startsWith('image')||medium==='image'||type===''&&medium===''||ln==='thumbnail'||ln==='image')){
        const w=parseInt(e.getAttribute('width')||'0',10);
        if(w && w<40) continue;
        if(!candidate || ln!=='thumbnail') candidate=u;
        if(ln==='content' && (type.startsWith('image')||medium==='image')) { candidate=u; break; }
      }
    }
    if(ln==='enclosure'){
      const u=e.getAttribute('url'), type=e.getAttribute('type')||'';
      if(u && type.startsWith('image')){ candidate=u; break; }
    }
  }
  if(!candidate && contentHtml){
    const m = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if(m && !/1x1|pixel|spacer|emoji|feedburner|\.svg(\?|$)/i.test(m[1]) && /^https?:/i.test(m[1])) candidate=m[1];
  }
  if(candidate) candidate = candidate.replace(/^http:\/\//i,'https://');
  return candidate || null;
}

function parseFeed(xmlText, source){
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  if(doc.querySelector('parsererror')) throw new Error('XML parse error');
  const out = [];
  let nodes = Array.from(doc.querySelectorAll('rss channel > item, channel > item'));
  const isAtom = nodes.length===0;
  if(isAtom) nodes = Array.from(doc.getElementsByTagName('*')).filter(n=>n.localName==='entry');
  for(const item of nodes.slice(0,25)){
    const g = ln => { for(const c of item.children){ if(c.localName===ln) return c; } return null; };
    const title = decodeEntities(stripTags((g('title')||{}).textContent||'')).trim();
    if(!title) continue;
    let link='';
    if(isAtom){
      let alt=null;
      for(const c of item.children){ if(c.localName==='link'){ const rel=c.getAttribute('rel'); if(!rel||rel==='alternate'){alt=c;break;} if(!alt)alt=c; } }
      link = alt ? (alt.getAttribute('href')||'') : '';
    } else link = ((g('link')||{}).textContent||'').trim();
    if(!link) continue;
    const dateStr = ['pubDate','published','updated','date'].map(t=>{const e=g(t)||firstNS(item,t);return e?e.textContent:null}).find(Boolean);
    const ts = dateStr ? (Date.parse(dateStr)||Date.now()) : Date.now();
    let content='';
    for(const c of item.children){ if(c.localName==='encoded'||c.localName==='content'){ content=c.textContent||''; break; } }
    const descEl = g('description')||g('summary');
    const desc = descEl ? descEl.textContent||'' : '';
    const body = content || desc;
    let author='';
    for(const c of item.children){ if(c.localName==='creator'||c.localName==='author'){ author=stripTags(c.textContent||'').trim(); break; } }
    const img = extractImage(item, body);
    const snippet = decodeEntities(stripTags(desc||content)).slice(0,260);
    const nl = normalizeLink(link);
    out.push({
      id: hash(nl), link: link.trim(), title, ts: Math.min(ts, Date.now()+864e5),
      src: source.id, cat: source.cat, img, snippet, author,
      content: (content||desc||'').slice(0, 120000),
    });
  }
  return out;
}

const articles = new Map();     // id -> article
function mergeArticles(items){
  let added=0;
  for(const a of items){
    const ex = articles.get(a.id);
    if(!ex){ a.tags = articleTags(a); articles.set(a.id,a); added++; }
    else if(ex.snap && !a.snap){ a.tags = articleTags(a); articles.set(a.id,a); }  // live data replaces bundled snapshot
  }
  return added;
}

let fetching=false;
async function fetchAll(quiet){
  if(fetching) return; fetching=true;
  const btn=$('#refreshBtn'); btn.classList.add('spinning');
  const active = SOURCES.filter(s=>!S.disabled.includes(s.id));
  let done=0;
  const pool = 6;
  const queue=[...active];
  const worker = async () => {
    while(queue.length){
      const src = queue.shift();
      try{
        const items = await fetchFeedItems(src);
        mergeArticles(items);
        feedHealth[src.id]={ok:true,count:items.length,at:Date.now()};
      }catch(e){
        feedHealth[src.id]={ok:false,err:String(e && e.message || e),at:Date.now()};
      }
      done++;
      if(done%4===0 || done===active.length){
        $('#feedmeta') && renderMeta(done, active.length);
        if(!quiet) render();   // progressive render as feeds arrive
      }
    }
  };
  await Promise.all(Array.from({length:pool}, worker));
  const okCount = Object.values(feedHealth).filter(h=>h.ok).length;
  NET_BLOCKED = okCount===0;
  if(okCount>0){
    // persist cache: newest 600
    S.cache = [...articles.values()].sort((a,b)=>b.ts-a.ts).slice(0,MAX_CACHE)
      .map(a=>({...a, content:(a.content||'').slice(0,20000)}));
    S.lastRefresh = Date.now();
    saveState();
  }
  fetching=false; btn.classList.remove('spinning');
  render();
}

/* ---------------- personalization engine ---------------- */
function bump(obj, key, w){ obj[key] = Math.max(-30, Math.min(30, (obj[key]||0) + w)); }

function signal(a, type, mult){
  const w = (SIGNALS[type]||0) * (mult||1);
  if(!w) return;
  const p = S.profile;
  bump(p.sources, a.src, w*0.6);
  (a.tags||[]).forEach(t=>bump(p.tags, t, w));
  keywords(a.title).forEach(k=>bump(p.words, k, w*0.35));
  if(['open','fav','save','hide','ext'].includes(type)){
    if(!S.read[a.id]) S.read[a.id]={};
    if(!S.read[a.id]._counted){ p.interactions++; S.read[a.id]._counted=true; }
  }
  saveState();
}

function interestOf(a){
  const p=S.profile;
  const srcW = Math.tanh((p.sources[a.src]||0)/6);
  let tagSum=0, tagN=0, best=null, bestW=0;
  for(const t of (a.tags||[])){
    const w=p.tags[t]||0; tagSum+=w; tagN++;
    if(w>bestW){bestW=w;best=t;}
  }
  const tagW = tagN? Math.tanh((tagSum/tagN)/4) : 0;
  let kwSum=0;
  for(const k of keywords(a.title)) kwSum += (p.words[k]||0);
  const kwW = Math.tanh(kwSum/8);
  return {score: 1.3*tagW + 1.0*srcW + 0.7*kwW, why: bestW>=2.5? best : null};
}

function personalized(){ return S.profile.interactions >= COLD_START; }

function rankForYou(list){
  if(!personalized()) return list.sort((a,b)=>b.ts-a.ts);  // chronological cold start (as requested)
  const now=Date.now();
  const scored = list.map(a=>{
    const ageH=(now-a.ts)/36e5;
    const fresh=Math.exp(-Math.LN2*ageH/HALF_LIFE_H);
    const it=interestOf(a);
    const opened=S.read[a.id] && S.read[a.id].opened;
    const seenPenalty = opened? 0.55 : 1;
    const jitter = 1 + (Math.random()*0.12 - 0.04);       // exploration noise
    a._why = it.why;
    return {a, s: fresh*(1+Math.tanh(it.score))*seenPenalty*jitter};
  }).sort((x,y)=>y.s-x.s).map(x=>x.a);
  // TikTok-style discovery injection: every 7th slot → a fresh article from an under-explored angle
  const head = scored.slice(0,80);
  const tail = scored.slice(80);
  const pool = scored.filter(a=>{
    const it=interestOf(a); const ageH=(now-a.ts)/36e5;
    return ageH<48 && Math.abs(it.score)<0.25 && !(S.read[a.id]&&S.read[a.id].opened);
  });
  for(let pos=6; pos<head.length && pool.length; pos+=7){
    const pick = pool.splice(Math.floor(Math.random()*Math.min(pool.length,10)),1)[0];
    const cur = head.indexOf(pick);
    if(cur>-1 && cur<=pos) continue;
    if(cur>-1) head.splice(cur,1);
    pick._discovery = true;
    head.splice(pos,0,pick);
  }
  return head.concat(tail);
}

function topInterests(n){
  return Object.entries(S.profile.tags).filter(([,w])=>Math.abs(w)>0.4)
    .sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).slice(0,n);
}
