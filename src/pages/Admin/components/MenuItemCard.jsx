import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MenuItemCard = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="flex flex-col mt-10 lg:flex-row bg-white text-gray-900 mx-4 md:mx-10 my-5 cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full lg:w-32 h-40 md:h-full  object-cover"
      />
      <div className="flex-1 p-4">
        <h3 className="text-sm font-montserrat md:text-base font-bold">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
        <div className="flex flex-col gap-4 mb-2 font-montserrat">
          <h2 className="text-sm sm:text-base text-red-500 font-semibold">
            Rs. {item.price}
          </h2>
          {item.offers && (
            <span className="bg-green-500 text-white w-fit text-sm px-2 py-1 rounded">
              {item.offers}% Off
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-start gap-4 items-center p-4">
        <button
          onClick={() => handleEdit(item)} // Call handleEdit with item
          className="bg-red-500 hover:bg-red-400 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded flex items-center"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => handleDelete(item)}
          className="bg-red-500 hover:bg-red-400 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded flex items-center"
        >
          <MdDelete className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
