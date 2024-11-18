import PricingProperties from "./PricingListProperties";

export default function Pricecard(props) {
  return (
    <div
      id={props.id}
      className={`${
        props.id === "middle-price"
          ? "h-[78vh] bg-gradient-to-r from-lime-600 to-teal-600 text-white"
          : "h-[73vh] bg-white text-black"
      } w-[50vh] p-6 flex flex-col justify-evenly items-center rounded-md shadow-lg`}
    >
      <i className="fa-solid fa-dumbbell text-4xl mb-3" />
      <h2 className="text-xl font-semibold mb-2">{props.planName}</h2>
      <h1 className="text-4xl font-bold mb-2">{`$ ${props.price}`}</h1>

      <p className="font-medium mb-4">{`Duration: ${props.duration}`}</p>
      <ul className="space-y-2 w-full text-center">
        {props.includes.split(", ").map((feature, index) => (
          <PricingProperties key={index} feature={feature} />
        ))}
      </ul>
      <p className="italic text-sm my-3 text-center">{props.description}</p>
      <a
        href={
          props.id === 10
            ? "https://wa.me/7507874292?text=Hello%20Trainer,%20I%20would%20like%20to%20inquire%20about%20the%20Elite%20Membership.%20Exclusive%20access%20with%20premium%20perks%20and%20VIP%20services.%20Please%20let%20me%20know%20more!"
            : props.id === 8
            ? "https://wa.me/7507874292?text=Hello%20Trainer,%20I%20would%20like%20to%20inquire%20about%20the%20VIP%20Membership.%20All-inclusive%20access%20with%20additional%20perks.%20Please%20let%20me%20know%20more!"
            : "https://wa.me/7507874292?text=Hello%20Trainer,%20I%20would%20like%20to%20inquire%20about%20the%20Premium%20Membership.%20Includes%20group%20classes%20and%20personal%20training.%20Please%20let%20me%20know%20more!"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 px-9 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-300"
      >
        JOIN NOW
      </a>
    </div>
  );
}
