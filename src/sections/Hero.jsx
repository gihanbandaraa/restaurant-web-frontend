import React, { useEffect,useRef } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef();
  const headingRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();
  const iconsRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.to(heroRef.current, { opacity: 1, duration: 1.5 })
      .from(headingRef.current, { y: "-50%", opacity: 0, duration: 1 }, "-=1")
      .from(textRef.current, { y: "30%", opacity: 0, duration: 1 }, "-=0.8")
      .from(buttonRef.current, { opacity: 0, duration: 1 }, "-=0.8")
      .from(iconsRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
      }, "-=0.8")
      .from(imageRef.current, { x: "100%", opacity: 0, duration: 1 }, "-=1");
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-max bg-hero-pattern bg-center bg-cover md:bg-none"
      ref={heroRef}
    >
      <div className="absolute inset-0 bg-white opacity-75 md:hidden"></div>
      <div className="relative flex justify-evenly pb-16  flex-col md:flex-row items-center h-screen mx-10">
        <div className="max-w-lg lg:mb-20 leading-normal">
          <h2
            className="text-4xl lg:text-6xl font-bold"
            style={{ lineHeight: "1.3" }}
            ref={headingRef}
          >
            Meet, Eat & Enjoy The{" "}
            <span className="text-red-500">True Taste</span>.
          </h2>
          <p
            className="mt-4 font-semibold text-gray-500 text-sm lg:text-base"
            ref={textRef}
          >
            Food tastes better when you eat it with your family and friends
          </p>
          <div ref={buttonRef}>
            <button className="mt-5 bg-red-500 font-medium text-white px-5 py-2 rounded-md">
              Get Started
            </button>
          </div>
          <div className="flex gap-4" ref={iconsRef}>
            <div className="p-1 mt-10 border border-black w-fit rounded-full hover:scale-105 transition-all duration-75">
              <FaFacebookF className="" />
            </div>
            <div className="p-1 mt-10 border border-black w-fit rounded-full hover:scale-105 transition-all duration-75">
              <FaInstagram className="" />
            </div>
            <div className="p-1 mt-10 border border-black w-fit rounded-full hover:scale-105 transition-all duration-75">
              <FaTwitter className="" />
            </div>
            <div className="flex-grow border-b mb-3 border-gray-300"></div>
          </div>
        </div>
        <div>
          <img
            src="/Images/Image.png"
            alt="rice-bowl"
            className="max-h-[650px] hidden md:block"
            ref={imageRef}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
