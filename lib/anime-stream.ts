export type AudioType='sub'|'dub';export type StreamSource={url:string;referer?:string;type:'hls'|'mp4';tracks?:{label:string;url:string;kind:'subtitles'}[]};
export function isAuthorizedSource(url:string){try{const u=new URL(url);return u.protocol==='https:'&&['.m3u8','.mp4'].some(ext=>u.pathname.toLowerCase().includes(ext))}catch{return false}}
export function validateStreamSource(source:StreamSource){if(!isAuthorizedSource(source.url))throw new Error('Only HTTPS HLS/MP4 sources supplied by an authorized provider are supported.');return source}
