import React from "react";
import Services from "../components/Services";

const Home = () => {
  return (
    <>
      <section
        id="hero"
        className="relative mt-10 min-h-screen bg-max bg-hero-pattern bg-center bg-cover md:bg-none"
      >
        <div className="absolute inset-0 bg-white opacity-75 md:hidden"></div>
        <div className="relative flex justify-evenly flex-col md:flex-row items-center h-screen mx-10">
          <div className="max-w-lg lg:mb-20 leading-normal">
            <h2
              className="text-4xl lg:text-6xl font-bold "
              style={{ lineHeight: "1.3" }}
            >
              Meet, Eat & Enjoy The{" "}
              <span className="text-red-500">True Taste</span>.
            </h2>
            <p className="mt-4 font-semibold text-gray-500 text-sm lg:text-base">
              Food tastes better when you eat it with your family and friends
            </p>
            <div>
              <button className="mt-5 bg-red-500 font-medium text-white px-5 py-2 rounded-md">
                Get Started
              </button>
            </div>
          </div>
          <div>
            <img
              src="/Images/Image.png"
              alt="rice-bowl"
              className="max-h-[650px] hidden md:block"
            />
          </div>
        </div>
      </section>
      <Services />
    </>
  );
};

export default Home;
