import React, { useState } from "react";
import MobileSideBar from "./MobileSideBar";
import navHeaderBackground from "../../assets/navheader-background.jpeg";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  Settings01Icon,
  SquareUnlock02Icon,
  UserSquareIcon,
} from "@hugeicons/core-free-icons";
import { useLocation } from "react-router-dom";

const NavHeader: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const getTitleFromPath = (path: string) => {
    const map: Record<string, string> = {
      "/invoice": "Invoices",
      "/billing": "Billing",
      "/new-job": "New Jobs",
      "/reports": "Reports",
      "/new-job/": "New Jobs",
      "/": "Home",
      "/home": "Home",
    };
    if (map[path]) return map[path];
    const seg = path.split("/").filter(Boolean)[0];
    if (!seg) return "Home";
    return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <div
      className="w-full flex items-center justify-between px-4 bg-cover bg-center bg-no-repeat h-[10vh] md:h-[15vh]"
      style={{ backgroundImage: `url(${navHeaderBackground})` }}
    >
      <span className="text-2xl font-bold text-accent drop-shadow-md shadow-black">
        {title}
      </span>

      {/* Mobile Sidebar - only visible on screens smaller than lg */}
      <div className="lg:hidden">
        <MobileSideBar />
      </div>

      {/* Desktop Icons - only visible on lg and larger screens */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Settings Icon */}
        <button
          className="p-2 rounded-full border border-white bg-light-grey"
          aria-label="Settings"
        >
          <span className="text-lg">
            <HugeiconsIcon icon={Settings01Icon} />
          </span>
        </button>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="p-2 rounded-full border border-white bg-light-grey"
            aria-label="Profile"
          >
            <span className="text-lg">
              <HugeiconsIcon icon={UserIcon} />
            </span>
          </button>

          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md z-50">
              <a
                href="#"
                className="flex flex-nowrap justify-end gap-2 px-4 py-2 hover:bg-gray-50 rounded-md"
              >
                Profile
                <HugeiconsIcon icon={UserSquareIcon} />
              </a>
              <a
                href="#"
                className="flex flex-nowrap justify-end gap-2 px-4 py-2 hover:bg-gray-50 rounded-md"
              >
                Log-out
                <HugeiconsIcon icon={SquareUnlock02Icon} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Overlay - transparent to close menu when clicking elsewhere */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={closeUserMenu} />
      )}
    </div>
  );
};

export default NavHeader;
