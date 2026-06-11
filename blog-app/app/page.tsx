import Navbar from "./components/global/Navbar/Navbar";
import Hero from "./components/HomePage/Hero/Hero";
import Featured from "./components/HomePage/Featured/Featured";
import Container from "./components/reusable/Container/Container";
import Footer from "./components/global/Footer/Footer";
import CTA from "./components/HomePage/CTA/CTA";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Hero />
        <Featured />
        <CTA />
        <Footer />
      </Container>
    </div>
  );
};

export default HomePage;
