"use client";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/ui/Spinner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, isLoading } = useAppContext();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return <Spinner />;
  }

  if (user?.role !== "HOTEL_OWNER") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 bg-white">
        <h1 className="text-2xl sm:text-4xl font-semibold text-text-muted">
          You are not authorized to access this page
        </h1>
        <Link
          href="/"
          className="bg-primary-dark text-white flex items-center gap-2 mt-8 py-2 px-6 max-sm:text-sm rounded-full hover:bg-slate-800 transition"
        >
          Go to home <FiArrowRight size={18} />
        </Link>
      </div>
    );
  }
  return (
    <>
      <DashboardNavbar />
      <div className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
        <DashboardSidebar />
        <div className="ml-16 h-full min-w-0 overflow-y-auto p-5 sm:ml-60 lg:pl-12 lg:pt-12">
          {children}
        </div>
      </div>
    </>
  );
}
