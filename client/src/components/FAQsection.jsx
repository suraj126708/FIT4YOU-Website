/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQSection = () => {
  const [faqData, setFaqData] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/faqRoute/questionAnswer"
        );
        setFaqData(response.data.data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className="py-10  sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-200">
            Get answers to common questions about memberships, fitness programs,
            and more!
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-slate-300 border rounded-lg border-gray-200 shadow-lg cursor-pointer hover:bg-slate-200"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-4 sm:p-6"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-xl font-semibold">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                    activeQuestion === index ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`px-4 pb-5 sm:px-6 sm:pb-6 transition-all duration-200 ${
                  activeQuestion === index ? "block" : "hidden"
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-base mt-9">
          Still have questions?{" "}
          <span className="cursor-pointer font-medium text-blue-600 transition-all duration-200 hover:underline">
            <a
              href="https://wa.me/9860126708?text=Hello%20Trainer,%20I%20would%20like%20to%20inquire%20about%20the%20training%20program.%20Please%20let%20me%20know%20more!"
              target="_blank"
            >
              Contact our team
            </a>
          </span>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
