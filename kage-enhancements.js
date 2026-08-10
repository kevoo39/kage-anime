(()=>{
const css=`
:root{--kage-orange:#f47521;--kage-gold:#ffc078}
body{overflow-x:hidden}body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(55vw 30vw at 90% 0%,rgba(244,117,33,.08),transparent 70%),radial-gradient(45vw 30vw at 0% 55%,rgba(100,45,160,.07),transparent 70%)}
.nav{transition:background .25s,box-shadow .25s,backdrop-filter .25s}.nav.kage-scrolled{background:rgba(8,8,12,.96);box-shadow:0 10px 35px rgba(0,0,0,.28)}
.brand .mark{position:relative;overflow:hidden}.brand .mark::after{content:"";position:absolute;inset:-60%;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,.6),transparent 65%);transform:translateX(-80%) rotate(15deg);animation:kageShine 5s ease-in-out infinite}
@keyframes kageShine{0%,70%{transform:translateX(-80%) rotate(15deg)}85%,100%{transform:translateX(80%) rotate(15deg)}}
.section{content-visibility:auto;contain-intrinsic-size:420px}.sectionTop{position:relative}.sectionTop::after{content:"";height:1px;flex:1;margin:0 18px 5px;background:linear-gradient(90deg,rgba(255,255,255,.12),transparent);display:block}.sectionTop{gap:0}.sectionTop>div:first-child{position:relative;z-index:1}
.railWrap{position:relative}.railArrow{position:absolute;z-index:5;top:42%;width:40px;height:40px;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(12,12,18,.88);color:#fff;display:grid;place-items:center;box-shadow:0 8px 25px #0008;opacity:0;transition:opacity .2s,transform .2s}.railWrap:hover .railArrow{opacity:1}.railArrow:hover{transform:scale(1.08);border-color:rgba(244,117,33,.55)}.railArrow.left{left:-8px}.railArrow.right{right:-8px}
.card{transition:filter .2s}.card:hover{filter:brightness(1.04)}.card:focus-visible .cover{outline:2px solid var(--kage-gold);outline-offset:3px}.cover img{transition:transform .45s ease,filter .35s ease}.card:hover .cover img{transform:scale(1.045)}
.rating{background:rgba(5,5,8,.72);padding:4px 6px;border-radius:5px;backdrop-filter:blur(8px)}.badge{backdrop-filter:blur(8px)}
.empty{min-width:100%;backdrop-filter:blur(12px)}
.kage-skip{position:fixed;left:12px;top:12px;z-index:200;padding:10px 14px;background:#fff;color:#111;border-radius:8px;transform:translateY(-150%);transition:transform .2s;font-weight:800}.kage-skip:focus{transform:translateY(0)}
.kage-route{animation:kageRoute .28s ease-out}@keyframes kageRoute{from{opacity:.4;transform:translateY(5px)}to{opacity:1;transform:none}}
@media(max-width:600px){.sectionTop::after{display:none}.railArrow{display:none}.card:hover .cover{transform:none}.card:hover .cover img{transform:none}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
`;
const style=document.createElement('style');style.id='kage-enhancements';style.textContent=css;document.head.appendChild(style);
const main=document.getElementById('root');if(!main)return;
const skip=document.createElement('a');skip.className='kage-skip';skip.href='#root';skip.textContent='Skip to content';document.body.prepend(skip);main.setAttribute('tabindex','-1');
const nav=document.querySelector('.nav');let lastY=0;addEventListener('scroll',()=>{const y=scrollY;nav?.classList.toggle('kage-scrolled',y>12);lastY=y},{passive:true});
function enhanceRails(){document.querySelectorAll('.rail').forEach(rail=>{if(rail.parentElement?.classList.contains('railWrap'))return;const wrap=document.createElement('div');wrap.className='railWrap';rail.parentNode.insertBefore(wrap,rail);wrap.appendChild(rail);const mk=(dir,label)=>{const b=document.createElement('button');b.className=`railArrow ${dir}`;b.type='button';b.setAttribute('aria-label',label);b.textContent=dir==='left'?'‹':'›';b.onclick=()=>rail.scrollBy({left:(dir==='left'?-1:1)*Math.max(rail.clientWidth*.78,500),behavior:'smooth'});return b};wrap.append(mk('left','Previous titles'),mk('right','More titles'))});}
function fixImages(){document.querySelectorAll('img').forEach(img=>{if(img.dataset.kageFixed)return;img.dataset.kageFixed='1';img.loading=img.loading||'lazy';img.decoding='async';img.addEventListener('error',()=>{if(img.dataset.fallback)return;img.dataset.fallback='1';img.removeAttribute('src');img.style.background='linear-gradient(145deg,#21151b,#111117)';img.alt=img.alt||'Poster unavailable'});});}
function routePolish(){main.classList.remove('kage-route');void main.offsetWidth;main.classList.add('kage-route');enhanceRails();fixImages();}
const mo=new MutationObserver(()=>{clearTimeout(mo.t);mo.t=setTimeout(routePolish,80)});mo.t=null;mo.observe(main,{childList:true,subtree:true});
addEventListener('hashchange',()=>setTimeout(routePolish,40));setTimeout(routePolish,120);
// Keyboard shortcut: / focuses the appropriate search box without hijacking text inputs.
addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault();(document.getElementById('q')||document.getElementById('mq'))?.focus()}});
})();
