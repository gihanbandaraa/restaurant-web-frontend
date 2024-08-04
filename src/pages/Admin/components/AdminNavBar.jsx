import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const AdminNavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 md:px-10 flex justify-between items-center py-2">
          <div className="flex items-center gap-4">
            <img
              src="/Images/serendib-savor.svg"
              alt="Serendib Savor Logo"
              className="w-24 md:w-40 cursor-pointer"
            />
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
            {currentUser && (
              <>
                <IoIosNotifications className="w-6 h-6 md:w-8 md:h-8 text-gray-800 cursor-pointer" />
                <img
                  src={currentUser.profilePicture}
                  alt={`${currentUser.username}'s profile`}
                  className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover cursor-pointer"
                />
                <h2 className="hidden md:block font-montserrat cursor-pointer text-sm font-bold text-gray-700">
                  {currentUser.username}
                </h2>
              </>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-200 h-screen z-20 transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-end">
          <RiCloseFill className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        </div>
        <div className="px-4">
          {/* Add your sidebar navigation items here */}
          <div className="py-2 px-4 text-sm bg-gray-100 rounded-2xl mb-4 flex items-center gap-2">
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
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="text-gray-700">Home</a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700">About</a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700">Services</a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <section className="fixed top-[70px] left-0 w-[300px] bg-gray-200 h-screen hidden md:block">
        <div>test</div>
      </section>
    </>
  );
};

export default AdminNavBar;
