import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";
import { ReactNode } from "react";
import { Providers } from "@/providers/provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuzul | Find Your Nuzul Away from Home",
  description:
    "Nuzul is your platform for booking unique homes and local experiences. Discover the perfect getaway and create unforgettable memories with Nuzul.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfair.variable} min-h-full flex flex-col text-zinc-950 antialiased`}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
