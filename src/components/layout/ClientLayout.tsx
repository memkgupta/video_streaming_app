"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Navbar from "@/components/layout/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const isAuthPage = pathName === "/login" || pathName === "/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider className="w-full">
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="w-full flex">
          <AppSidebar />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
