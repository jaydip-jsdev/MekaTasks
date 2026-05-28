import Image from "next/image";
import React from "react";
import "./Hero.css";
import Link from "next/link";

const Hero = () => {
  return (
    <main className="hero">
      <div className="left-side-hero">
        <p className="hero-title">Stories That inspire.</p>
        <p className="hero-title">Knowledge that empowers</p>
        <div className="hero-actions">
          <Link href={"/blogs"}>
            <button>Explore</button>
          </Link>
          <Link href={"/add"}>
            <button>Add</button>
          </Link>
        </div>
      </div>
      <div className="right-side-hero">
        <Image alt="hero" src={"/hero.webp"} width={300} height={140} />
      </div>
    </main>
  );
};

export default Hero;
