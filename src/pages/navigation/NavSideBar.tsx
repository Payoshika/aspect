import React from 'react';
import Settings from './Settings';
import aspectLogo from '../../assets/aspect-logo-primary.svg';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home03Icon, LicenseIcon, DeliveryTruck02Icon, Analytics01Icon } from '@hugeicons/core-free-icons';

const NavSideBar: React.FC = () => {
  const navMenuItems = [
    { name: 'Home', icon: <HugeiconsIcon icon={Home03Icon} /> },
    { name: 'Work', icon: <HugeiconsIcon icon={LicenseIcon} /> },
    { name: 'New Job', icon: <HugeiconsIcon icon={DeliveryTruck02Icon} /> },
    { name: 'Reports', icon: <HugeiconsIcon icon={Analytics01Icon} /> },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Section 1: Logo */}
      <div className="flex justify-center items-center px-4 py-6">
        <img 
          src={aspectLogo} 
          alt="Aspect Logo" 
          className="h-8 w-auto"
        />
      </div>

      {/* Section 2: Navigation Menu */}
      <div className="flex-1 px-2 py-4">
        <nav className="space-y-1 flex flex-col gap-4">
          {navMenuItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className="group flex flex-col px-4 py-2 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
                <div className="flex flex-col gap-2 lg:flex-row justify-center lg:justify-start items-center">
                    <span>{item.icon}</span>
                    {item.name}
                </div>
            </a>
          ))}
        </nav>
      </div>

      {/* Section 3: Settings */}
      <div className="hidden lg:block">
        <Settings />
      </div>
    </div>
  );
};

export default NavSideBar;
