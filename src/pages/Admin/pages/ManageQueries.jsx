import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);
  const [queryToReply, setQueryToReply] = useState(null);
  const [replyForm, setReplyForm] = useState({
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false); // New state for loading

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/get-queries");

      if (!response.ok) {
        toast.error("Something went wrong! Cannot fetch queries.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setQueries(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const openConfirmDeleteModal = (query) => {
    setQueryToDelete(query);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setQueryToDelete(null);
  };

  const openReplyModal = (query) => {
    setQueryToReply(query);
    setReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyModalOpen(false);
    setQueryToReply(null);
    setReplyForm({ subject: "", message: "" });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/admin/delete-query/${queryToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error("Failed to delete query. Please try again.");
        return;
      }

      toast.success("Query deleted successfully.");
      setQueries(queries.filter((query) => query._id !== queryToDelete._id));
      closeConfirmDeleteModal();
    } catch (error) {
      toast.error("Failed to delete query. Please try again.");
    }
  };

  const handleReplyChange = (e) => {
    setReplyForm({ ...replyForm, [e.target.name]: e.target.value });
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyForm.subject || !replyForm.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSending(true); // Set loading to true

    try {
      const response = await fetch(`/api/admin/reply-query/${queryToReply._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...replyForm,
          receiverEmail: queryToReply.email,
          status: "replied", 
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Reply sent successfully!");
        fetchQueries();
        closeReplyModal();
      } else {
        toast.error("Failed to send reply. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsSending(false); // Reset loading state
    }
  };

  return (
    <section className="fixed-container">
      <div className="max-w-screen-xl mx-auto py-5">
        <nav className="text-sm font-medium text-gray-500 mb-4">
          <span className="text-red-600">Dashboard</span> / Manage Queries
        </nav>
        <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-500">
          Manage Queries
        </h1>

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
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(queries || []).map((query) => (
                  <tr key={query._id}>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {query.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4 text-sm text-gray-500">
                      {query.status === "pending" && (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => openReplyModal(query)}
                        >
                          Reply
                        </button>
                      )}
                      {query.status !== "pending" && (
                        <span className="text-green-500">Replied</span>
                      )}
                      <span className="border-l-2 h-8 border-gray-300"></span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openConfirmDeleteModal(query)}
                      >
                        <MdDelete size={23} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteModalOpen && (
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
            <p className="mb-4">Are you sure you want to delete this query?</p>
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

      {/* Reply Modal */}
      {replyModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
            replyModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-md transform transition-transform duration-300 ${
              replyModalOpen ? "scale-100" : "scale-95"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reply to Query</h2>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={closeReplyModal}
              />
            </div>
            <form onSubmit={handleReplySubmit}>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={replyForm.subject}
                  onChange={handleReplyChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter message"
                  name="message"
                  value={replyForm.message}
                  onChange={handleReplyChange}
                  rows="4"
                  className="border border-gray-300 rounded-md p-2 w-full"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transform duration-300 flex items-center ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSending} // Disable button while sending
                >
                  {isSending ? (
                    <div className="loader mr-2"></div> // Add a spinner here
                  ) : (
                    <FaPaperPlane className="mr-2" />
                  )}
                  Send
                </button>
                <button
                  type="button"
                  onClick={closeReplyModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transform duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageQueries;
