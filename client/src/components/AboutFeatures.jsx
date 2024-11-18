import React from "react";
import featuresImg from "../images/gymFeaturesimg.svg";

const AboutFeatures = () => {
  return (
    <div className="">
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            Our Gym Features
          </h2>
          <p className="mt-2 text-neutral-400 text-sm md:text-base">
            Discover our state-of-the-art facilities and personalized programs
            designed to help you achieve your fitness goals.
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <img
              className="w-full object-cover rounded-xl"
              src={featuresImg}
              alt="Gym Features"
            />
          </div>

          {/* Timeline */}
          <div>
            {/* Heading */}
            <div className="mb-6">
              <h3 className="text-[#ff0] text-xs font-medium uppercase">
                Our Approach
              </h3>
            </div>

            {/* Timeline Items */}
            {[
              {
                id: 1,
                title: "Personal Training Assessment",
                description:
                  "Our certified trainers assess your fitness level and create a personalized workout plan tailored to your goals.",
              },
              {
                id: 2,
                title: "Group Fitness Classes",
                description:
                  "Join our diverse range of group classes led by experienced instructors to stay motivated and energized.",
              },
              {
                id: 3,
                title: "Nutritional Guidance",
                description:
                  "Receive expert advice on nutrition to complement your fitness routine and enhance your results.",
              },
              {
                id: 4,
                title: "Ongoing Support",
                description:
                  "Enjoy continuous support and motivation from our trainers to keep you accountable and focused on your fitness journey.",
              },
            ].map((item) => (
              <div className="flex gap-x-5 mb-8" key={item.id}>
                <div className="relative">
                  <div className="flex items-center justify-center w-8 h-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">
                    {item.id}
                  </div>
                  {item.id < 4 && (
                    <div className="absolute top-8 left-4 h-full w-px bg-neutral-800"></div>
                  )}
                </div>
                <div className="text-sm lg:text-base text-neutral-400">
                  <p>
                    <span className="text-white">{item.title}:</span>{" "}
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <a
              className="group inline-flex items-center gap-x-2 py-2 px-4 bg-[#ff0] font-medium text-sm lg:text-base text-neutral-900 rounded-full transition hover:bg-[#ffd700] focus:outline-none"
              href="#"
            >
              <svg
                className="shrink-0 w-5 h-5 lg:w-6 lg:h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                <path
                  className="opacity-0 group-hover:opacity-100 transition"
                  d="M14.05 2a9 9 0 0 1 8 7.94"
                ></path>
                <path
                  className="opacity-0 group-hover:opacity-100 transition"
                  d="M14.05 6A5 5 0 0 1 18 10"
                ></path>
              </svg>
              Schedule a free trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFeatures;
