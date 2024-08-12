import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import { app } from "../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddItemModal = ({ isOpen, onClose, categories, selectedCategory }) => {
  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    offers: "",
    imageUrl: "",
  });

  const nodeRef = React.useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory,
      }));
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, `menuImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          handleShowAlert("error", error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: downloadURL,
          }));
          setImageFile(null);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.imageUrl
    ) {
      handleShowAlert(
        "error",
        "Please fill in all the fields and upload an image"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/add-menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        handleShowAlert("error", data.message);
        setLoading(false);
        return;
      }

      handleShowAlert("success", data.message);
      resetForm();
      onClose();
    } catch (error) {
      handleShowAlert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
      offers: "",
      imageUrl: "",
    });
    setImageFile(null);
    setImagePreviewUrl("");
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="fixed inset-0  bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
        onClick={() => onClose()}
      >
        <div
          className="bg-white rounded-lg p-6 w-full overflow-auto h-[calc(100vh-100px)] m-4 md:m-0 max-w-md sm:max-w-lg transform"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Item Name
              </label>
              <input
                id="title"
                placeholder="Cheese Burger"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Item Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Item Description
              </label>
              <textarea
                placeholder="A delicious burger with cheese."
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Item Description"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="100"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Item Price"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="offers"
                className="block text-sm font-medium mb-2"
              >
                Offers
              </label>
              <input
                id="offers"
                placeholder="Buy 1 Get 1 Free / 10% off"
                value={formData.offers}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Item Offers"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="itemImage"
                className="block text-sm font-medium mb-2"
              >
                Item Image
              </label>
              <input
                id="itemImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Item Image"
              />
              {imagePreviewUrl && (
                <div className="mt-4">
                  <img
                    src={imagePreviewUrl}
                    alt="Selected item"
                    className="max-h-40 object-cover rounded-md"
                  />
                </div>
              )}
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
                className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                aria-label="Add Item"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>
        </div>

        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          showAlert={alertInfo.showAlert}
          onClose={handleCloseAlert}
        />
      </div>
    </CSSTransition>
  );
};

export default AddItemModal;
