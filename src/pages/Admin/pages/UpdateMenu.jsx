import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import MenuItemCard from "../components/MenuItemCard";
import AddItemModal from "../components/AddItemModel";

const UpdateMenu = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  // Callback function to refetch menu items when an item is added
  const handleItemAdded = () => {
    fetchMenuItems();
  };

  return (
    <section className="fixed-container max-h-screen overflow-y-auto">
      <div className="py-5 max-w-screen-lg mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-sm md:text-xl font-bold">Menu Items</h1>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-2 md:px-4 md:py-2 py-1 rounded-lg text-white font-poppins font-medium bg-red-500 hover:bg-red-400 transform duration-300 cursor-pointer"
          >
            <FaPlusCircle className="text-xs md:text-sm" />
            <h2 className="text-xs md:text-sm">Add Item</h2>
          </div>
        </div>

        {/* Horizontal list of categories */}
        <div className="flex hide-scrollbar overflow-x-auto space-x-4 mb-6">
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
              className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg ${
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

        {loading && (
          <div className="w-full h-1 bg-gray-200 relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-red-500 animate-loading"></div>
          </div>
        )}

        {/* Display message if no items available */}
        {!loading && menuItems.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No items available.</p>
        )}

        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {!loading &&
            menuItems.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}
        </div>

        {/* Alert component */}
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          isOpen={alertInfo.isOpen}
          onClose={handleCloseAlert}
        />
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        selectedCategory={selectedCategory}
        categories={categories}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handleItemAdded(); // Refetch menu items when modal closes
        }}
      />
    </section>
  );
};

export default UpdateMenu;
