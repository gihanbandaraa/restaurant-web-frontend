import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
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
    fetchOrders();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
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

        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="line-loader"></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Order ID</th>
                    <th className="py-2 px-4 border">Customer Name</th>
                    <th className="py-2 px-4 border">Order Date</th>
                    <th className="py-2 px-4 border">Total Price</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-2 px-4 border text-center">
                        {order.orderId}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {order.name}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        Rs {order.totalPrice}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {order.status}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-5 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p>
                  <strong>Customer Name:</strong> {selectedOrder.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.phone}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.shippingAddress}
                </p>
                <p>
                  <strong>Order Items:</strong>
                </p>
                <ul className="mb-4">
                  {selectedOrder.menuItems.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.menuItemId.title} x {item.quantity}
                      </span>
                      <span>Rs {item.menuItemId.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total Price:</strong> Rs {selectedOrder.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Close
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Confirm Order
                  </button>
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
