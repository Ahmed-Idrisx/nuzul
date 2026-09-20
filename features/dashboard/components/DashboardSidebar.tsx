"use client";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlusSquare, FiSettings, FiList } from "react-icons/fi";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { user } = useAppContext();

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Add Room", href: "/dashboard/add-room", icon: FiPlusSquare },
    { name: "Manage Rooms", href: "/dashboard/manage-rooms", icon: FiSettings },
    { name: "Bookings", href: "/dashboard/bookings", icon: FiList },
  ];

  return (
    <div className="fixed left-0 top-17.5 z-40 inline-flex h-[calc(100vh-70px)] flex-col gap-5 overflow-hidden border-r border-slate-200 bg-cream-bg sm:min-w-60">
      <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
        {user?.hotel?.image ? (
          <Image
            src={user.hotel?.image}
            alt={user.hotel.image}
            width={80}
            height={80}
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <FiHome className="h-5 w-5 text-text-muted" />
        )}
        <p className="text-text">Hi, {user?.hotel?.name ?? "Admin"}</p>
      </div>

      <div className="max-sm:mt-6">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`relative flex items-center gap-3 hover:bg-white p-2.5 transition ${
              pathname === link.href ? "bg-white text-text" : "text-text-muted"
            }`}
          >
            <link.icon size={18} className="sm:ml-5" />
            <p className="max-sm:hidden">{link.name}</p>
            {pathname === link.href && (
              <span className="absolute bg-primary right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
