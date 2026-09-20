"use client";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import CreateHotelForm from "@/features/hotels/components/CreateHotelForm";
import { useAppContext } from "@/context/AppContext";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOwnerPath = pathname.includes("dashboard");
  const { showHotelReg } = useAppContext();
  return (
    <>
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <CreateHotelForm />}
      {children}
      {!isOwnerPath && <Footer />}
    </>
  );
}
