/* KAGE premium layout layer: non-destructive enhancement for the static preview. */
(()=>{
 const root=document.documentElement;
 root.classList.add('kage-pro');
 const css=`
.kage-pro body{background:#07070a;color:#f5f3f5}
.kage-pro .nav{height:72px;padding-inline:clamp(20px,5vw,72px);background:rgba(7,7,10,.94);border-bottom:1px solid rgba(255,255,255,.07)}
.kage-pro .brand{gap:12px}.kage-pro .mark{width:34px;height:34px;border-radius:8px}
.kage-pro .links{gap:26px}.kage-pro .links button{font-size:13px;letter-spacing:.1px}
.kage-pro .hero{min-height:min(680px,76vh);padding-bottom:88px;background-position:center 28%}
.kage-pro .heroInner{max-width:760px}.kage-pro .hero h1{font-size:clamp(48px,6.8vw,88px);font-weight:850}
.kage-pro .section{padding-top:38px;padding-bottom:24px}.kage-pro .sectionTop{margin-bottom:18px}
.kage-pro .sectionTitle{font-size:24px;font-weight:800}.kage-pro .rail{grid-auto-columns:clamp(160px,14vw,208px);gap:16px}
.kage-pro .cover{border-radius:5px}.kage-pro .card:hover .cover{transform:translateY(-7px) scale(1.025)}
.kage-pro .title{font-size:13px}.kage-pro .small{font-size:11px}
.kage-pro .band{padding-block:4px}
.kage-pro .bottom{background:rgba(14,14,18,.94);border-radius:18px}
.kage-pro .bottom button{font-size:11px}
.kage-pro .kage-section-nav{display:flex;gap:8px;overflow:auto;padding:0 clamp(16px,4vw,64px) 4px;scrollbar-width:none}
.kage-pro .kage-section-nav::-webkit-scrollbar{display:none}
.kage-pro .kage-section-nav button{white-space:nowrap;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.035);color:#bcb8c0;border-radius:999px;padding:8px 13px;font-size:12px;font-weight:700}
.kage-pro .kage-section-nav button.active{background:#f47521;color:white;border-color:#f47521}
@media(max-width:600px){.kage-pro .hero{min-height:590px;padding-bottom:48px}.kage-pro .section{padding-top:30px}.kage-pro .rail{grid-auto-columns:145px}.kage-pro .sectionTitle{font-size:20px}}
`;
 const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
 const nav=document.querySelector('.links');
 if(nav&&!document.querySelector('.kage-section-nav')){
   const bar=document.createElement('div');bar.className='kage-section-nav';
   [['Popular','#/search?filter=popular'],['New Releases','#/search?filter=new'],['A–Z','#/search?filter=az'],['Simulcast','#/calendar'],['Genres','#/genres']].forEach(([label,href],i)=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>location.hash=href.slice(1);if(i===0)b.classList.add('active');bar.appendChild(b)});
   const main=document.querySelector('main'); if(main)main.parentNode.insertBefore(bar,main);
 }
})();
