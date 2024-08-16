import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addItemToCart } from "../redux/cart/cartSlice"; // Import the addItemToCart action
import useAlert from "../hooks/useAlert.js";

const MenuSection = () => {
  const [menu, setMenu] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const { handleShowAlert } = useAlert();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await fetch("/api/admin/get-menu");
        const data = await res.json();
        if (res.ok) {
          setMenu(data || []);
        } else {
          handleShowAlert("error", data.message);
        }
      } catch (error) {
        handleShowAlert("error", "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [handleShowAlert]);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item)); // Dispatch the addItemToCart action
    handleShowAlert("success", `${item.title} added to cart`);
  };

  return (
    <section className="py-10">
      <div className="flex items-center justify-center flex-col gap-4">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          OUR MENU
        </p>
        <h2 className="font-extrabold text-gray-800 font-poppins text-2xl md:text-4xl">
          Explore Our <span className="text-red-500">Menu</span>
        </h2>
        <p className="text-sm text-center font-semibold mb-10 max-w-lg mx-auto text-gray-500">
          Discover a variety of delicious dishes crafted to satisfy your
          cravings. From appetizers to desserts, our menu offers something for
          everyone.
        </p>

        {/* Menu Items */}
        <div className="grid grid-cols-1 px-8 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto ">
          {menu.slice(0, visibleItems).map((item) => (
            <div
              key={item._id}
              className="border relative border-gray-200 rounded-lg p-4 shadow-sm hover:scale-105 cursor-pointer transform duration-300"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-bold font-montserrat text-lg">{item.title}</h3>
              <p className="text-gray-600 font-montserrat">{item.description}</p>
              <div className="flex flex-row items-end justify-between">
                <p className="text-red-500 text-xl font-semibold">Rs.{item.price}</p>
                {item.offers && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
                    {item.offers}
                  </span>
                )}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 bg-red-500 font-montserrat font-semibold text-white px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {visibleItems < menu.length && (
          <Link to="/menu">
            <button className="mt-6 bg-red-500 font-montserrat font-semibold text-white px-6 py-2 rounded-md hover:bg-red-400 transition duration-300">
              View All
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
