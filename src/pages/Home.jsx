import React from "react";

const Home = () => {
  return (
    <section
      id="hero"
      className="relative mt-5 min-h-screen bg-max bg-hero-pattern bg-center bg-cover md:bg-none"
    >
      <div className="absolute inset-0 bg-white opacity-75 md:hidden"></div>
      <div className="relative flex justify-evenly flex-col md:flex-row items-center h-screen mx-10">
        <div className="max-w-lg lg:mb-20 ">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Meet, Eat & Enjoy The{" "}
            <span className="text-red-500">True Taste</span>.
          </h2>
          <p className="mt-2 font-semibold text-gray-500 text-sm">
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
  );
};

export default Home;
