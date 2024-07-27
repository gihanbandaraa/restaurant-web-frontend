import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaConciergeBell,
  FaTruck,
  FaCalendarAlt,
  FaCocktail,
  FaBirthdayCake,
  FaLeaf,
  FaChild,
} from "react-icons/fa";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          icon: FaUtensils,
          title: "Dine-In Experience",
          description:
            "Enjoy a cozy and elegant ambiance with family-friendly seating arrangements. Experience live music on weekends and take advantage of our free Wi-Fi.",
        },
        {
          id: 2,
          icon: FaConciergeBell,
          title: "Reservation Support",
          description:
            "Use our online table booking system and receive reservation confirmations via email or SMS. Pre-order meals for special occasions and get special arrangements for celebrations.",
        },
        {
          id: 3,
          icon: FaTruck,
          title: "Takeaway and Delivery",
          description:
            "Order easily online with contactless delivery options and curbside pickup available. Earn loyalty rewards for being a repeat customer.",
        },
        {
          id: 4,
          icon: FaCalendarAlt,
          title: "Special Events and Catering",
          description:
            "Avail of our catering services for parties and corporate events. Book our private dining room for special occasions and customize menus with professional event planning assistance.",
        },
        {
          id: 5,
          icon: FaCocktail,
          title: "Beverage Selection",
          description:
            "Choose from a wide range of beverages including cocktails, mocktails, and premium wines. Enjoy special happy hour discounts on selected drinks.",
        },
        {
          id: 6,
          icon: FaBirthdayCake,
          title: "Birthday Celebrations",
          description:
            "Celebrate birthdays with our special packages that include customized cakes, decorations, and personalized services to make your day unforgettable.",
        },
      ];
      setServices(data);
    };
    fetchData();
  }, []);

  return (
    <section id="services" className="py-12 ">
      <div className="container mx-auto px-6 max-w-screen-lg">
        <p className="font-bold text-center font-montserrat text-sm text-gray-500">
          SERVICES
        </p>
        <h2 className="text-4xl mt-4 font-extrabold font-montserrat text-center mb-4 text-gray-800">
          Why <span className="text-red-500">Choose us?</span>
        </h2>
        <p className="text-sm text-center font-semibold mb-10 max-w-lg mx-auto text-gray-500">
          Explore the wide range of services we offer to make your dining
          experience unforgettable.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
