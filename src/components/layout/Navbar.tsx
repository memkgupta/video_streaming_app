// components/Navbar.tsx
"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { Menu, Video, Bell } from 'lucide-react';
import SearchBar from '@/components/ui/search';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Logo from '../ui/logo';
import NavbarClientWrapper from '../wrappers/NavbarClientWrapper';
const Navbar: React.FC = () => {
    
 return <NavbarClientWrapper/>
};

export default Navbar;
