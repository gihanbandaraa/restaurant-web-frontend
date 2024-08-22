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
import { toast } from "react-toastify";
import Spinner from "react-spinner"; // Import Spinner component

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
  const [uploadingImage, setUploadingImage] = useState(false);

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
      setUploadingImage(true);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error(error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: downloadURL,
          }));
          setImageFile(null);
          setImagePreviewUrl("");
          setUploadingImage(false);
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
      toast.error("Please fill all the fields");
      return;
    }

    if (uploadingImage) {
      toast.error("Image is still uploading. Please wait.");
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
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success(data.message);
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error.message);
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
        className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
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
            {/* Form fields */}
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
                type="number"
                placeholder="10 % Off / 5% off"
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
                className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-gray-600"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className={`px-4 py-2 text-white rounded-md ${
                  loading || uploadingImage
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                aria-label="Add Item"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Spinner size={20} /> Adding...
                  </span>
                ) : (
                  "Add Item"
                )}
              </button>
              {uploadingImage && (
                <div className="flex items-center">
                  <Spinner size={20} className="ml-2" />
                  <span className="ml-2">Uploading...</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddItemModal;
