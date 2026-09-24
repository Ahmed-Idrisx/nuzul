import type { Metadata } from "next";

import {
  Contact,
  FAQ,
  GetApp,
  Hero,
  Mood,
  RecommendedHotels,
  Stories,
} from "@/features/home";

export const metadata: Metadata = {
  title: "Nuzul | Find your next stay",
  description:
    "Discover beautiful stays, unique hotels, and memorable getaways with Nuzul.",
};

export default function page() {
  return (
    <>
      <Hero />
      <Mood />
      <RecommendedHotels />
      <Stories />
      <FAQ />
      <GetApp />
      <Contact />
    </>
  );
}
