import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/get-orders");
      if (!response.ok) {
        toast.error("Something went wrong!");
        return;
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleMarkAsReady = async (orderId) => {
    setUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/mark-order-as-ready/${orderId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        toast.error("Failed to mark order as ready.");
        return;
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
      await fetchOrders();
      setSelectedOrder(updatedOrder);
      toast.success("Order marked as ready.");
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to mark order as ready.");
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    setUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/mark-order-as-delivered/${orderId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        toast.error("Failed to mark order as delivered.");
        return;
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
      await fetchOrders();
      setSelectedOrder(updatedOrder);
      toast.success("Order marked as delivered.");
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to mark order as delivered.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="fixed-container">
      <div className="max-w-screen-xl mx-auto py-5">
        <nav className="text-sm font-medium text-gray-500 mb-4">
          <span className="text-red-600">Dashboard</span> / Manage Orders
        </nav>
        <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-500">
          Manage Orders
        </h1>

        <div>
          {loading ? (
            <div className="line-loader"></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-red-500 font-semibold">
                        {order.orderId}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 text-sm font-medium text-gray-900">
                        {order.name} <br />
                        {order.shippingAddress}
                        <br />
                        {order.phone}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Rs {order.totalPrice}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span
                          className={`text-white px-2 py-1 rounded-md ${
                            order.status === "Pending"
                              ? "bg-red-500"
                              : order.status === "Ready"
                              ? "bg-blue-500"
                              : order.status === "Delivered"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.paymentStatus}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white overflow-y-auto max-h-[calc(100vh-100px)] p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                  Order Details
                </h2>
                <p className="mb-2">
                  <strong className="text-gray-700">Customer Name:</strong>{" "}
                  {selectedOrder.name}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Email:</strong>{" "}
                  {selectedOrder.email}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Phone:</strong>{" "}
                  {selectedOrder.phone}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Address:</strong>{" "}
                  {selectedOrder.shippingAddress}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Order Items:</strong>
                </p>
                <ul className="mb-4 space-y-4">
                  {selectedOrder.menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.menuItemId.imageUrl}
                        alt={item.menuItemId.title}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <span className="block text-gray-700 font-medium">
                          {item.menuItemId.title} x {item.quantity}
                        </span>
                        <span className="block text-gray-900 font-semibold">
                          Rs {item.menuItemId.price * item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mb-2">
                  <strong className="text-gray-700">Total Price:</strong> Rs{" "}
                  {selectedOrder.totalPrice}
                </p>
                <p className="mb-4">
                  <strong className="text-gray-700">Status:</strong>
                  <span
                    className={`text-white mx-1 px-2 py-1 rounded-md ${
                      selectedOrder.status === "Pending"
                        ? "bg-red-500"
                        : selectedOrder.status === "Ready for Pickup"
                        ? "bg-blue-500"
                        : selectedOrder.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {" "}
                    {selectedOrder.status}
                  </span>{" "}
                </p>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                  {selectedOrder.status === "Pending" && (
                    <button
                      onClick={() => handleMarkAsReady(selectedOrder._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Mark as Ready"}
                    </button>
                  )}
                  {selectedOrder.status === "Ready" && (
                    <button
                      onClick={() => handleMarkAsDelivered(selectedOrder._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Mark as Delivered"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageOrders;
