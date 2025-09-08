import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home03Icon,
  LicenseIcon,
  DeliveryTruck02Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
import { useLocation } from "react-router-dom";

const MobileMainNav: React.FC = () => {
  const menuItems = [
    { name: "Home", path: "/", icon: <HugeiconsIcon icon={Home03Icon} /> },
    { name: "Work", path: "/", icon: <HugeiconsIcon icon={LicenseIcon} /> },
    {
      name: "New Job",
      path: "/new-job",
      icon: <HugeiconsIcon icon={DeliveryTruck02Icon} />,
    },
    {
      name: "Reports",
      path: "/",
      icon: <HugeiconsIcon icon={Analytics01Icon} />,
    },
  ];

  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 px-4 flex justify-center z-50">
      <div className="flex justify-around items-center min-w-[95vw] bg-white rounded-t-md shadow-md">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <a
              key={item.name}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center py-2 px-6 transition-colors duration-200 rounded-t-md ${
                isActive
                  ? "bg-accent text-primary font-semibold border-[1px]"
                  : "hover:text-gray-900"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileMainNav;
