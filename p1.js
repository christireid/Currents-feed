'use strict';
/* ============================================================
   CURRENTS — personalized feed
   Sections: config → state/storage → utils → fetch/parse →
             personalization engine → (part 3) UI
   ============================================================ */

/* ---------------- CONFIG: curated sources ---------------- */
const SOURCES = [
  // ——— AI & tech ———
  // tags = interest HINTS, applied only where the source is inherently single-topic.
  // General news sources get none — their articles must earn relevance from content.
  {id:'tc-ai',    name:'TechCrunch AI',        cat:'ai', url:'https://techcrunch.com/category/artificial-intelligence/feed/', tags:[]},
  {id:'vb-ai',    name:'VentureBeat AI',       cat:'ai', url:'https://venturebeat.com/category/ai/feed/', tags:[]},
  {id:'verge-ai', name:'The Verge · AI',       cat:'ai', url:'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', tags:[]},
  {id:'mittr',    name:'MIT Technology Review',cat:'ai', url:'https://www.technologyreview.com/feed/', tags:[]},
  {id:'openai',   name:'OpenAI News',          cat:'ai', url:'https://openai.com/blog/rss.xml', tags:['chatgpt-openai']},
  {id:'deepmind', name:'Google DeepMind',      cat:'ai', url:'https://deepmind.google/blog/rss.xml', tags:['new-models']},
  {id:'googai',   name:'Google AI Blog',       cat:'ai', url:'https://blog.google/technology/ai/rss/', tags:[]},
  {id:'hf',       name:'Hugging Face',         cat:'ai', url:'https://huggingface.co/blog/feed.xml', tags:['new-models']},
  {id:'simonw',   name:'Simon Willison',       cat:'ai', url:'https://simonwillison.net/atom/everything/', tags:[]},
  {id:'mollick',  name:'One Useful Thing',     cat:'ai', url:'https://www.oneusefulthing.org/feed', tags:['business-with-ai']},
  {id:'latent',   name:'Latent Space',         cat:'ai', url:'https://www.latent.space/feed', tags:['agents-workflows']},
  {id:'every',    name:'Every',                cat:'ai', url:'https://every.to/feed.xml', tags:[]},
  {id:'bensbites',name:"Ben's Bites",          cat:'ai', url:'https://bensbites.beehiiv.com/feed', tags:['tools-extensions']},
  {id:'mtp',      name:'MarkTechPost',         cat:'ai', url:'https://www.marktechpost.com/feed/', tags:['new-models']},
  {id:'decoder',  name:'The Decoder',          cat:'ai', url:'https://the-decoder.com/feed/', tags:[]},
  {id:'zapier',   name:'Zapier Blog',          cat:'ai', url:'https://zapier.com/blog/feeds/latest/', tags:['automation']},
  {id:'hn',       name:'Hacker News',          cat:'ai', url:'https://hnrss.org/frontpage', tags:[]},
  {id:'wired-ai', name:'Wired · AI',           cat:'ai', url:'https://www.wired.com/feed/tag/ai/latest/rss', tags:[]},
  {id:'kdn',      name:'KDnuggets',            cat:'ai', url:'https://www.kdnuggets.com/feed', tags:['tutorials-howtos']},
  {id:'tds',      name:'Towards Data Science', cat:'ai', url:'https://towardsdatascience.com/feed', tags:['tutorials-howtos']},
  // ——— health & wellness ———
  {id:'wg',       name:'Well+Good',            cat:'health', url:'https://www.wellandgood.com/feed/', tags:[]},
  {id:'mbg',      name:'mindbodygreen',        cat:'health', url:'https://www.mindbodygreen.com/rss', tags:[]},
  {id:'draxe',    name:'Dr. Axe',              cat:'health', url:'https://draxe.com/feed/', tags:['food-herb-benefits']},
  {id:'wm',       name:'Wellness Mama',        cat:'health', url:'https://wellnessmama.com/feed/', tags:[]},
  {id:'mda',      name:"Mark's Daily Apple",   cat:'health', url:'https://www.marksdailyapple.com/feed/', tags:[]},
  {id:'kresser',  name:'Chris Kresser',        cat:'health', url:'https://chriskresser.com/feed/', tags:['functional-holistic']},
  {id:'nf',       name:'NutritionFacts.org',   cat:'health', url:'https://nutritionfacts.org/feed/', tags:['food-herb-benefits']},
  {id:'sd-nut',   name:'ScienceDaily Nutrition',cat:'health', url:'https://www.sciencedaily.com/rss/health_medicine/nutrition.xml', tags:['food-herb-benefits']},
  {id:'sd-fit',   name:'ScienceDaily Fitness', cat:'health', url:'https://www.sciencedaily.com/rss/health_medicine/fitness.xml', tags:['core-ab-workouts']},
  {id:'bm',       name:'Breaking Muscle',      cat:'health', url:'https://breakingmuscle.com/feed/', tags:['core-ab-workouts']},
  {id:'mf',       name:'Muscle & Fitness',     cat:'health', url:'https://www.muscleandfitness.com/feed/', tags:['core-ab-workouts']},
  {id:'bg',       name:'Ben Greenfield Life',  cat:'health', url:'https://bengreenfieldlife.com/feed/', tags:['health-hacks']},
  {id:'fitt',     name:'Fitt Insider',         cat:'health', url:'https://insider.fitt.co/feed/', tags:['wellness-startups']},
  {id:'mommyp',   name:'Mommypotamus',         cat:'health', url:'https://mommypotamus.com/feed/', tags:['herbal-remedies']},
  {id:'fff',      name:'Fit Foodie Finds',     cat:'health', url:'https://fitfoodiefinds.com/feed/', tags:['high-protein-meal-prep']},
  {id:'skinny',   name:'Skinnytaste',          cat:'health', url:'https://www.skinnytaste.com/feed/', tags:['high-protein-meal-prep']},
  {id:'chalk',    name:'The Chalkboard',       cat:'health', url:'https://thechalkboardmag.com/feed/', tags:[]},
  {id:'noot',     name:'Nootropics Expert',    cat:'health', url:'https://nootropicsexpert.com/feed/', tags:['nootropics']},
  // ——— parenting ———
  {id:'lansbury', name:'Janet Lansbury',       cat:'parenting', url:'https://www.janetlansbury.com/feed/', tags:['therapy-informed-parenting']},
  {id:'sigmund',  name:'Hey Sigmund',          cat:'parenting', url:'https://www.heysigmund.com/feed/', tags:['emotional-regulation']},
  {id:'blj',      name:'Big Life Journal',     cat:'parenting', url:'https://biglifejournal.com/blogs/blog.atom', tags:['mentally-strong-kids']},
  {id:'motherly', name:'Motherly',             cat:'parenting', url:'https://www.mother.ly/feed/', tags:[]},
  {id:'simpleh',  name:'Simple Homeschool',    cat:'parenting', url:'https://simplehomeschool.net/feed/', tags:['homeschooling']},
  {id:'hsmom',    name:'The Homeschool Mom',   cat:'parenting', url:'https://www.thehomeschoolmom.com/feed/', tags:['homeschooling']},
  {id:'rll',      name:'Raising Lifelong Learners', cat:'parenting', url:'https://raisinglifelonglearners.com/feed/', tags:['homeschooling']},
  {id:'fatherly', name:'Fatherly',             cat:'parenting', url:'https://www.fatherly.com/feed', tags:[]},
];

const CATS = {
  ai:        {label:'AI & Tech',  cls:'ai'},
  health:    {label:'Health',     cls:'health'},
  parenting: {label:'Parenting',  cls:'parenting'},
};

/* ============ THE 33 INTERESTS — Christi's canonical taxonomy ============
   This is the ONLY tag vocabulary. Every article is matched against these;
   an article matching none of them is dropped from the feed (strict relevance).
   cat gates prevent cross-bleed (e.g. "tools" in a health article ≠ AI tools). */
const INTERESTS = [
  // ——— AI & Building ———
  {id:'new-models',            label:'New models',                 cat:'ai',        re:/\bmodel(s)?\b|\bllm\b|gpt-?\d|gemini|gemma|llama|claude \d|benchmark|parameter|frontier|weights|fine-?tun/i},
  {id:'agents-workflows',      label:'Agents & workflows',         cat:'ai',        re:/\bagent(s|ic)?\b|multi-?agent|orchestrat|workflow/i},
  {id:'claude-ecosystem',      label:'Claude ecosystem',           cat:'ai',        re:/\bclaude\b|anthropic|\bmcp\b/i},
  {id:'chatgpt-openai',        label:'ChatGPT & OpenAI',           cat:'ai',        re:/chatgpt|openai|gpt-?\d|sam altman|copilot/i},
  {id:'ai-skills-plugins',     label:'AI skills & plugins',        cat:'ai',        re:/\bplugin|extension|prompt(ing|s)?\b|\bmcp\b|ai skill/i},
  {id:'tutorials-howtos',      label:'Tutorials & how-tos',        cat:'ai',        re:/\bhow to\b|tutorial|\bguide\b|step[- ]by[- ]step|explained|primer|walkthrough/i},
  {id:'automation',            label:'Automation',                 cat:'ai',        re:/automat|zapier|\bn8n\b|webhook|no[- ]?code/i},
  {id:'content-production',    label:'Content production',         cat:'ai',        re:/content (creation|production)|video[- ]generat|creator econom|youtube|newsletter|podcast/i},
  {id:'build-apps-sites',      label:'Build apps & sites',         cat:'ai',        re:/\bdeveloper|coding|\bcodebase\b|build(ing|s)? (an? )?(app|site|website|product|saas)|software engineer|rewrit(e|ing)|vibe[- ]?cod/i},
  {id:'tools-extensions',      label:'Tools & extensions',         cat:'ai',        re:/\btool(s|kit)?\b|browser extension|launch(es|ed)? (a |an )?(app|tool|product)/i},
  {id:'ai-startups',           label:'AI startups',                cat:'ai',        re:/startup|raise(s|d)?\b|funding|valuation|seed round|series [ab]\b|unicorn|venture/i},
  {id:'business-with-ai',      label:'Run a business with AI',     cat:'ai',        re:/enterprise|\bbusiness\b|compan(y|ies)|invest(ment|ing)?\b|\broi\b|adopt(ion|ing)/i},
  {id:'money-with-ai',         label:'Make money with AI',         cat:'ai',        re:/make money|monetiz|side hustle|income|revenue|profit/i},
  // ——— Health & Wellness ———
  {id:'supplements',           label:'Supplements',                cat:'health',    re:/supplement|vitamin|collagen|creatine|magnesium|omega-?3|mineral|\bb12\b|\bd3\b|\bd2\b/i},
  {id:'nootropics',            label:'Nootropics',                 cat:'health',    re:/nootropic|cognitive|\bbrain\b|\bfocus\b|memory/i},
  {id:'wellness-startups',     label:'Wellness startups',          cat:'health',    re:/startup|funding|raise(s|d)?\b|launch(es|ed)?\b|\bbrand\b|compan(y|ies)/i},
  {id:'health-tech',           label:'Health tech',                cat:'health',    re:/\btech\b|wearable|device|biomarker|diagnostic|\bapp\b|sensor|\btest(s|ing)?\b/i},
  {id:'ai-for-health',         label:'AI for health',              cat:'health',    re:/\bai\b|artificial intelligence|algorithm|machine learning/i},
  {id:'functional-holistic',   label:'Functional & holistic',      cat:'health',    re:/functional med|holistic|naturopath|integrative|root[- ]?cause|alternative medicine/i},
  {id:'tcm',                   label:'Traditional Chinese medicine',cat:'health',   re:/chinese medicine|\btcm\b|acupunct|cooling (foods?|herbs?)|warming foods?|\bqi\b/i},
  {id:'herbal-remedies',       label:'Herbal remedies',            cat:'health',    re:/\bherb|remedy|remedies|essential oil|tincture|clove|turmeric|ashwagandha|elderberry|\bdiy\b/i},
  {id:'food-herb-benefits',    label:'Food & herb benefits',       cat:'health',    re:/nutrit|benefit|nutrient|good for you|superfood|antioxidant|\bfood(s)?\b/i},
  {id:'core-ab-workouts',      label:'Core & ab workouts',         cat:'health',    re:/\babs?\b|\bcore\b|plank|oblique|stomach|workout|exercise|strength[- ]?train|resistance/i},
  {id:'health-hacks',          label:'Health hacks',               cat:'health',    re:/\bhack|\btip(s)?\b|trick|routine|habit|boost|optimiz|improve|longevity|sleep|light|breath|stress/i},
  {id:'high-protein-meal-prep',label:'High-protein meal prep',     cat:'health',    re:/protein|meal[- ]?prep|recipe|breakfast|dinner|lunch|snack|smoothie|no-cook/i},
  // ——— Parenting ———
  {id:'kids-ai-era',           label:'Kids in the AI era',         cat:'parenting', re:/\bai\b|screen|digital|social media|online|\btech\b/i},
  {id:'emotional-regulation',  label:'Emotional regulation',       cat:'parenting', re:/emotion|anxiet|feeling|regulat|meltdown|tantrum|\bcalm\b|\bbrave\b|\bfear\b|stress|big feelings/i},
  {id:'therapy-informed-parenting', label:'Therapy-informed parenting', cat:'parenting', re:/therap|psycholog|\bmental\b|\brie\b|respectful|attachment|trauma|development/i},
  {id:'alternative-schools',   label:'Alternative schools',        cat:'parenting', re:/school|montessori|microschool|charter|education|classroom|recess/i},
  {id:'homeschooling',         label:'Homeschooling',              cat:'parenting', re:/homeschool|unschool/i},
  {id:'teaching-without-shame',label:'Teaching without shame',     cat:'parenting', re:/shame|punish|discipline|gentle|pressure|scold|without (pressure|force)/i},
  {id:'mentally-strong-kids',  label:'Mentally strong kids',       cat:'parenting', re:/confiden|resilien|mentally strong|growth mindset|courage|\bbrave\b|self-esteem|\bgrit\b/i},
  {id:'kids-money',            label:'Kids & money',               cat:'parenting', re:/\bmoney\b|allowance|financial literacy|\bfinance\b|saving/i},
];
const INTEREST_LABELS = Object.fromEntries(INTERESTS.map(i=>[i.id,i.label]));

/* Interest boosters Christi asked for explicitly — head start, pre-learned */
const SEED_TAGS = {'claude-ecosystem':2, 'agents-workflows':2, automation:1.5, 'tutorials-howtos':1.5, 'money-with-ai':1.5, supplements:1, 'herbal-remedies':1, 'core-ab-workouts':1, homeschooling:1, 'emotional-regulation':1.5};

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
  disabled:[], view:'grid', tab:'foryou', interest:null,
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
  // Tags come ONLY from the 33-interest taxonomy. Source hints apply only for
  // single-topic sources (a Nootropics Expert article IS about nootropics).
  const src = SOURCES.find(s=>s.id===a.src);
  const tags = new Set(src ? src.tags : []);
  const text = a.title + ' ' + (a.snippet||'');
  for(const i of INTERESTS){
    if(i.cat && i.cat!==a.cat) continue;      // category gate: no cross-bleed
    if(i.re.test(text)) tags.add(i.id);
  }
  return [...tags];
}
function isRelevant(a){ return (a.tags||[]).length>0; }   // strict relevance gate

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
