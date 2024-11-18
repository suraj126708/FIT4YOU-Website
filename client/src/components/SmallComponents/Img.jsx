export default function Img({ img, id, classForAnimation }) {
  return (
    <img
      src={img}
      alt=""
      id={id || ""}
      className={`${classForAnimation} grayscale hover:grayscale-0 width: 100% border-2 shadow-sm`}
    />
  );
}
