import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const imageRefs = useRef([]);
  imageRefs.current = [];

  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
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
      smoothChildTiming: true,
      defaults: { ease: "power2.out", duration: 1.2 },
    });

    tl.from(sectionRef.current, { opacity: 0, duration: 1.2 })
      .from(titleRef.current, { y: -50, opacity: 0, duration: 1.2 }, "-=1")
      .from(
        imageRefs.current,
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 1,
          onComplete: () => {
            imageRefs.current.forEach((el) => {
              gsap.set(el, { clearProps: "all" });
            });
          },
        },
        "-=1"
      )
      .from(
        sectionRef.current.querySelectorAll("h2, p, button"),
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 1,
          clearProps: "all",
        },
        "-=1"
      );

    return () => {
      if (ScrollTrigger.getById("aboutUsTrigger")) {
        ScrollTrigger.getById("aboutUsTrigger").kill();
      }
    };
  }, []);
  return (
    <div ref={sectionRef}>
      <div
        className="flex items-center justify-center flex-col gap-4"
        ref={titleRef}
      >
        <p className="font-bold font-montserrat text-sm text-gray-500">
          ABOUT US
        </p>
        <h2 className="font-extrabold text-gray-800 font-poppins text-2xl md:text-4xl">
          Learn More <span className="text-red-500">About Us</span>
        </h2>
      </div>

      <div className="mt-10 m-5 flex gap-4 md:gap-8 flex-col-reverse md:flex-row ">
        <div>
          <div
            className="group overflow-hidden cursor-pointer"
            ref={addToImageRefs}
          >
            <img
              src="/Images/restaurant4.jpg"
              alt="restaurant"
              className="transform transition-transform duration-300 ease-in-out group-hover:scale-110 will-change-transform"
            />
          </div>
          <div className="p-5 m-2 border-gray-400 border-2 flex items-center justify-center flex-col mt-4 ">
            <h3 className="text-xl font-bold text-gray-800 font-montserrat">
              Book A Table
            </h3>
            <p className="text-2xl md:text-3xl font-semibold mt-2 font-poppins text-red-500">
              +94 71 123 4567
            </p>
          </div>
          <h2 className="font-montserrat text-sm font-bold mt-4">
            Our Philosophy
          </h2>
          <p className="font-montserrat text-sm mt-2">
            We use the freshest local ingredients and support sustainable
            practices. Our menu features a variety of traditional dishes, each
            crafted with care and passion. We believe dining is about more than
            just food; it’s about sharing stories and creating memories
          </p>
          <h2 className="font-montserrat text-sm font-bold mt-4">Join Us</h2>
          <p className="font-montserrat text-sm mt-2">
            Come and enjoy the flavors of Sri Lanka at Serendib Savor. We look
            forward to welcoming you and sharing our love for Sri Lankan
            cuisine.
          </p>
          <button className="mt-5 bg-red-500 font-medium text-white px-5 py-2 rounded-md hover:bg-red-400">
            Get Started
          </button>
        </div>

        <div className="flex flex-col-reverse gap-4 md:gap-2 md:flex-col">
          <div>
            <h2 className="font-montserrat text-sm font-bold">
              Welcome to Serendib Savor
            </h2>
            <p className="font-montserrat text-sm mt-2">
              At Serendib Savor, we pride ourselves on offering a diverse range
              of culinary delights to suit every palate. From traditional Sri
              Lankan dishes to international favorites, our menu caters to all
              tastes. With several branches across the region, we're committed
              to providing exceptional dining experiences wherever you are.
            </p>
            <h2 className="font-montserrat text-sm font-bold mt-4">
              Our Story
            </h2>
            <p className="font-montserrat text-sm mt-2">
              Founded by a group of food enthusiasts, Serendib Savor emerged
              from our travels across Sri Lanka, where we gathered diverse
              recipes and uncovered the secrets of authentic Sri Lankan cuisine.
              We aim to provide a unique dining experience that celebrates the
              rich cultural heritage of our beloved island while offering a
              variety of dishes to suit every preference.
            </p>
          </div>
          <div
            className="group overflow-hidden mt-2 cursor-pointer"
            ref={addToImageRefs}
          >
            <img
              src="/Images/restaurant1.jpg"
              alt="restaurant"
              className="transform transition-transform duration-300 ease-in-out group-hover:scale-110 will-change-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
