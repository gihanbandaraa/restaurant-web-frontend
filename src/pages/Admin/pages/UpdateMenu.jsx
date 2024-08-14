import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import MenuItemCard from "../components/MenuItemCard";
import AddItemModal from "../components/AddItemModel";
import EditItemModal from "../components/EditItemModel";
import { getStorage, ref, deleteObject } from "firebase/storage";

const UpdateMenu = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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

  const handleItemUpdated = () => {
    fetchMenuItems();
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await fetch(`/api/admin/delete-menu/${itemToDelete._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          handleShowAlert("success", "Item deleted successfully");
          fetchMenuItems();
        } else {
          handleShowAlert("error", data.message);
        }
      } catch (error) {
        handleShowAlert("error", "Something went wrong!");
      } finally {
        closeConfirmDeleteModal();
      }
    }
  };

  return (
    <section className="fixed-container max-h-screen overflow-y-auto">
      <Alert
        type={alertInfo.type}
        message={alertInfo.message}
        isOpen={alertInfo.isOpen}
        onClose={handleCloseAlert}
      />

      <div className="py-5 max-w-screen-lg mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-sm md:text-xl font-bold">Menu Items</h1>
          <div
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 px-2 md:px-4 md:py-2 py-1 rounded-lg text-white font-poppins font-medium bg-red-500 hover:bg-red-400 transform duration-300 cursor-pointer"
          >
            <FaPlusCircle className="text-xs md:text-sm" />
            <h2 className="text-xs md:text-sm font-montserrat">Add Item</h2>
          </div>
        </div>

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
              className={`px-2 py-1 md:px-4 md:py-2 text-sm rounded-lg ${
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

        {!loading && menuItems.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No items available.</p>
        )}

        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {!loading &&
            menuItems.map((item) => (
              <div key={item._id}>
                <MenuItemCard
                  item={item}
                  handleEdit={handleEditClick}
                  handleDelete={handleDeleteClick}
                />
              </div>
            ))}
        </div>

        {/* Confirmation Delete Modal */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
            confirmDeleteModalOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-sm transform transition-transform duration-300 ${
              confirmDeleteModalOpen ? "scale-100" : "scale-95"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={closeConfirmDeleteModal}
              />
            </div>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300"
              >
                Confirm
              </button>
              <button
                onClick={closeConfirmDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transform duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddItemModal
        selectedCategory={selectedCategory}
        categories={categories}
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          handleItemUpdated();
        }}
      />

      <EditItemModal
        itemData={itemToEdit}
        categories={categories}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          handleItemUpdated();
        }}
      />
    </section>
  );
};

export default UpdateMenu;
