import React from "react";
import { chefs } from "../data/data";

const Chefs = () => {
  return (
    <div className="mt-5 ">
      <div className="flex items-center justify-center flex-col gap-4 text-center">
        <p className="font-bold font-montserrat text-sm text-gray-500">CHEFS</p>
        <h2 className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
          Our Professional <span className="text-red-500">Chefs</span>
        </h2>
        <p className="text-sm font-semibold mb-10 max-w-lg text-gray-500">
          Discover the culinary masters behind our exquisite dishes. Each chef
          brings unique skills and creativity to the table, ensuring a
          delightful dining experience for you.
        </p>
      </div>
      <div className="bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 max-w-screen-lg mx-auto ">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="flex flex-col items-center gap-4  p-4 my-5 md:my-10 mx-5 bg-white shadow-lg rounded-md hover:scale-110 cursor-pointer transition duration-300"
            >
              <img
                src={chef.imageUrl}
                alt={chef.name}
                className="rounded-full w-32 h-32 object-cover object-center"
              />
              <div className="text-center">
                <h3 className="font-bold font-montserrat text-lg text-gray-800">
                  {chef.name}
                </h3>
                <p className="text-sm font-poppins text-gray-500">
                  {chef.title}
                </p>
                <p className="text-xs font-poppins text-gray-600 mt-2">
                  {chef.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chefs;
