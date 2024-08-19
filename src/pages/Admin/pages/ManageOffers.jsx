import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

import { app } from "../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [editOfferId, setEditOfferId] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    imageUrl: "",
    buttonText: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + imageFile.name;
    const storageRef = ref(storage, `offerImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error(error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setNewOffer((prevData) => ({
            ...prevData,
            imageUrl: downloadURL,
          }));
          setImageFile(null);
          resolve(downloadURL);
        }
      );
    });
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/get-offers");
      const data = await res.json();

      setImagePreviewUrl("");

      if (res.ok) {
        setOffers(data);
      } else {
        toast.error("Failed to fetch offers");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addOffer = async (e) => {
    e.preventDefault();

    if (
      !newOffer.title ||
      !newOffer.description ||
      !newOffer.imageUrl ||
      !newOffer.buttonText
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/add-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });

      if (res.ok) {
        toast.success("Offer added successfully");
        fetchOffers();
        setNewOffer({
          title: "",
          description: "",
          imageUrl: "",
          buttonText: "",
        });
        setIsAddModalOpen(false);
        setImageFile(null);
        setImagePreviewUrl("");
      } else {
        toast.error("Failed to add offer");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editOffer = async (e) => {
    e.preventDefault();

    if (
      !currentOffer.title ||
      !currentOffer.description ||
      !currentOffer.imageUrl ||
      !currentOffer.buttonText
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/update-offer/${currentOffer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOffer),
      });

      if (res.ok) {
        toast.success("Offer updated successfully");
        fetchOffers();
        setIsEditModalOpen(false);
        setCurrentOffer(null);
        setImageFile(null);
        setImagePreviewUrl("");
      } else {
        toast.error("Failed to update offer");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOfferEdit = (offer) => {
    setCurrentOffer(offer);
    setImagePreviewUrl(offer.imageUrl);
    setIsEditModalOpen(true);
  };

  const openConfirmDeleteModal = (offerId) => {
    setEditOfferId(offerId);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setEditOfferId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/delete-offer/${editOfferId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Offer deleted successfully");
        fetchOffers();
        closeConfirmDeleteModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <>
      <section className="fixed-container">
        <div className="py-5 max-w-screen-xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <nav className="text-sm font-medium text-gray-500 mb-4">
                <span className="text-red-600">Dashboard</span> / Manage Offers
              </nav>
              <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-600">
                Manage Offers
              </h1>
            </div>
            <div
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-2 md:px-4 md:py-2 py-1 rounded-lg text-white font-poppins font-medium bg-red-500 hover:bg-red-400 transform duration-300 cursor-pointer"
            >
              <FaPlusCircle className="text-xs md:text-sm" />
              <h2 className="text-xs md:text-sm">Add Offer</h2>
            </div>
          </div>
          <div className="grid  fixed-width grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="line-loader "></div>
            ) : (
              offers.map((offer) => (
                <div
                  key={offer._id}
                  className="bg-white p-5 m-2 sm:m-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 transform transition-transform duration-200 "
                >
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className=" w-full object-cover object-center rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-2">{offer.title}</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    {offer.description}
                  </p>
                  <button className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300">
                    {offer.buttonText}
                  </button>
                  <div className="absolute top-2 right-2 flex space-x-2 bg-gray-100 p-2 rounded-lg">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleOfferEdit(offer)}
                      size={24}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => openConfirmDeleteModal(offer._id)}
                      size={24}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Add Offer Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          isAddModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-white p-8  rounded-lg w-96 shadow-lg  ">
          <div className="flex justify-between items-center mb-6  ">
            <h2 className="text-xl font-bold">Add Offer</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setIsAddModalOpen(false)}
            />
          </div>
          <form onSubmit={addOffer}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Offer Title
              </label>
              <input
                type="text"
                placeholder="Offer Title"
                className="mt-1 p-2  block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                value={newOffer.title}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Description"
                className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                rows="4"
                value={newOffer.description}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                onChange={handleImageChange}
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="mt-4 h-32 object-cover rounded-md"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Button Text
              </label>
              <input
                placeholder="Button Text"
                type="text"
                className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                value={newOffer.buttonText}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, buttonText: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-red-500 hover:text-red-600 font-medium mr-4"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300"
              >
                Add Offer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Offer Modal */}
      <div
        className={`fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          isEditModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-white  p-8 rounded-lg w-96 shadow-lg">
          <div className="flex justify-between items-center mb-6 ">
            <h2 className="text-xl font-bold">Edit Offer</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setIsEditModalOpen(false)}
            />
          </div>
          <form
            onSubmit={editOffer}
            className="overflow-y-auto max-h-[calc(100vh-80px)]"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Offer Title
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                value={currentOffer?.title || ""}
                onChange={(e) =>
                  setCurrentOffer({ ...currentOffer, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                rows="4"
                value={currentOffer?.description || ""}
                onChange={(e) =>
                  setCurrentOffer({
                    ...currentOffer,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                className="mt-1 p-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                onChange={handleImageChange}
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="mt-4 h-32  object-cover rounded-md"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Button Text
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md  sm:text-sm focus:border-red-500 focus:ring-red-500"
                value={currentOffer?.buttonText || ""}
                onChange={(e) =>
                  setCurrentOffer({
                    ...currentOffer,
                    buttonText: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-red-500 hover:text-red-600 font-medium mr-4"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300"
              >
                Update Offer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
          confirmDeleteModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this offer?
            </h2>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={closeConfirmDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOffers;
