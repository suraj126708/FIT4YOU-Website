import { NavLink } from "react-router-dom";

export default function NavbarAnchor({ to, text, id }) {
  return (
    <>
      <li>
        <NavLink
          to={to}
          id={id || ""}
          className="block py-2 px-3 text-white bg-green-700 rounded bg-transparent md:p-0"
          aria-current="page"
        >
          {text}
        </NavLink>
      </li>
    </>
  );
}
