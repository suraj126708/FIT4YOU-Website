export default function Trainercontent({
  name,
  qualifications,
  description,
  side,
}) {
  return (
    <div
      className={`text-white ${side === "right" ? "mr-10" : "ml-10"} w-[35%] 
      ${side === "right" ? "text-right" : "text-left"}  space-y-4 absolute ${
        side === "right" ? "right-0" : "left-0"
      }`}
    >
      <h1 className="font-serif text-green-500 text-6xl">{name}</h1>
      <p className="text-xl font-bold font-serif">{qualifications}</p>
      <p className="text-lg font-sans">{description}</p>
      <hr />
    </div>
  );
}
