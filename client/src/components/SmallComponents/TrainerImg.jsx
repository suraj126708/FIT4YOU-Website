export default function TrainerImage({ img, side, name }) {
  const filename = img?.split("\\").pop()?.split("/").pop();
  const imgs = filename ? `http://localhost:8080/trainers/${filename}` : null;

  return (
    <div
      className={`h-[35rem] w-[35rem] absolute bottom-0 ${
        side === "right" ? "right-20" : "left-20"
      } bg-gradient-to-r from-green-700 rounded-full`}
    >
      <img
        className="h-[42rem] absolute bottom-0 rounded-full"
        src={imgs}
        alt={name}
      />
    </div>
  );
}
