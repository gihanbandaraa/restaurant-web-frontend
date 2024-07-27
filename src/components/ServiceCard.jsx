import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-4 group cursor-pointer group hover:bg-red-500 transform transition-transform duration-200 hover:scale-105  text-center shadow-2xl rounded-lg">
      <Icon className="text-red-500 text-4xl mx-auto mb-4 group-hover:text-white " />
      <h3 className="text-xm font-semibold mb-4 group-hover:text-white">
        {title}
      </h3>
      <p className="text-xs font-medium text-gray-500 group-hover:text-white">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
