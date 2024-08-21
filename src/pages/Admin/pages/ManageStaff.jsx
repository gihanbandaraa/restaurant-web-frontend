import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/get-all-staff");
        const data = await response.json();
        setStaff(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
    fetchStaff();
  }, []);

  const toggleModal = (staffMember = null) => {
    if (staffMember) {
      setSelectedStaff(staffMember);
      setFormData({
        username: staffMember.username,
        email: staffMember.email,
        password: "",
      });
    } else {
      setSelectedStaff(null);
      setFormData({ username: "", email: "", password: "" });
    }
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStaff) {
        await fetch(`/api/admin/update-staff-account/${selectedStaff._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        toast.success("Staff member updated successfully");
      } else {
        await fetch("/api/auth/create-staff-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        toast.success("Staff member added successfully");
      }
      setShowModal(false);
      setSelectedStaff(null);
      setFormData({ username: "", email: "", password: "" });

      const response = await fetch("/api/admin/get-all-staff");
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error("Error saving staff member:", error);
    }
  };

  const openConfirmDeleteModal = (id) => {
    setStaffToDelete(id);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setStaffToDelete(null);
    setConfirmDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`/api/admin/delete-staff-account/${staffToDelete}`, {
        method: "DELETE",
      });
      const response = await fetch("/api/admin/get-all-staff");
      const data = await response.json();
      setStaff(data);
      closeConfirmDeleteModal();
      toast.success("Staff member deleted successfully");
    } catch (error) {
      toast.error("Error deleting staff member");
    }
  };

  return (
    <section className="fixed-container">
      <div className="py-5 max-w-screen-xl mx-auto">
        <div className="flex flex-row justify-between items-center">
          <div>
            <nav className="text-sm font-medium text-gray-500 mb-4">
              <span className="text-red-600">Dashboard</span> / Manage Staff
            </nav>
            <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-600">
              Manage Staff
            </h1>
          </div>
          <div
            onClick={() => toggleModal()}
            className="flex items-center space-x-2 px-2 md:px-4 md:py-2 py-1 rounded-lg text-white font-poppins font-medium bg-red-500 hover:bg-red-400 transform duration-300 cursor-pointer"
          >
            <FaPlusCircle className="text-xs md:text-sm" />
            <h2 className="text-xs md:text-sm">Add Member</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="line-loader"></div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((member) => (
                  <tr key={member._id}>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4 text-sm text-gray-500">
                      <button
                        onClick={() => toggleModal(member)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaEdit size={24} />
                      </button>
                      <button
                        onClick={() => openConfirmDeleteModal(member._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal for adding/editing staff */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                {selectedStaff ? "Edit Staff Member" : "Add Staff Member"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                {!selectedStaff && (
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    {selectedStaff ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {confirmDeleteModalOpen && (
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
              <p className="mb-4">
                Are you sure you want to delete this staff member?
              </p>
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
        )}
      </div>
    </section>
  );
};

export default ManageStaff;
