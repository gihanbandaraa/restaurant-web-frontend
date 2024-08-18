import React, { useState, useEffect } from "react";
import useAlert from "../hooks/useAlert";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addItemToCart } from "../redux/cart/cartSlice";
import { FaSearch } from "react-icons/fa";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data || []);
      } else {
        handleShowAlert("error", data.message);
      }
    } catch (error) {
      handleShowAlert("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      let res;
      if (selectedCategory) {
        res = await fetch(`/api/admin/get-menu-category/${selectedCategory}`);
      } else {
        res = await fetch("/api/admin/get-menu");
      }
      const data = await res.json();
      if (res.ok) {
        setMenuItems(data || []);
      } else {
        handleShowAlert("error", data.message);
      }
    } catch (error) {
      handleShowAlert("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (item) => {
    if (item.offers) {
      return item.price - (item.price * item.offers) / 100;
    }
    return item.price;
  };

  const handleAddToCart = (item) => {
    const discountedPrice = calculateDiscountedPrice(item);
    const newItem = { ...item, price: discountedPrice };
    dispatch(addItemToCart(newItem));
    handleShowAlert("success", `${item.title} added to cart`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const filteredMenuItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen max-w-screen-lg mx-auto">
      <h2 className="text-2xl text-gray-900 font-montserrat md:text-3xl font-extrabold text-center my-4">
        Our <span className="text-red-500">Menu</span>
      </h2>
      <p className=" md:text-lg font-montserrat font-medium text-center text-gray-700 mb-10">
        Discover the finest flavors and delightful dishes crafted just for you.
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for dishes..."
            className="px-4 py-2 w-full md:w-80 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          />
          <FaSearch className="absolute text-red-500 inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center md:justify-center hide-scrollbar max-w-full px-4 mx-auto overflow-x-auto space-x-2 mb-6">
        <button
          className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg ${
            selectedCategory === null
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            className={`px-2 py-1 font-montserrat font-bold md:px-4 md:py-2 text-sm rounded-lg ${
              selectedCategory === category._id
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Render Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-5 lg:grid-cols-3 gap-6 mb-10">
        {loading ? (
          <div className="line-loader"></div>
        ) : filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
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
              <h3 className="font-bold font-montserrat text-lg">
                {item.title}
              </h3>
              <p className="text-gray-600 font-montserrat">
                {item.description}
              </p>
              <div className="flex flex-row items-end justify-between mt-4">
                <p className="text-red-500 text-xl font-semibold">
                  Rs.{item.price}
                </p>
                {item.offers && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
                    {item.offers}% off
                  </span>
                )}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-red-500 font-montserrat font-semibold text-white px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-10 text-gray-500">No items available.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
