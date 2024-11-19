import Pricecard from "./SmallComponents/PriceCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./SmallComponents/LoadingScreen";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  useGSAP(() => {
    gsap.from("#left-price", {
      x: -80,
      duration: 1,
      opacity: 0,
      scrollTrigger: "#heading-price",
    });

    gsap.from("#right-price", {
      x: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: "#heading-price",
    });
    gsap.from("#middle-price", {
      y: 80,
      duration: 1,
      opacity: 0,
      scrollTrigger: "#heading-price",
    });

    gsap.from("#heading-price", {
      y: 160,
      opacity: 0,
      scale: 0.2,
      duration: 1,
    });
  });

  const [subscriptionPlans, setsubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://fit-4-you-website-api.vercel.app/subscription-plans",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setsubscriptionPlans(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch subscription plans. Please try again later.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <section id="pricing">
      <div
        id="price-card"
        className="min-h-[100vh] mt-10 w-full flex flex-col items-center"
      >
        <h1
          id="heading-price"
          className="font-serif text-center text-green-500 text-4xl mt-8 mb-12"
        >
          READY TO START YOUR JOURNEY WITH US
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {subscriptionPlans.map((plan, index) => (
            <Pricecard
              key={plan.id}
              id={
                index === 0
                  ? "left-price"
                  : index === 1
                  ? "middle-price"
                  : "right-price"
              }
              planName={plan.plan_name}
              description={plan.description}
              duration={plan.duration}
              price={plan.price}
              accessLevel={plan.access_level}
              includes={plan.includes}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
