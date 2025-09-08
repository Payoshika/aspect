import React from "react";
import Settings from "./Settings";
import aspectLogo from "../../assets/aspect-logo-primary.svg";
import aspectLogoIcon from "../../assets/aspect-logo-icon.svg";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home03Icon,
  LicenseIcon,
  DeliveryTruck02Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
import { useLocation } from "react-router-dom";

const NavSideBar: React.FC = () => {
  const navMenuItems = [
    { name: "Home", path: "/home", icon: <HugeiconsIcon icon={Home03Icon} /> },
    { name: "Work", path: "/work", icon: <HugeiconsIcon icon={LicenseIcon} /> },
    {
      name: "New Job",
      path: "/new-job",
      icon: <HugeiconsIcon icon={DeliveryTruck02Icon} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <HugeiconsIcon icon={Analytics01Icon} />,
    },
  ];

  // Get current location
  const location = useLocation();

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Section 1: Logo */}
      <div className="flex justify-center items-center px-4 py-6">
        <img
          src={aspectLogo}
          alt="Aspect Logo"
          className="h-8 w-auto hidden lg:block"
        />
        <img
          src={aspectLogoIcon}
          alt="Aspect Logo Icon"
          className="h-8 w-auto lg:hidden bg-primary"
        />
      </div>

      {/* Section 2: Navigation Menu */}
      <div className="px-6 py-3 flex flex-col">
        <nav className="flex flex-col gap-4">
          {navMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`group flex flex-col px-6 py-4 rounded-xl
                  ${
                    isActive
                      ? "bg-accent text-primary font-semibold border-[1px]"
                      : "hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <div className="flex flex-col gap-2 lg:flex-row justify-center lg:justify-start items-center">
                  <span>{item.icon}</span>
                  {item.name}
                </div>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Section 3: Settings */}
      <div className="hidden lg:flex flex-col flex-1 justify-end">
        <Settings />
      </div>
    </div>
  );
};

export default NavSideBar;
