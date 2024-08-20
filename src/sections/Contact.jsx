import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { toast } from "react-toastify";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact = () => {
  const locations = [
    { position: [6.9271, 79.8612], name: "Colombo" },
    { position: [7.2906, 80.6337], name: "Kandy" },
    { position: [6.0535, 80.22], name: "Galle" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (formData.name === "" || formData.message === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/user/add-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="px-10">
      {/* Left side */}
      <p className="font-bold text-center mt-10 font-montserrat text-sm text-gray-500">
        CONTACT US
      </p>

      <div className="flex flex-col md:flex-row my-10 gap-8 md:gap-4">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800 text-center md:text-left">
            Get in <span className="text-red-500">Touch</span>
          </h2>
          <p className="mt-4 text-center text-sm font-poppins font-medium md:text-left">
            We'd love to hear from you! Fill out the form below to send us a
            message.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="shadow appearance-none font-montserrat border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="shadow appearance-none border font-montserrat rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              className="shadow appearance-none font-montserrat border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              className="bg-red-500 hover:bg-red-400 font-montserrat text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 flex flex-col sm:flex-row justify-start gap-8 font-montserrat">
            <div className="flex items-center">
              <FaPhone className="inline-block mr-2" />
              <div className="flex flex-col">
                <p className="font-bold text-xs">Phone</p>
                <p className="font-bold text-xs text-red-500">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="inline-block mr-2" />
              <div className="flex flex-col">
                <p className="font-bold text-xs">Email</p>
                <p className="font-bold text-xs text-red-500">
                  info@serendib.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 h-96 z-10 pointer-events-auto">
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={7}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
              <Marker key={index} position={location.position}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
