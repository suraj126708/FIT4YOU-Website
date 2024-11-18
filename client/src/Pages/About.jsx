import React from "react";
import NavBar from "../components/Navbar";
import AboutFirst from "../components/AboutFirstPage";
import BodyBuilderImg from "../images/AboutBodyBuilder.svg";
import AboutFeatures from "../components/AboutFeatures";
import CoreValues from "../components/CoreValues";
import WhyChooseOurGym from "../components/WhyChooseOurGym";
import Team from "../components/Team";
import FAQSection from "../components/FAQsection";
import Footer from "../components/Footer";

export default function About() {
  return (
    <React.Fragment>
      <div className="w-[100%] h-[100vh] flex justify-center items-center relative">
        <NavBar />
        <AboutFirst />
        <img
          src={BodyBuilderImg}
          className="lg:h-[42rem] h- absolute bottom-0 right-11"
          alt=""
        />
      </div>
      <div className="w-[100%] h-[100vh] ">
        <AboutFeatures />
      </div>
      <div className="w-[100%] h-[65vh] lg:mt-72">
        <CoreValues />
      </div>
      <div className=" w-[100%] h-auto flex justify-start items-center">
        <WhyChooseOurGym />
      </div>
      <div className=" w-[100%] h-auto flex justify-center items-center">
        <Team />
      </div>
      <FAQSection />
      <Footer bg={"bg-neutral-900"} />
    </React.Fragment>
  );
}
