import { Hero } from "@/components/sections/Hero";
import { FindVenue } from "@/components/sections/FindVenue";
import { TrendingVenues } from "@/components/sections/TrendingVenues";
import { SportCategories } from "@/components/sections/SportCategories";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { DownloadApp } from "@/components/sections/DownloadApp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FindVenue />
      <TrendingVenues />
      <SportCategories />
      <Pricing />
      <Testimonials />
      <DownloadApp />
    </>
  );
}
