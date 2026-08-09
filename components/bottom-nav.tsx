'use client';
import Link from 'next/link';import {Home,Search,Download,Tags,Menu} from 'lucide-react';
const items=[['/','Home',Home],['/search','Search',Search],['/downloads','Vault',Download],['/genres','Genres',Tags],['/more','More',Menu]] as const;
export function BottomNav(){return <nav className="bottomNav">{items.map(([href,label,Icon])=><Link href={href} key={href}><Icon size={18}/><span>{label}</span></Link>)}</nav>}
