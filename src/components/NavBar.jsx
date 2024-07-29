import React, { useEffect, useState } from "react";
import { navItems } from "../data/data";
import { CgShoppingCart } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav
      className={`sm:px-8 font-montserrat  sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-gray-300 bg-white shadow-md" : ""
      }`}
    >
      <div className="flex items-center mx-2 justify-between md:justify-evenly">
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
              <li
                key={item.id}
                className="mx-4 font-semibold text-sm lg:text-base hover:text-red-500 hover:text-lg transition-all "
              >
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <div className="cursor-pointer flex">
            <CgShoppingCart size={32} />
            <p className="h-4 w-4 text-center text-white text-xs font-bold rounded-full bg-red-500">
              2
            </p>
          </div>
          {currentUser ? (
            <div className="relative">
              <img
                src={currentUser.profilePicture}
                className="rounded-full"
                width={40}
                onClick={handleProfileMenuToggle}
              />
              {isProfileMenuOpen && (
                <div className="absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 font-semibold py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/sign-in"}>
              <div className="bg-slate-800 py-2 px-3 lg:px-4 text-sm rounded-full font-semibold text-white">
                <button>Sign In</button>
              </div>
            </Link>
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          {currentUser ? (
            <div className="relative">
              <img
                src={currentUser.profilePicture}
                className="rounded-full block md:hidden"
                width={38}
                onClick={handleProfileMenuToggle}
              />
              {isProfileMenuOpen && (
                <div className="absolute sm:hidden right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/sign-in"}>
              <div className="bg-slate-800 py-2 px-4 text-xs  sm:hidden  rounded-full font-semibold text-white">
                <button>Sign In</button>
              </div>
            </Link>
          )}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMobileMenuToggle}
              className={`text-3xl ${isMobileMenuOpen ? "animate-spin" : ""}`}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col  items-center transition-all duration-700 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center">
          {navItems.map((item) => (
            <li key={item.id} className="my-2 font-semibold text-base">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center mt-4">
          <div className="cursor-pointer mb-4 flex">
            <CgShoppingCart size={32} />
            <p className="h-4 w-4 text-center text-white text-xs font-bold rounded-full bg-red-500">
              2
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
