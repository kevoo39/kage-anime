import type { Metadata, Viewport } from 'next';
import './globals.css';
import {BottomNav} from '../components/bottom-nav';
import {TopNav} from '../components/top-nav';

export const metadata: Metadata = {title:'KevStream — Anime Streaming',description:'KevStream is an installable anime experience for discovery, licensed playback, saved titles and offline vault management.',manifest:'/manifest.webmanifest',icons:{icon:'/icon-512.png',apple:'/apple-touch-icon.png'},openGraph:{title:'KevStream',description:'Anime discovery and playback experience.'},twitter:{card:'summary_large_image',title:'KevStream',description:'Anime discovery and playback experience.'}};
export const viewport: Viewport={themeColor:'#0f0a14',colorScheme:'dark'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><div className="appShell"><TopNav/>{children}<BottomNav/></div><script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator && location.hostname!=='localhost'){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}`}}/></body></html>}
