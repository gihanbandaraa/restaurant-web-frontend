import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import { MdClose, MdSearch } from "react-icons/md";

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      fetchMenuItems();
    }
  }, [isOpen]);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/admin/get-menu"); // Adjust URL as needed
      const data = await res.json();
      if (res.ok) {
        setMenuItems(data || []);
        setFilteredItems(data || []);
      } else {
        console.error("Failed to fetch menu items", data.message);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredItems(
      menuItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white max-w-[90vw] overflow-y-auto rounded-lg h-[calc(100vh-50px)] shadow-lg md:max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-xl md:text-2xl  font-semibold mb-4">
          Search Menu Items
        </h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <MdSearch
              className="absolute top-3 right-3 text-gray-600"
              size={20}
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-xs  sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-red-500 font-bold font-sm sm:font-base">
                      Rs.{item.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-red-500 text-white text-xs sm:text-base px-4 font-semibold py-2 rounded-md hover:bg-red-400 transition duration-300"
                >
                  Add 
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
