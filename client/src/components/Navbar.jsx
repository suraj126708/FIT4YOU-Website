import { useContext, useState } from "react";
import Bgimg from "../images/fit4you.png";
import NavbarAnchor from "./SmallComponents/NavbarAnchor";
import AuthContext from "../Authorisation/AuthProvider";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const username = localStorage.getItem("loggedInUser");
  const routes = [
    { to: "/", text: "Home", id: "home" },
    { to: "/about", text: "About" },
    { to: "/Trainers", text: "Trainers" },
    { to: "/contact", text: "Contact" },
    { to: "/AddWorkOut", text: "Add WorkOut" },
    username === "dev jangam" ? { to: "/users", text: "Users" } : null,
    username === "dev jangam" ? { to: "/faqPanel", text: "FAQ's" } : null,
  ];

  const profilepic = localStorage.getItem("profilePicture");
  const fileName = profilepic ? profilepic.split("\\").pop() : null;

  const profilePicUrl = fileName
    ? `http://localhost:8080/uploads/${fileName}`
    : "https://flowbite.com/docs/images/people/profile-picture-3.jpg";

  return (
    <nav className="absolute top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3">
          <img
            src={Bgimg}
            className="h-8"
            alt="Fit4You - Your Fitness Partner Logo"
            id="logo"
            loading="lazy"
          />
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <a href="/profile">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isOpen ? "true" : "false"}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={profilePicUrl}
                  alt="user"
                  loading="lazy"
                />
              </button>
            </a>
          ) : null}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1 lg:bg-transparent`}
          id="navbar-user"
        >
          <ul
            id="navText"
            className="flex flex-col font-medium p-4 md:p-0 mt-0 md:space-x-8 md:flex-row md:mt-0 md:border-0"
          >
            {routes.map(
              (route) => route && <NavbarAnchor key={route.text} {...route} />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
