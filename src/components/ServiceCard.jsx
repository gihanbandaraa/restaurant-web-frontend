import React from "react";

const ServiceCard = ({ icon: Icon, title, features }) => {
  return (
    <div className="bg-white p-8 rounded-2xl cursor-pointer  group hover:bg-red-500 transform transition-transform duration-200 hover:scale-105 shadow-md shadow-gray-400 text-center">
      <Icon className="text-red-500 text-4xl mx-auto mb-4 group-hover:text-white" />
      <h3 className="text-xl font-semibold mb-4  group-hover:text-white">
        {title}
      </h3>
      <ul className="list-none space-y-2 font-medium text-sm  text-gray-500  group-hover:text-white">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
