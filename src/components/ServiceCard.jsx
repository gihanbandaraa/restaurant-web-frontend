import React from "react";

const ServiceCard = ({ icon: Icon, title, features }) => {
  return (
    <div className="bg-white p-8 rounded-2xl cursor-pointer hover:bg-slate-200 transform transition-transform duration-200 hover:scale-105 shadow-md shadow-gray-400 text-center">
      <Icon className="text-red-500 text-4xl mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="list-none space-y-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
