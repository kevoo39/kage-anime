import {NextRequest,NextResponse} from 'next/server';

export const runtime='nodejs';
const BASE='https://api.jikan.moe/v4';
const cache=new Map<string,{at:number;body:unknown}>();

export async function GET(req:NextRequest,{params}:{params:Promise<{path:string[]}>}){
 const {path}=await params; const qs=req.nextUrl.search; const key='/'+path.join('/')+qs; const hit=cache.get(key); if(hit&&Date.now()-hit.at<60_000)return NextResponse.json({data:hit.body});
 const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),8000);
 try{for(let attempt=0;attempt<3;attempt++){const r=await fetch(BASE+key,{headers:{accept:'application/json'},cache:'no-store',signal:controller.signal});if(r.status===429){await new Promise(x=>setTimeout(x,900*(attempt+1)));continue}if(!r.ok)return NextResponse.json({error:`Jikan request failed (${r.status})`},{status:r.status});const body=await r.json();cache.set(key,{at:Date.now(),body:body.data});return NextResponse.json({data:body.data},{headers:{'Cache-Control':'public, s-maxage=60, stale-while-revalidate=300'}})}return NextResponse.json({error:'Rate limited. Please retry.'},{status:429})}catch(e){return NextResponse.json({error:'Anime service temporarily unavailable.'},{status:503})}finally{clearTimeout(timer)}}
