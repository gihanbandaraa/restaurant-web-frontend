import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import { MdDelete } from "react-icons/md";

const AddCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-category-counts");
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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setEditModalOpen(!editModalOpen);
  };

  const openConfirmDeleteModal = (category) => {
    setCategoryToDelete(category);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      handleShowAlert("error", "Please fill all fields!");
      return;
    }
    try {
      const res = await fetch("/api/admin/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await res.json();
      if (!res.ok) {
        handleShowAlert("error", data.message);
        return;
      }
      setCategoryName("");
      handleShowAlert("success", "Category added successfully!");
      fetchCategories();
    } catch (error) {
      setCategoryName("");
      handleShowAlert("error", "Something went wrong!");
    }
    setModalOpen(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      handleShowAlert("error", "Please fill all fields!");
      return;
    }
    try {
      const res = await fetch(
        `/api/admin/update-category/${currentCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        handleShowAlert("error", data.message);
        return;
      }
      handleShowAlert("success", "Category updated successfully!");
      fetchCategories();
    } catch (error) {
      handleShowAlert("error", "Something went wrong!");
    }
    setEditModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const res = await fetch(
        `/api/admin/delete-category/${categoryToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        handleShowAlert("error", data.message);
        return;
      }
      handleShowAlert("success", "Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      handleShowAlert("error", "Something went wrong!");
    }
    closeConfirmDeleteModal();
  };

  return (
    <>
      <section className="fixed-container">
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          showAlert={alertInfo.showAlert}
          onClose={handleCloseAlert}
        />
        <div className="py-5 max-w-screen-xl mx-auto">
          <div className="flex flex-row justify-between items-center">
            <div>
              <nav className="text-sm font-medium text-gray-500 mb-4">
                <span className="text-red-600">Dashboard</span> / Manage
                Categories
              </nav>
              <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-600">
                Manage Categories
              </h1>
            </div>
            <div
              onClick={toggleModal}
             className="flex items-center space-x-2 px-2 md:px-4 md:py-2 py-1 rounded-lg text-white font-poppins font-medium bg-red-500 hover:bg-red-400 transform duration-300 cursor-pointer"
            >
              <FaPlusCircle className="text-xs md:text-sm" />
              <h2 className="text-xs md:text-sm">Add Category</h2>
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="line-loader"></div> // Add line loader here
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(categories || []).map((category) => (
                    <tr key={category._id}>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.itemCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4 text-sm text-gray-500">
                        <button
                          onClick={() => toggleEditModal(category)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 text-lg hover:text-red-700"
                          onClick={() => openConfirmDeleteModal(category)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            In total there are {categories.length} categories.
          </p>
        </div>
      </section>

      {/* Add Category Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          modalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white rounded-lg p-6 w-full max-w-sm transform transition-transform duration-300 ${
            modalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Category</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={toggleModal}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                placeholder="Enter name of the category"
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Delete Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          confirmDeleteModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
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
          <p className="mb-4">Are you sure you want to delete this category?</p>
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

      {/* Edit Category Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          editModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          showAlert={alertInfo.showAlert}
          onClose={handleCloseAlert}
        />
        <div
          className={`bg-white rounded-lg p-6 w-full max-w-sm transform transition-transform duration-300 ${
            editModalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Category</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setEditModalOpen(false)}
            />
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label
                htmlFor="editCategoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="editCategoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
