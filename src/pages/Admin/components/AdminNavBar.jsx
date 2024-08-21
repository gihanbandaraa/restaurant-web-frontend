import React, { useState } from "react";
import { BiCategory, BiSolidOffer } from "react-icons/bi";
import {
  FaHome,
  FaQuestionCircle,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";
import { MdRestaurantMenu } from "react-icons/md";
import {
  RiMenu3Fill,
  RiCloseFill,
  RiCalendarScheduleLine,
  RiTeamFill,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AdminNavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const Navigation = () => (
    <nav>
      <ul>
        <Link to="/admin">
          <li
            className={`mb-4 text-gray-700 p-2 rounded-lg transform duration-300 ${
              location.pathname === "/admin"
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
        <Link to="/admin/orders">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/orders"
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
        <Link to="/admin/update-menu">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/update-menu"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <MdRestaurantMenu />
              <p className="font-montserrat font-semibold">Menu items</p>
            </div>
          </li>
        </Link>
        <Link to="/admin/add-categories">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/add-categories"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <BiCategory />
              <p className="font-montserrat font-semibold">Categories</p>
            </div>
          </li>
        </Link>
        <Link to="/admin/reservation">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/reservation"
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
        <Link to="/admin/offers">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/offers"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <BiSolidOffer />
              <p className="font-montserrat font-semibold">Offers</p>
            </div>
          </li>
        </Link>
        <Link to="/admin/gallery">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/gallery"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <GrGallery />
              <p className="font-montserrat font-semibold">Gallery</p>
            </div>
          </li>
        </Link>
        <Link to="/admin/queries">
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
        <Link to="/admin/staff">
          <li
            className={`mb-4 p-2 text-gray-700 rounded-lg transform duration-300 ${
              location.pathname === "/admin/staff"
                ? "bg-red-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <RiTeamFill />
              <p className="font-montserrat font-semibold">Staff</p>
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
            {currentUser && (
              <>
                <img
                  src={currentUser.profilePicture}
                  alt={`${currentUser.username}'s profile`}
                  className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover border-2 border-red-500 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                />
                <div>
                  <h2 className="hidden md:block font-montserrat cursor-pointer text-sm font-bold text-gray-700 hover:text-red-500 transition-colors duration-300">
                    {currentUser.username}
                  </h2>
                  {currentUser.isAdmin && (
                    <h2 className="text-xs font-montserrat font-medium text-gray-500">
                      Super Admin
                    </h2>
                  )}
                </div>
              </>
            )}
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

export default AdminNavBar;
