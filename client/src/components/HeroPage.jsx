import NavBar from "./Navbar";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroPage() {
  // animaiton

  useGSAP(() => {
    gsap.from("#navText > li", {
      y: -20,
      opacity: 0,
      stagger: 0.2,
    });
    gsap.from("#logo", {
      y: -20,
      opacity: 0,
    });

    gsap.from("#heading1", {
      y: 160,
      opacity: 0,
      duration: 0.5,
      scale: 0.2,
      // duration: 1,
    });
    gsap.from("#heading2", {
      y: 160,
      opacity: 0,
      duration: 0.5,
      scale: 0.2,
      // duration: 1,
    });
  });

  /////////////////////////////////

  return (
    <>
      <div className="bg-img relative"></div>
      <NavBar />

      <h1
        id="heading1"
        className="absolute lg:top-[12vw] lg:left-[25vw] left-[11vw] lg:text-[10.5vw] text-[16vw] text-white top-[15rem] z-0"
      >
        BE YOUR <span className="text-yellow-400">BEST</span>
      </h1>
      <h1
        id="heading2"
        className="absolute lg:top-[21.5vw] lg:left-[24vw] left-[10vw] lg:text-[10.5vw] text-[16vw] top-[18.3rem] text-white scale-y-[-1] skew-x-[-10deg] opacity-45"
      >
        BE YOUR <span className="text-yellow-400">BEST</span>
      </h1>
    </>
  );
}
