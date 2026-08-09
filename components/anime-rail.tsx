import type {Anime} from '../lib/jikan';import {AnimeCard} from './anime-card';
export function AnimeRail({title,items}:{title:string;items:Anime[]}){return <section className="section"><div className="sectionHead"><h2>{title}</h2><span className="muted">{items.length} titles</span></div><div className="rail">{items.map(a=><AnimeCard key={a.mal_id} anime={a}/>)}</div></section>}
