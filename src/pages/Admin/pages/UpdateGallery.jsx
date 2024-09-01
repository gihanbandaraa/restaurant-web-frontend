import React, { useState, useEffect, useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import { app } from "../../../firebase";
import { FileDrop } from "react-file-drop";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UpdateGallery = () => {
  const storage = getStorage(app);
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [deletingImage, setDeletingImage] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uploadTaskRef = useRef(null);

  // Handle dropped files
  const handleDrop = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setImage(file);
      } else {
        handleShowAlert("error", "The selected file is not an image.");
        setImage(null);
      }
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      handleDrop(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      handleShowAlert("error", "Please select an image to upload!");
      return;
    }

    const storageRef = ref(storage, `gallery/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTaskRef.current = uploadTask;

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        handleShowAlert("error", "Image upload failed!");
        setUploading(false);
        setUploadProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
          try {
            const res = await fetch("/api/admin/add-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ imageUrl }),
            });
            const data = await res.json();
            if (res.ok) {
              handleShowAlert("success", "Image uploaded successfully!");
              setImageUrls((prev) => [...prev, imageUrl]);
              setImage(null);
            } else {
              handleShowAlert(
                "error",
                data.message || "Failed to store the image link."
              );
            }
          } catch (error) {
            handleShowAlert("error", "Something went wrong!");
          } finally {
            setUploading(false);
            setUploadProgress(0);
          }
        });
      }
    );
  };

  const handleCancel = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
    }
    setImage(null);
    setUploading(false);
    setUploadProgress(0);
  };

  const openConfirmDeleteModal = (imageId, imageUrl) => {
    setDeletingImage({ id: imageId, url: imageUrl });
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setDeletingImage(null);
    setConfirmDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingImage) return;
    try {
      // Remove from your database
      const res = await fetch(`/api/admin/delete-image/${deletingImage.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        handleShowAlert("success", "Image deleted successfully!");
        setImageUrls((prev) => prev.filter((url) => url !== deletingImage.url));
        setImageIds((prev) =>
          prev.filter((imageId) => imageId !== deletingImage.id)
        );
        closeConfirmDeleteModal();
      } else {
        const data = await res.json();
        handleShowAlert("error", data.message || "Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
      handleShowAlert("error", "Failed to delete the image.");
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const res = await fetch("/api/admin/get-images");
      const data = await res.json();
      if (res.ok) {
        const validImageUrls = data.map((img) => img.imageUrl);
        const validImageIds = data.map((img) => img._id);
        setImageUrls(validImageUrls);
        setImageIds(validImageIds);
      } else {
        handleShowAlert("error", "Failed to load gallery images.");
      }
    } catch (error) {
      handleShowAlert("error", "Something went wrong while loading images!");
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <section className="fixed-container ">
      <Alert
        type={alertInfo.type}
        message={alertInfo.message}
        showAlert={alertInfo.showAlert}
        onClose={handleCloseAlert}
      />
      <div className="max-w-screen-xl mx-auto py-5 ">
        <nav className="text-sm font-medium text-gray-500 mb-4">
          <span className="text-red-600">Dashboard</span> / Manage Gallery
        </nav>
        <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-500">
          Manage Gallery
        </h1>

        <div
          className="flex flex-col  items-center mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current.click()}
        >
          <FileDrop onDrop={handleDrop}>
            <p className="text-gray-500">
              Drag & drop an image here, or click to select one
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            {image && (
              <p className="mt-2 text-gray-700">Selected file: {image.name}</p>
            )}
          </FileDrop>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleUpload}
            disabled={!image || uploading}
            className={`py-2 px-4 rounded-lg text-white transition ${
              uploading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <button
            onClick={handleCancel}
            disabled={!image || !uploading}
            className="py-2 px-4 rounded-lg bg-gray-400 text-white transition hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
        {uploadProgress > 0 && (
          <div className="mt-2 w-full relative">
            <div
              className="absolute top-0 left-0 h-2 bg-red-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {imageUrls.length > 0 ? (
            imageUrls.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaTrash
                    onClick={() =>
                      openConfirmDeleteModal(imageIds[index], imageUrl)
                    }
                    className="text-white text-2xl cursor-pointer"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No images found in the gallery.</p>
          )}
        </div>

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
            <p className="mb-4">Are you sure you want to delete this image?</p>
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
    </section>
  );
};

export default UpdateGallery;
