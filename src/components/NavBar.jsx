import React, { useState } from "react";
import { navItems } from "../data/data";
import { CgShoppingCart } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="mx-2 shadow-md sm:px-8">
      <div className="flex items-center mx-2 justify-between">
        <Link to={"/"}>
          <img
            src="/Images/serendib-savor.svg"
            alt="logo"
            className="w-36 sm:w-48"
          />
        </Link>
        <div className="hidden md:flex flex-row">
          <ul className="flex flex-row">
            {navItems.map((item) => (
              <Link to={item.url}>
                <li
                  key={item.id}
                  className="mx-4 font-semibold text-sm lg:text-base"
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <div className="cursor-pointer flex">
            <CgShoppingCart size={32} />
            <p className="h-4 w-4 text-center text-white text-xs font-bold rounded-full bg-red-500  ">
              2
            </p>
          </div>
          <Link to={"/sign-in"}>
            <div className="bg-slate-800 py-2 px-3 lg:px-4 text-sm  rounded-full font-semibold text-white">
              <button>Sign In</button>
            </div>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMobileMenuToggle}
            className={`text-3xl ${isMobileMenuOpen ? "animate-spin" : ""}`}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col items-center  transition-all duration-700 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center">
          {navItems.map((item) => (
            <Link to={item.url}>
              <li key={item.id} className="my-2 font-semibold text-base">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex flex-col items-center mt-4">
          <div className="cursor-pointer mb-4 flex">
            <CgShoppingCart size={32} />
            <p className="h-4 w-4 text-center text-white text-xs font-bold rounded-full bg-red-500">
              2
            </p>
          </div>
          <Link to={"/sign-in"}>
            <div className="bg-slate-800 py-2 px-4 mb-8 rounded-full font-semibold text-white">
              <button>Sign In</button>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
