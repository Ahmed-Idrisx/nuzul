import Hero from "@/components/home/components/Hero";
import Mood from "@/components/home/components/Mood";
import RecommendedHotels from "@/components/home/components/RecommendedHotels";
import Stories from "@/components/home/components/Stories";
import FAQ from "@/components/home/components/FAQ";
import GetApp from "@/components/home/components/GetApp";
import Contact from "@/components/home/components/Contact";

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
