import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaConciergeBell,
  FaTruck,
  FaCalendarAlt,
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
          features: [
            "Cozy and elegant ambiance",
            "Family-friendly seating arrangements",
            "Live music on weekends",
            "Free Wi-Fi",
          ],
        },
        {
          id: 2,
          icon: FaConciergeBell,
          title: "Reservation Support",
          features: [
            "Online table booking system",
            "Reservation confirmation via email/SMS",
            "Option to pre-order meals for special occasions",
            "Special arrangements for celebrations",
          ],
        },
        {
          id: 3,
          icon: FaTruck,
          title: "Takeaway and Delivery",
          features: [
            "Easy online ordering",
            "Contactless delivery options",
            "Curbside pickup available",
            "Loyalty rewards for repeat customers",
          ],
        },
        {
          id: 4,
          icon: FaCalendarAlt,
          title: "Special Events and Catering",
          features: [
            "Catering services for parties and corporate events",
            "Private dining room for special occasions",
            "Customizable menus for events",
            "Professional event planning assistance",
          ],
        },
      ];
      setServices(data);
    };
    fetchData();
  }, []);

  return (
    <section id="services" className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 max-w-screen-lg">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          Our Services
        </h2>
        <p className="text-sm text-center font-semibold mb-10 max-w-lg mx-auto text-gray-500">
          Explore the wide range of services we offer to make your dining
          experience unforgettable.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
