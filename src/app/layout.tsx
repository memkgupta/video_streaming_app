
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/AppSidebar";
import Logo from "@/components/ui/logo";
import Navbar from "@/components/layout/Navbar";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import ClientLayout from "@/components/layout/ClientLayout";
import { Toaster } from "sonner";
import { ChannelContextProvider } from "@/context/ChannelContext";
import { QueryClientContext, QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import { UploadVideoContextProvider } from "@/context/UploadVideoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
  <AuthProvider>
        
   <Toaster/>
<ChannelContextProvider>
<UploadVideoContextProvider>
  {children}
</UploadVideoContextProvider>



</ChannelContextProvider>
       
       
 

       
         </AuthProvider>
    
       
       
      </body>
    </html>
  );
}
