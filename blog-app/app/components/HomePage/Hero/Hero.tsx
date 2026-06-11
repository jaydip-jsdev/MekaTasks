import Image from "next/image";
import "./Hero.css";
import Link from "next/link";
import { btns } from "./HeroConst";

const Hero = () => {
  return (
    <main className="hero">
      <div className="left-side-hero">
        <p className="hero-title">Stories That inspire.</p>
        <p className="hero-title">Knowledge that empowers</p>
        <div className="hero-actions">
          {btns.map((btn) => {
            return (
              <Link key={btn.link} href={btn.link}>
                <button>{btn.text}</button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="right-side-hero">
        <Image alt="hero" src={"/hero.webp"} width={300} height={140} />
      </div>
    </main>
  );
};

export default Hero;
