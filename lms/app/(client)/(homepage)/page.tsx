import CategoriesSection from "@/app/components/CategoriesSection";
import FeaturedCoursesSection from "@/app/components/FeaturedCoursesSection";
import HeroSection from "@/app/components/HeroSection";
import StatsSection from "@/app/components/StatsSection";
import WhyChooseUsSection from "@/app/components/WhyChooseUsSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCoursesSection />
      <CategoriesSection />
      <StatsSection />
      <WhyChooseUsSection />
    </>
  );
}
