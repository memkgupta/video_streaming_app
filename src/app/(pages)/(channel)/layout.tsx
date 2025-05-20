import StudioNavbar from '@/components/layout/StudioNavbar';
import StudioSideBar from '@/components/layout/StudioSideBar';
import React from 'react';

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen">
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <StudioNavbar />
      </div>

      {/* Fixed sidebar */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 border-r bg-muted">
        <StudioSideBar />
      </div>

      {/* Scrollable content */}
      <main className="pl-64 pt-16 h-full overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default ChannelLayout;
