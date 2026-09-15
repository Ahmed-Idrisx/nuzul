"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import { navLinks } from "@/constant/site";
import { assets } from "@/assets";
import { useUserContext } from "@/context/UserContext";

const Header = () => {
  const { user, logout } = useUserContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full py-3 transition-all duration-500 bg-cream-bg/50 shadow-md backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMobileMenu}
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
                    className="font-medium transition-colors duration-300 hover:text-primary text-text"
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
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  onClick={toggleUserMenu}
                  className="cursor-pointer flex h-11 items-center gap-2 rounded-full border border-primary bg-white px-2 transition-all hover:border-primary-dark hover:shadow-sm"
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
                    className="absolute right-0 top-[calc(100%+15px)] z-50 w-55 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                  >
                    {/* User info */}
                    <div className="border-b border-gray-100 px-5 py-4">
                      <p className="text-xs text-text-muted">Welcome back!</p>

                      <p className="mt-1 text-sm font-semibold text-text">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 bg-blue-50 px-4 py-3 font-medium text-primary transition-colors hover:bg-blue-100"
                    >
                      <FiSettings className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 bg-red-50 px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-100"
                    >
                      <FiLogOut className="h-5 w-5" />

                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // DESKTOP LOGIN
              <Link
                href="/login"
                className="hidden h-12 items-center justify-center rounded-full bg-primary border border-primary px-10 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark lg:flex"
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU BUTTON  */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="open menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-text lg:hidden"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY  */}
      <div
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      {/* MOBILE SIDEBAR  */}
      <aside
        className={`fixed left-0 top-0 z-70 flex h-dvh w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-72"}`}
      >
        {/*  SIDEBAR HEADER  */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-3.5">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMobileMenu}
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
            aria-label="close menu"
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
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser className="h-7 w-7 text-text-muted" />
              )}
            </div>

            {/* User info */}
            <div className="min-w-0">
              <p className="font-semibold text-text">{user.firstName}</p>

              <p className="text-sm text-text-muted">{user.email}</p>
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
                  className="flex items-center rounded-lg px-4 py-3 font-medium transition-colors text-text hover:text-primary hover:bg-blue-50"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Profile - Only logged in */}
        {user && (
          <div className="bg-white p-4 border-t border-gray-100">
            <Link
              href="/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 font-medium text-primary transition-colors hover:bg-blue-100"
            >
              <FiSettings className="h-5 w-5" />

              <span>Profile</span>
            </Link>
          </div>
        )}

        {/* MOBILE FOOTER ACTION */}
        <div className="bg-white p-4 pt-0">
          {user ? (
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                logout();
              }}
              className="w-full flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-100"
            >
              <FiLogOut className="h-5 w-5" />

              <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="w-full flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <FiLogIn className="h-5 w-5" />

              <span>Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
