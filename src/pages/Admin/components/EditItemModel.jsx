import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../firebase";

const EditItemModal = ({ isOpen, onClose, categories, itemData }) => {
  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    offers: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemData) {
      setFormData({
        title: itemData.title || "",
        description: itemData.description || "",
        category: itemData.category || "",
        price: itemData.price || "",
        offers: itemData.offers || "",
        imageUrl: itemData.imageUrl || "",
      });
      setImagePreviewUrl(itemData.imageUrl || "");
    }
  }, [itemData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
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
          resolve(downloadURL);
        }
      );
    });
  };

  const nodeRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedImageUrl = formData.imageUrl;

      if (imageFile) {
        updatedImageUrl = await uploadImage();
      }

      const response = await fetch(`/api/admin/update-menu/${itemData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, imageUrl: updatedImageUrl }),
      });

      const data = await response.json();
      if (!response.ok) {
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
        className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
        onClick={() => onClose()}
      >
        <div
          className="bg-white rounded-lg p-6 w-full overflow-auto h-[calc(100vh-100px)] m-4 md:m-0 max-w-md sm:max-w-lg transform"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Item Name
              </label>
              <input
                id="title"
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
                value={formData.offers}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                aria-label="Update Item"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Item"}
              </button>
            </div>
          </form>
        </div>

        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          isOpen={alertInfo.isOpen}
          onClose={handleCloseAlert}
        />
      </div>
    </CSSTransition>
  );
};

export default EditItemModal;
