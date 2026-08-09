'use client';
import {useEffect,useState} from 'react';import {AnimeCard} from '../../components/anime-card';import type {Anime} from '../../lib/jikan';
export default function MyList(){const[data,setData]=useState<Anime[]>([]);useEffect(()=>{try{setData(JSON.parse(localStorage.getItem('kevstream.my-list')||'[]'))}catch{}} ,[]);return <main className="section"><div className="eyebrow">Your Vault</div><h1>My List</h1>{data.length?<div className="grid">{data.map(a=><AnimeCard key={a.mal_id} anime={a}/>)}</div>:<div className="empty">Your saved anime will appear here.</div>}</main>}
