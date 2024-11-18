import Table from "./SmallComponents/Table";
import bodybuilder from "../images/body-bulder.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
  useGSAP(() => {
    gsap.from("#text-schedule", {
      x: -80,
      duration: 1,
      opacity: 0,
      scrollTrigger: "#schedule",
    });

    gsap.from("#img-schedule", {
      x: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: "#schedule",
    });
  });

  return (
    <div className="min-h-[100vh] w-full relative" id="schedule">
      <h1 className="py-4 text-green-500 text-4xl font-serif text-center">
        Schedule of Gym
      </h1>

      <div className="flex flex-col lg:flex-row h-full lg:pl-16 items-center">
        <div
          id="text-schedule"
          className="text-slate-100 lg:w-[55%] w-full flex flex-col justify-center items-start p-6 lg:p-0"
        >
          <h2 className="text-3xl lg:text-4xl font-serif mb-2">
            Welcome to Fit4You
          </h2>
          <p className="py-4 text-sm lg:text-base leading-relaxed">
            A well-crafted schedule turns goals into reality by helping you stay
            focused, organized, and balanced. Use it to manage your time
            effectively and make steady progress toward success.
          </p>
          <Table />
        </div>

        {/* Image Section */}
        <div
          id="img-schedule"
          className="lg:w-[45%] w-full flex justify-center lg:relative lg:bottom-0 lg:right-0 mt-6 lg:mt-0"
        >
          <img
            src={bodybuilder}
            className="w-[80%] lg:w-[60%] max-h-[500px] object-contain"
            alt="Bodybuilder"
          />
        </div>
      </div>
    </div>
  );
}
