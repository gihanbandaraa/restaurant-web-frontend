import React, { useState } from "react";
import {
  FaHome,
  FaQuestionCircle,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import {
  RiMenu3Fill,
  RiCloseFill,
  RiCalendarScheduleLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const StaffNavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const Navigation = () => (
    <nav>
      <ul>
        <Link to="/staff">
          <li
            className={`mb-4 text-gray-700 p-2 rounded-lg transform duration-300 ${
              location.pathname === "/staff"
                ? "bg-red-400 text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <FaHome />
              <p className="font-montserrat font-semibold">Dashboard</p>
            </div>
          </li>
        </Link>
        <Link to="/staff/orders">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/staff/orders"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <FaShoppingCart />
              <p className="font-montserrat font-semibold">Orders</p>
            </div>
          </li>
        </Link>

        <Link to="/staff/reservation">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/staff/reservation"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <RiCalendarScheduleLine />
              <p className="font-montserrat font-semibold">Reservations</p>
            </div>
          </li>
        </Link>

        <Link to="/staff/queries">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/queries"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <FaQuestionCircle />
              <p className="font-montserrat font-semibold">Queries</p>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-0">
        <div className="container mx-auto px-4 md:px-10 flex justify-between items-center py-2">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src="/Images/serendib-savor.svg"
                alt="Serendib Savor Logo"
                className="w-32 md:w-40 cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex py-2 px-4 text-sm bg-gray-100 rounded-2xl items-center gap-2">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                aria-label="Search"
                className="bg-transparent font-poppins outline-none w-full"
              />
              <FaSearch className="text-gray-500" />
            </div>
            {menuOpen ? (
              <RiCloseFill
                className="w-6 h-6 md:hidden cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <RiMenu3Fill
                className="w-6 h-6 md:hidden cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {currentUser && (
                <>
                  <img
                    src={currentUser.profilePicture}
                    alt={`${currentUser.username}'s profile`}
                    className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover border-2 border-red-800 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  />
                  <div>
                    <h2 className="hidden md:block font-montserrat cursor-pointer text-sm font-bold text-gray-700 hover:text-red-500 transition-colors duration-300">
                      {currentUser.username}
                    </h2>
                    {currentUser.isStaff && (
                      <h2 className="text-xs font-montserrat font-medium text-gray-500">
                        Staff
                      </h2>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-100 h-screen z-20 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-end">
          <RiCloseFill
            className="w-6 h-6 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="px-4">
          <Navigation />
        </div>
      </div>
      <section className="fixed top-[120px] left-0 w-[300px] shadow-lg h-screen hidden md:block">
        <div className="px-4 py-6">
          <Navigation />
        </div>
      </section>
    </>
  );
};

export default StaffNavBar;
