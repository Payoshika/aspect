import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home03Icon, LicenseIcon, DeliveryTruck02Icon, Analytics01Icon } from '@hugeicons/core-free-icons';

const MobileMainNav: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <HugeiconsIcon icon={Home03Icon} /> },
    { name: 'Work', icon: <HugeiconsIcon icon={LicenseIcon} /> },
    { name: 'New Job', icon: <HugeiconsIcon icon={DeliveryTruck02Icon} /> },
    { name: 'Reports', icon: <HugeiconsIcon icon={Analytics01Icon} /> },
  ];

  return (
    <nav className="px-4 flex justify-center bg-black">
      <div className="flex justify-around items-center w-95vw bg-white rounded-t-md">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex flex-col items-center py-2 px-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileMainNav;
