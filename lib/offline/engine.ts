export type DownloadJob={id:string;title:string;episode:number;audio:'sub'|'dub';quality:string;status:'queued'|'downloading'|'paused'|'completed'|'error';progress:number;url?:string;createdAt:number};
const KEY='kevstream.downloads';const read=():DownloadJob[]=>{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};const write=(x:DownloadJob[])=>localStorage.setItem(KEY,JSON.stringify(x));
export async function requestPersistentStorage(){return typeof navigator!=='undefined'&&(navigator.storage?.persist?await navigator.storage.persist():false)}
export function enqueueDownload(input:Omit<DownloadJob,'id'|'status'|'progress'|'createdAt'>){const job:DownloadJob={...input,id:crypto.randomUUID(),status:'queued',progress:0,createdAt:Date.now()};write([...read(),job]);return job}
export function updateDownload(id:string,patch:Partial<DownloadJob>){const jobs=read().map(j=>j.id===id?{...j,...patch}:j);write(jobs);return jobs.find(j=>j.id===id)}
export function deleteDownload(id:string){write(read().filter(j=>j.id!==id))}
export async function exportAuthorizedFile(blob:Blob,name:string){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
