"use client";

import Link from "next/link";
import { FiChevronDown, FiHome, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets";

export default function DashboardNavbar() {
  const { user, logout } = useAppContext();
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };
  // User Menu
  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };
  // Logout
  const handleLogout = () => {
    closeUserMenu();
    logout();
  };
  // Close dropdown on outside click
  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);
  return (
    <header className="fixed top-0 z-50 left-0 w-full bg-cream-bg shadow-md">
      <div className="flex items-center justify-between gap-4 px-2 py-3 sm:px-12 sm:py-3">
        {/* LOGO */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => {
            closeUserMenu();
          }}
          aria-label="Nuzul home"
        >
          <Image
            src={assets.logo}
            alt="Nuzul"
            width={120}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>
        {/* ACTIONS */}

        <div ref={userMenuRef} className="relative">
          {/* User Button */}
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            onClick={toggleUserMenu}
            className="flex h-11 items-center gap-2 rounded-full border border-primary bg-white px-2 transition-all duration-200 hover:border-primary-dark hover:shadow-sm"
          >
            {/* Chevron */}
            <FiChevronDown
              className={`h-4 w-4 text-text-muted transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
            {/* Name */}
            <span className="max-w-20 truncate px-1 text-sm font-medium text-text">
              {user?.hotel?.name}
            </span>

            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {user?.hotel?.image ? (
                <Image
                  src={user.hotel?.image}
                  alt={user.firstName}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiHome className="h-5 w-5 text-text-muted" />
              )}
            </div>
          </button>

          {/* DESKTOP USER DROPDOWN */}
          {isUserMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+15px)] z-50 w-55 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
            >
              {/* User info */}
              <div className="border-b border-gray-100 px-5 py-4">
                <p className="text-xs text-text-muted">Welcome back!</p>
                <p className="mt-1 truncate text-sm font-semibold text-text">
                  {user?.hotel?.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-text-muted">
                  {user?.email}
                </p>
              </div>
              {/* Logout */}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <FiLogOut className="h-5 w-5" /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
