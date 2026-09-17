"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiBook,
  FiChevronDown,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import { navLinks } from "@/constant/site";
import { assets } from "@/assets";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { user, logout, setShowHotelReg } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Mobile Menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Mobile Menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  // Hotel action
  const handleHotelAction = () => {
    closeUserMenu();
    if (user?.role === "HOTEL_OWNER") {
      router.push("/dashboard");
      return;
    }
    setShowHotelReg(true);
  };

  const handleMobileHotelAction = () => {
    closeMobileMenu();
    if (user?.role === "HOTEL_OWNER") {
      router.push("/dashboard");
      return;
    }
    setShowHotelReg(true);
  };

  // Logout
  const handleLogout = () => {
    closeUserMenu();
    closeMobileMenu();
    logout();
  };

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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

  // Close menus with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full py-3 transition-all duration-500 bg-cream-bg/50 shadow-md backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => {
              closeMobileMenu();
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

          {/* DESKTOP NAV */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-text transition-colors duration-300 hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-3">
            {/* DESKTOP USER */}
            {user ? (
              <div
                ref={userMenuRef}
                className="relative hidden items-center gap-3 lg:flex"
              >
                {/* Dashboard / List Hotel */}
                <button
                  type="button"
                  onClick={handleHotelAction}
                  className={`flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${user.role === "HOTEL_OWNER" ? "bg-gray-100 text-text hover:bg-gray-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                >
                  {user.role === "HOTEL_OWNER" ? (
                    <FiSettings className="h-5 w-5" />
                  ) : (
                    <FiHome className="h-5 w-5" />
                  )}
                  <span>
                    {user.role === "HOTEL_OWNER"
                      ? "Dashboard"
                      : "List your Hotel"}
                  </span>
                </button>
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
                    {user.firstName}
                  </span>

                  {/* Avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.firstName}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser className="h-5 w-5 text-text-muted" />
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
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-text-muted">
                        {user.email}
                      </p>
                    </div>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={closeUserMenu}
                      className="flex items-center gap-3 px-4 py-3 font-medium text-text transition-colors hover:bg-blue-50 hover:text-primary"
                    >
                      <FiUser className="h-5 w-5" /> <span>Profile</span>
                    </Link>

                    <Link
                      href="/my-bookings"
                      role="menuitem"
                      onClick={closeUserMenu}
                      className="flex items-center gap-3 px-4 py-3 font-medium text-text transition-colors hover:bg-orange-50 hover:text-orange-600"
                    >
                      <FiBook className="h-5 w-5" />
                      <span>My Bookings</span>
                    </Link>

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
            ) : (
              // DESKTOP LOGIN
              <Link
                href="/login"
                className="hidden h-11 items-center justify-center rounded-full border border-primary bg-primary px-8 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark lg:flex"
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU BUTTON  */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-text transition-colors hover:bg-black/5 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY  */}
      <div
        aria-hidden="true"
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* MOBILE SIDEBAR  */}
      <aside
        aria-label="Mobile navigation"
        className={`fixed left-0 top-0 z-70 flex h-dvh w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/*  SIDEBAR HEADER  */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-3.5">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMobileMenu}
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
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-gray-100"
          >
            <FiX className="h-6 w-6" />
          </button>
          {/* Close */}
        </div>

        {/*  USER INFO - ONLY WHEN LOGGED IN  */}
        {user && (
          <div className="flex shrink-0 items-center gap-4 border-b border-gray-100 px-5 py-4">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.firstName}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser className="h-7 w-7 text-text-muted" />
              )}
            </div>
            {/* User info */}
            <div className="min-w-0">
              <p className="truncate font-semibold text-text">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-sm text-text-muted">{user.email}</p>
            </div>
          </div>
        )}

        {/*  MOBILE NAV  */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center rounded-xl px-4 py-3 font-medium text-text transition-colors hover:bg-blue-50 hover:text-primary"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logged-in Actions */}
        {user && (
          <div className="border-t border-gray-100 bg-white p-4">
            {/* Dashboard / List Hotel */}
            <button
              type="button"
              onClick={handleMobileHotelAction}
              className={`flex w-full items-center gap-3 px-4 py-3 font-medium transition-colors ${user.role === "HOTEL_OWNER" ? "bg-gray-50 text-text hover:bg-gray-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
            >
              {user.role === "HOTEL_OWNER" ? (
                <FiSettings className="h-5 w-5" />
              ) : (
                <FiHome className="h-5 w-5" />
              )}
              <span>
                {user.role === "HOTEL_OWNER" ? "Dashboard" : "List your Hotel"}
              </span>
            </button>
            {/* Profile */}
            <Link
              href="/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 border-t border-gray-100 px-4 py-3 font-medium text-text transition-colors hover:bg-blue-50 hover:text-primary"
            >
              <FiUser className="h-5 w-5" /> <span>Profile</span>
            </Link>
            {/* My Bookings */}
            <Link
              href="/my-bookings"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 border-t border-gray-100 px-4 py-3 font-medium text-text transition-colors hover:bg-orange-50 hover:text-orange-600"
            >
              <FiBook className="h-5 w-5" /> <span>My Bookings</span>
            </Link>
          </div>
        )}

        {/* MOBILE FOOTER ACTION */}
        <div className="border-t border-gray-100 bg-white p-4 pt-0">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-100"
            >
              <FiLogOut className="h-5 w-5" /> <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <FiLogIn className="h-5 w-5" /> <span>Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
