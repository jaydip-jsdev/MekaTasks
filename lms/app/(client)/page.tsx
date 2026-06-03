import CategoriesSection from "../components/CategoriesSection";
import FeaturedCoursesSection from "../components/FeaturedCoursesSection";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";

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
