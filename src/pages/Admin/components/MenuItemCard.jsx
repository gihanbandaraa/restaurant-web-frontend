import React from "react";
import { FaEdit } from "react-icons/fa";

const MenuItemCard = ({ item }) => {
  return (
    <div className="flex bg-white text-gray-900 mx-10 my-5 cursor-pointer rounded-lg overflow-hidden shadow-lg mb-4 transform transition-transform hover:scale-105">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-32 max-h-40 object-cover"
      />
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold">{item.title}</h3>

        <p className="text-gray-600 mb-2">{item.description}</p>
        <div className="flex justify-between items-center mb-2 font-montserrat">
          <h2 className="text-base text-red-500 font-semibold">
            Rs. {item.price}
          </h2>
          {item.offers && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              {item.offers} Off
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center p-4">
        <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded flex items-center">
          <FaEdit className="mr-2" /> Edit
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
