import React, { useState, useEffect } from "react";
import useAlert from "../../../hooks/useAlert";
import Alert from "../../../components/Alert";
import ConfirmModal from "../../../components/ConfirmModal";

const ManageReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [modalType, setModalType] = useState(""); // "confirm" or "reject"

  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();

  const openConfirmModal = (reservation, type) => {
    setSelectedReservationId(reservation._id);
    setModalType(type);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/admin/get-reservations");
        if (!response.ok) {
          handleShowAlert(
            "error",
            "Failed to load reservations. Please try again later."
          );
          return;
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        handleShowAlert(
          "error",
          "Failed to load reservations. Please try again later."
        );
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleConfirm = async (id) => {
    try {
      const response = await fetch(`/api/admin/confirm-reservation/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        handleShowAlert(
          "error",
          "Failed to confirm reservation. Please try again later."
        );
        return;
      }
      const data = await response.json();
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === id
            ? { ...reservation, status: "confirmed" }
            : reservation
        )
      );
      handleShowAlert(
        "success",
        data.message || "Reservation confirmed successfully!"
      );
    } catch (error) {
      handleShowAlert(
        "error",
        "Failed to confirm reservation. Please try again later."
      );
      console.error("Failed to confirm reservation:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`/api/admin/reject-reservation/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        handleShowAlert(
          "error",
          "Failed to reject reservation. Please try again later."
        );
        return;
      }
      const data = await response.json();
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === id
            ? { ...reservation, status: "rejected" }
            : reservation
        )
      );
      handleShowAlert(
        "success",
        data.message || "Reservation rejected successfully!"
      );
    } catch (error) {
      handleShowAlert(
        "error",
        "Failed to reject reservation. Please try again later."
      );
      console.error("Failed to reject reservation:", error);
    }
  };

  return (
    <section className="fixed-container p-4">
      <div className="max-w-screen-xl mx-auto py-5">
        <h1 className="text-lg font-bold mb-6 font-montserrat">
          Manage Reservations
        </h1>

        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          showAlert={alertInfo.showAlert}
          onClose={handleCloseAlert}
          customPosition={"top-28"}
        />

        <div className="mt-6">
          {loading ? (
            <div className="line-loader"></div>
          ) : reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch
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
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation._id}
                      className="hover:bg-gray-50 transition duration-200 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reservation.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.people}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.status === "confirmed" ? (
                          <span className="text-green-600 font-semibold">
                            Confirmed
                          </span>
                        ) : reservation.status === "rejected" ? (
                          <span className="text-red-600 font-semibold">
                            Rejected
                          </span>
                        ) : (
                          "Pending"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        {reservation.status === "confirmed" ||
                        reservation.status === "rejected" ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ease-in-out"
                              disabled
                            >
                              Confirm
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                              disabled
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                openConfirmModal(reservation, "confirm")
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ease-in-out"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                openConfirmModal(reservation, "reject")
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selectedReservationId && modalType && (
                <ConfirmModal
                  title={
                    modalType === "confirm"
                      ? "Confirm Reservation"
                      : "Reject Reservation"
                  }
                  message={`Are you sure you want to ${modalType} this reservation?`}
                  onConfirm={() => {
                    if (modalType === "confirm") {
                      handleConfirm(selectedReservationId);
                    } else {
                      handleReject(selectedReservationId);
                    }
                    setSelectedReservationId(null);
                    setModalType("");
                  }}
                  onClose={() => setSelectedReservationId(null)}
                  isOpen={true}
                />
              )}
            </div>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageReservation;
