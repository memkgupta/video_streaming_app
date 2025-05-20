"use client"
import { BarChart3, LayoutDashboard, MessageSquare, Settings, Users, Video } from 'lucide-react';
import React from 'react'
import { Sidebar, SidebarContent } from '../ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const StudioSideBar = () => {
    const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/studio" },
  { label: "Content", icon: Video, href: "/studio/content" },
  { label: "Analytics", icon: BarChart3, href: "/studio/analytics" },
  { label: "Comments", icon: MessageSquare, href: "/studio/comments" },
 
  { label: "Settings", icon: Settings, href: "/studio/settings" },
];
const pathname = usePathname()

  return (
  <aside className="h-screen w-64 border-r bg-muted p-4 flex flex-col mt-12  ">
      <div className='mt-12 flex flex-col gap-y-4 items-center'>
        <img src={"https://yt3.ggpht.com/vc2YL1vNRQB58-9otMFJXUN4OmCrOx64HDsn2O11BmvOz63GNsl0ke0kYluutSC4qxZWFAkO=s600-c-k-c0x00ffffff-no-rj-rp-mo"} height={100} width={100} alt='Channel' className='rounded-full'/>
     <p>Your Channel</p>
      </div>
      <nav className="space-y-2 mt-4">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10",
              pathname === href ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default StudioSideBar