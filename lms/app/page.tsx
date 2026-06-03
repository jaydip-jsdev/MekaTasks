import HeroSection from "./components/HeroSection";
import FeaturedCoursesSection from "./components/FeaturedCoursesSection";
import CategoriesSection from "./components/CategoriesSection";
import StatsSection from "./components/StatsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";

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
