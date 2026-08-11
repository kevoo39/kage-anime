'use client';
import Link from 'next/link';import {Home,Search,Heart,CalendarDays,UserCircle} from 'lucide-react';
const items=[['/','Home',Home],['/search','Browse',Search],['/my-list','My List',Heart],['/calendar','Schedule',CalendarDays],['/profiles','Profile',UserCircle]] as const;
export function BottomNav(){return <nav className="bottomNav" aria-label="Mobile navigation">{items.map(([href,label,Icon])=><Link href={href} key={href}><Icon size={18}/><span>{label}</span></Link>)}</nav>}
