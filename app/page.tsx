import { assets } from "@/assets";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen">
      <Image src={assets.hero} alt="Hero" className="w-full h-full" />
    </div>
  );
}
