import SelectionFeatures from "@/components/home/Features";
import SectionHero from "@/components/home/Hero";
import SectionCTA from "@/components/home/SectionCTA";
import SectionPricing from "@/components/home/SectionPricing";
import SectionTestimonials from "@/components/home/SectionTestimonials";
import SectionWhoIsItFor from "@/components/home/SectionWhoIsItFor";

// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <SectionHero />
      <SelectionFeatures />
      <SectionPricing />
      <SectionWhoIsItFor />
      <SectionTestimonials />
      <SectionCTA />
    </main>
  );
}
