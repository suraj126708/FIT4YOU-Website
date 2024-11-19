import { useState, useEffect } from "react";
import axios from "axios";
import TrainerImage from "../components/SmallComponents/TrainerImg";
import Trainercontent from "../components/SmallComponents/ContentTrainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loading from "../components/SmallComponents/LoadingScreen";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "https://fit-4-you-website-api.vercel.app/trainers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTrainers(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trainers. Please try again later.");
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-black">
        <div id="trainer-bg" className="h-[100vh] w-[100%] relative">
          <div className="absolute top-[35%] left-[10%] text-8xl font-sans">
            <h1 className="text-white">Our Dynamic</h1>
            <h1 className="mt-7 text-green-400">TRAINERS</h1>
          </div>
        </div>

        {trainers.map((trainer, index) => (
          <div
            key={trainer.name}
            className="h-[100vh] w-[100%] bg-zinc-900 relative flex justify-around items-center"
          >
            <TrainerImage
              img={`https://fit-4-you-website-api.vercel.app/trainers/${trainer.profilePic}`}
              side={index % 2 === 0 ? "left" : "right"}
              name={trainer.name}
            />
            <Trainercontent
              side={index % 2 === 0 ? "right" : "left"}
              name={trainer.name}
              qualifications={trainer.qualifications}
              description={trainer.description}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
