import Image from "next/image";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Featured from "./components/Featured/Featured";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import CTA from "./components/CTA/CTA";

const HomePage = () => {
  return (
    <div className="">
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
