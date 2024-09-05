import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaUtensils,
  FaConciergeBell,
  FaTruck,
  FaCalendarAlt,
  FaCocktail,
  FaBirthdayCake,
} from "react-icons/fa";
import ServiceCard from "../components/ServiceCard";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState([]);
  const sectionRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power2.out", duration: 1.2 },
    });

    tl.from(titleRef.current, { opacity: 0, y: -20 })
      .from(subtitleRef.current, { opacity: 0, y: -20 }, "-=0.8")
      .from(
        cardRefs.current,
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
        },
        "-=0.8"
      );

    return () => {
      if (ScrollTrigger.getById("servicesTrigger")) {
        ScrollTrigger.getById("servicesTrigger").kill();
      }
    };
  }, []);

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
    <section id="services" ref={sectionRef} className="py-12">
      <div className="container mx-auto px-6 max-w-screen-lg">
        <p
          ref={subtitleRef}
          className="font-bold text-center font-montserrat text-sm text-gray-500"
        >
          SERVICES
        </p>
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat text-center mb-4 text-gray-800"
        >
          Why <span className="text-red-500">Choose us?</span>
        </h2>
        <p className="text-sm text-center font-semibold mb-10 max-w-lg mx-auto text-gray-500">
          Explore the wide range of services we offer to make your dining
          experience unforgettable.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              ref={(el) => addToCardRefs(el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
