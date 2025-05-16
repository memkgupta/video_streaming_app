"use client"
import React from 'react'
import { Menu, Video, Bell, MenuIcon } from 'lucide-react';
import SearchBar from '@/components/ui/search';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Logo from '../ui/logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AccountDropDownMenu from '../features/account/AccountDropDownMenu';

const NavbarClientWrapper = () => {
  const {isAuthenticated,user} = useAuth()
  const pathName = usePathname()
 return (
    <header className="w-full px-4 py-2  shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">

        {/* Left - Hamburger + Logo */}
        <div className="flex items-center gap-4 w-[200px] min-w-[150px]">
             <SidebarTrigger>
            
             </SidebarTrigger>
           <Logo/>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl px-4 hidden sm:flex">
          <SearchBar />
        </div>

        {/* Right - Icons */}
        {isAuthenticated?
        (
          <div className="flex items-center gap-3 ml-4">
          {/* Mic for mobile (below sm) */}
          <div className="sm:hidden p-2 rounded-full hover:bg-gray-100">
            <SearchBar />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Video className="w-5 h-5" />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Avatar */}
        {user && <AccountDropDownMenu user={user}/>}
        </div>
        ):
        <Button variant="outline" className="" asChild>
                <Link href={`/login?next=${pathName}`}>Sign In</Link>
              </Button>}
        
      </div>
    </header>
  );
}

export default NavbarClientWrapper