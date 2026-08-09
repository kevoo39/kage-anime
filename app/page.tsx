'use client';

import Image from 'next/image';
import {useEffect,useState} from 'react';
import type {Anime} from '../lib/jikan';
import {poster} from '../lib/jikan';
import VideoStudio from '../components/video-studio';

const sections=[['Trending','/top/anime?limit=12'],['Top Rated','/top/anime?filter=bypopularity&limit=12'],['Airing Now','/anime?status=airing&order_by=score&sort=desc&limit=12'],['Upcoming','/seasons/upcoming?limit=12']];

function Card({a,onOpen}:{a:Anime;onOpen:(a:Anime)=>void}){return <button className="card" onClick={()=>onOpen(a)}><div className="poster"><Image src={poster(a)} alt="" fill sizes="(max-width:720px) 145px, 170px"/><span className="score">★ {a.score??'—'}</span></div><div className="cardBody"><div className="title">{a.title}</div><div className="meta">{a.type||'Anime'} · {a.episodes??'?'} eps</div></div></button>}
function Skeletons(){return <div className="rail">{Array.from({length:7},(_,i)=><div className="skeleton skeletonCard" key={i}/>)}</div>}

export default function Home(){
 const [data,setData]=useState<Record<string,Anime[]>>({}); const [hero,setHero]=useState<Anime|null>(null); const [loading,setLoading]=useState<Record<string,boolean>>({}); const [errors,setErrors]=useState<Record<string,string>>({}); const [query,setQuery]=useState(''); const [search,setSearch]=useState<Anime[]|null>(null); const [selected,setSelected]=useState<Anime|null>(null);
 const load=async(name:string,path:string)=>{setLoading(x=>({...x,[name]:true}));setErrors(x=>({...x,[name]:''}));try{const r=await fetch('/api/jikan'+path);if(!r.ok)throw new Error('Request failed');const d=await r.json();setData(x=>({...x,[name]:d.data||[]}));if(name==='Trending')setHero(d.data?.[0]||null)}catch(e){setErrors(x=>({...x,[name]:'This section could not load. Retry.'}))}finally{setLoading(x=>({...x,[name]:false}))}};
 useEffect(()=>{sections.forEach(([n,p])=>load(n,p));},[]);
 const doSearch=async()=>{if(!query.trim())return;setSearch(null);try{const r=await fetch('/api/jikan/anime?q='+encodeURIComponent(query.trim())+'&limit=24');if(!r.ok)throw new Error();setSearch((await r.json()).data||[])}catch{setErrors(x=>({...x,search:'Search failed. Please try again.'}))}};
 return <div className="shell"><nav className="nav"><b className="logo">KAGE</b><div className="navlinks"><button onClick={()=>scrollTo(0,0)}>Home</button><button onClick={()=>document.getElementById('browse')?.scrollIntoView()}>Browse</button><button onClick={()=>document.getElementById('schedule')?.scrollIntoView()}>Schedule</button><button onClick={()=>document.getElementById('ai-studio')?.scrollIntoView()}>AI Studio</button></div><form className="search" onSubmit={e=>{e.preventDefault();doSearch()}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search anime…"/><button>⌕</button></form></nav>
 {hero&&<section className="hero" style={{backgroundImage:`url(${poster(hero)})`}}><div className="heroCopy"><div className="eyebrow">Featured</div><h1>{hero.title}</h1><div className="stats"><span>★ <b>{hero.score??'—'}</b></span><span>{hero.type||'TV'}</span><span>{hero.episodes??'?'} episodes</span><span>{hero.year??'—'}</span></div><p>{hero.synopsis?.slice(0,340)||'Discover your next favorite anime.'}</p><div className="actions"><button className="primary" onClick={()=>setSelected(hero)}>View details</button></div></div></section>}
 {!hero&&<section className="hero"><div className="heroCopy"><div className="eyebrow">KAGE</div><h1>Your anime, organized.</h1><p>Loading the catalog in independent sections so one API request never blocks the whole experience.</p></div></section>}
 {search&&<section className="section" id="browse"><div className="sectionHead"><h2>Search results</h2><span className="muted">{search.length} results</span></div><div className="grid">{search.map(a=><Card key={a.mal_id} a={a} onOpen={setSelected}/>)}</div></section>}
 {sections.map(([name,path])=><section className="section" key={name}><div className="sectionHead"><h2>{name}</h2><span className="muted">Live catalog</span></div>{loading[name]&&!data[name]&&<Skeletons/>}{errors[name]?<div className="errorBox">{errors[name]} <button className="secondary" onClick={()=>load(name,path)}>Retry</button></div>:data[name]&&<div className="rail">{data[name].map(a=><Card key={a.mal_id} a={a} onOpen={setSelected}/>)}</div>}</section>)}
 <section className="section" id="browse"><div className="sectionHead"><h2>Browse</h2><span className="muted">Search above for any title</span></div><div className="empty">Use the search bar to find anime, then open any result for details.</div></section>
 <VideoStudio />
 <section className="section" id="schedule"><div className="sectionHead"><h2>Schedule</h2></div><div className="empty">Weekly broadcast schedule is ready for the next data-layer phase.</div></section>
 <footer className="footer">KAGE · Anime discovery powered by Jikan. KAGE does not provide unauthorized streaming.</footer>
 {selected&&<Detail a={selected} onClose={()=>setSelected(null)}/>}</div>
}

function Detail({a,onClose}:{a:Anime;onClose:()=>void}){const [full,setFull]=useState<Anime|null>(null);useEffect(()=>{fetch('/api/jikan/anime/'+a.mal_id+'/full').then(r=>r.json()).then(x=>setFull(x.data)).catch(()=>setFull(a))},[a]);const d=full||a;return <div className="dialogBack" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="dialog"><button className="close" onClick={onClose}>×</button><div className="detail"><Image src={poster(d)} alt="" width={220} height={330}/><div><div className="eyebrow">{d.type||'Anime'} · {d.status||''}</div><h1>{d.title}</h1><div className="stats"><span>★ <b>{d.score??'—'}</b></span><span>Rank #{d.rank??'—'}</span><span>{d.episodes??'?'} episodes</span></div><div className="chips">{d.genres?.map(g=><span className="chip" key={g.mal_id}>{g.name}</span>)}</div><p>{d.synopsis||'No synopsis available.'}</p><div className="actions"><button className="primary" onClick={()=>d.url&&window.open(d.url,'_blank')}>Open MAL</button>{d.trailer?.url&&<button className="secondary" onClick={()=>window.open(d.trailer?.url||'','_blank')}>Trailer</button>}</div></div></div></div></div>}
