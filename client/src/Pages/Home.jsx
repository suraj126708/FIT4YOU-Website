import HeroPage from "../components/HeroPage";
import Gallary from "../components/OurWorkoutGalary";
import Schedule from "../components/Schedule";
import Footer from "../components/Footer";
import Pricing from "../components/PricingSection";

const Home = () => {
  return (
    <>
      <div id="homepage" className="w-[100%]">
        <HeroPage />
        <Gallary />
      </div>
      <Schedule />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;
