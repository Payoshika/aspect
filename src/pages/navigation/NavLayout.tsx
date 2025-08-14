import React from 'react';
import NavSideBar from './NavSideBar';
import NavHeader from './NavHeader';
import MobileMainNav from './MobileMainNav';

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* NavSideBar - only visible on md+ screens, takes precedence */}
      <div className="hidden md:block w-64">
        <NavSideBar />
      </div>
      
      {/* Main content area - includes header and content */}
      <div className="flex-1 flex flex-col">
        {/* NavHeader - spans full width on mobile, but only content area on md+ */}
        <NavHeader />
        
        {/* Main content area */}
        <main className="flex-1 flex flex-col">
          {/* Page content */}
          <div className="flex-1">
            {children}
          </div>
          
          {/* MobileMainNav - only visible on mobile at bottom */}
          <div className="md:hidden flex-shrink-0">
            <MobileMainNav />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NavLayout;
