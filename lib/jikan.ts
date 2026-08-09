export type Anime = { mal_id:number; title:string; synopsis?:string|null; score?:number|null; rank?:number|null; episodes?:number|null; year?:number|null; type?:string|null; status?:string|null; images?:{jpg?:{image_url?:string;large_image_url?:string}}; genres?:{mal_id:number;name:string}[]; trailer?:{url?:string|null}; url?:string };

const BASE='https://api.jikan.moe/v4';
const memory=new Map<string,{at:number;data:unknown}>();

export async function jikan<T=Anime[]>(path:string, signal?:AbortSignal):Promise<T>{
  const cached=memory.get(path); if(cached && Date.now()-cached.at<60_000) return cached.data as T;
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),8000);
  const onAbort=()=>controller.abort(); signal?.addEventListener('abort',onAbort,{once:true});
  try{for(let attempt=0;attempt<3;attempt++){const res=await fetch(`${BASE}${path}`,{signal:controller.signal,headers:{accept:'application/json'},next:{revalidate:60}});if(res.status===429){await new Promise(r=>setTimeout(r,800*(attempt+1)));continue}if(!res.ok)throw new Error(`Jikan ${res.status}`);const body=await res.json();memory.set(path,{at:Date.now(),data:body.data});return body.data as T}throw new Error('Jikan rate limit')}finally{clearTimeout(timer);signal?.removeEventListener('abort',onAbort)}}

export const poster=(a:Anime)=>a.images?.jpg?.large_image_url||a.images?.jpg?.image_url||'';
