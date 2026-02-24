import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FindVenue } from "@/components/sections/FindVenue";
import { TrendingVenues } from "@/components/sections/TrendingVenues";
import { Players } from "@/components/sections/Players";
import { Events } from "@/components/sections/Events";
import { SportCategories } from "@/components/sections/SportCategories";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { DownloadApp } from "@/components/sections/DownloadApp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FindVenue />
      <ServicesOverview />
      <TrendingVenues />
      <Players />
      <Events />
      <SportCategories />
      <Pricing />
      <Testimonials />
      <DownloadApp />
    </>
  );
}
