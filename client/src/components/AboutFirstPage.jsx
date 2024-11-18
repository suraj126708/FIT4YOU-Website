/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-scroll";

export default function AboutFirst() {
  return (
    <>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-sans font-bold text-white sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Achieve Your Fitness Goals with{" "}
              <span className="text-green-600">PowerGym</span>
            </h1>
            <p className="mt-3 text-lg text-white dark:text-neutral-400">
              PowerGym is your ultimate destination to transform your body and
              mind. With top-notch equipment and certified trainers, we offer
              personalized training plans to help you reach your fitness
              objectives.
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link
                to="pricing"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Join Us Today
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <a
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="https://wa.me/9860126708?text=Hello%20Trainer,%20I%20would%20like%20to%20inquire%20about%20the%20training%20program.%20Please%20let%20me%20know%20more!"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Our Trainers
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
