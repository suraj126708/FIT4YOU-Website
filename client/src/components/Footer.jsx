import Logo from "../images/fit4you.png";
// import Gmap from "./Gmap";
import NavbarAnchor from "./SmallComponents/NavbarAnchor";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MapsDirect from "./MapsDirect";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ bg }) {
  // Animation
  useGSAP(() => {
    gsap.from("#f1", {
      x: -80,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#footer",
        scroller: "body",
        start: "top 50%",
        end: "top 10%",
        scrub: 2,
      },
    });

    gsap.from("#f2", {
      x: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: {
        trigger: "#footer",
        scroller: "body",
        start: "top 50%",
        end: "top 10%",
        scrub: 2,
      },
    });
  });

  return (
    <div
      id="footer"
      className={`flex flex-col lg:flex-row lg:justify-around lg:items-center min-h-[100vh] w-full ${
        bg || "bg-slate-600"
      } px-6`}
    >
      {/* Left Section */}
      <div
        className="w-full lg:w-[40%] lg:h-[70vh] flex flex-col items-center lg:items-start my-6"
        id="f1"
      >
        <img src={Logo} alt="Fit4You Logo" className="h-16 mb-4 lg:ml-10" />
        <p className="text-lg text-white text-center lg:text-left lg:ml-10">
          Strength begins with the decision to start. Every rep, every set, and
          every moment counts.
        </p>
        <label
          htmlFor="input-group-1"
          className="block mt-6 mb-2 text-sm font-medium text-gray-200 lg:ml-10"
        >
          Your Email
        </label>
        <div className="relative w-full lg:w-[95%] lg:ml-10">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full px-10 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@gmail.com"
          />
        </div>
      </div>

      {/* Right Section */}
      <div
        id="f2"
        className="flex flex-col items-center text-center w-full lg:w-[50%] my-6 lg:my-0"
      >
        <h1 className="text-green-300 font-serif text-3xl lg:text-4xl my-4">
          Visit our Gym Now !!
        </h1>
        <div className="w-full lg:w-[80%] shadow-sm border-2 opacity-80 hover:opacity-100 my-4">
          <MapsDirect />
        </div>
        <div className="text-white w-full">
          <ul className="flex flex-col lg:flex-row lg:gap-5 justify-center items-center my-4">
            <NavbarAnchor to={"/"} text={"Home"} />
            <NavbarAnchor to={"/about"} text={"About"} />
            <NavbarAnchor to={"/services"} text={"Services"} />
            <NavbarAnchor to={"/Pricing"} text={"Pricing"} />
            <NavbarAnchor to={"/contact"} text={"Contact"} />
          </ul>
          <p className="text-sm mt-4">© 2022 Fit4You. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
