import React, { useState, useEffect } from "react";

const AddItemModal = ({ isOpen, onClose, categories, selectedCategory }) => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemOffers, setItemOffers] = useState(""); // State for offers

  useEffect(() => {
    if (selectedCategory) {
      setItemCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Added:", {
      itemName,
      itemDesc,
      itemCategory,
      itemPrice,
      itemOffers,
    });
    resetForm();
    onClose(); // Close modal after submission
  };

  const resetForm = () => {
    setItemName("");
    setItemDesc("");
    setItemCategory("");
    setItemPrice("");
    setItemOffers(""); // Reset offers
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-modal="true"
      role="dialog"
      onClick={() => onClose()} // Close modal when clicking outside
    >
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium mb-2"
            >
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              aria-label="Item Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemDesc"
              className="block text-sm font-medium mb-2"
            >
              Item Description
            </label>
            <textarea
              id="itemDesc"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              aria-label="Item Description"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemCategory"
              className="block text-sm font-medium mb-2"
            >
              Category
            </label>
            <select
              id="itemCategory"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              aria-label="Item Category"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemPrice"
              className="block text-sm font-medium mb-2"
            >
              Price
            </label>
            <input
              id="itemPrice"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              aria-label="Item Price"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemOffers"
              className="block text-sm font-medium mb-2"
            >
              Offers
            </label>
            <input
              id="itemOffers"
              value={itemOffers}
              onChange={(e) => setItemOffers(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Item Offers"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Add Item"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
