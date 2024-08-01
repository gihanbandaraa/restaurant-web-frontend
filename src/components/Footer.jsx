import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" shadow-2xl  shadow-black py-20 px-10">
      <div className="max-w-screen-lg mx-auto  flex flex-col md:flex-row justify-between ">
        {/* Left Side */}
        <div className="md:w-1/3 ">
          <img src="/Images/serendib-savor.svg" alt="logo" className="w-36" />
          <p className="font-montserrat text-sm font-medium text-left text-gray-500">
            Serendib Savor is a restaurant chain that offers delicious and
            authentic Sri Lankan meals across multiple locations.
          </p>
          <div className="flex flex-row gap-3 mt-3 text-gray-500">
            <a href="https://www.facebook.com/">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com/">
              <FaTwitter />
            </a>
            <a href="https://www.tiktok.com/">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row gap-8 mt-5 ">
          {/* Quick */}
          <div>
            <h3 className="text-gray-400 font-montserrat font-bold text-sm">
              Links
            </h3>
            <ul className="mt-5 font-poppins text-gray-600 font-semibold text-sm leading-8">
              <li>
                <a href="/menu">Menu</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-gray-400 font-montserrat font-bold text-sm">
              Locations
            </h3>
            <ul className="mt-5 font-poppins text-gray-600 font-semibold text-sm leading-8">
              <li>Colombo</li>
              <li>Galle</li>
              <li>Kandy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-b-2 mt-5"></div>
      <div className="text-center font-montserrat text-xs md:text-sm font-medium text-gray-500 mt-5">
        <p>&copy; {currentYear} Serendib Savor. All Rights Reserved</p>
        <p>🧑‍💻 Gihan Bandara 🧑‍💻</p>
      </div>
    </footer>
  );
};

export default Footer;
