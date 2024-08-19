import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("api/admin/orders");
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

  return (
    <section className="fixed-container">
      <div className="max-w-screen-xl mx-auto py-5">
        <h1 className="text-lg font-bold mb-6 font-montserrat">
          Manage Orders
        </h1>
      </div>
    </section>
  );
};

export default ManageOrders;
