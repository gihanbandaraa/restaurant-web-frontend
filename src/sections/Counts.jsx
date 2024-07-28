import React from "react";
import Counter from "../components/Counter";

const Counts = () => {
  return (
    <div className="relative  py-10   mt-10 md:py-16">
      <div className="absolute inset-0">
        <img
          src="/Images/Image2.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center items-center z-10">
          <Counter start={0} end={1500} duration={500} />
          <h2 className="text-sm md:text-base font-semibold text-white">
            Happy Customers
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <Counter start={0} end={20} duration={500} />
          <h2 className="text-sm md:text-base font-semibold text-white">
            Our Staff
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <Counter start={0} end={90} duration={500} />
          <h2 className="text-sm md:text-base font-semibold text-white">
            Recipes
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <Counter start={0} end={10} duration={500} />
          <h2 className="text-sm md:text-base font-semibold text-white">
            Years of Experience
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Counts;
