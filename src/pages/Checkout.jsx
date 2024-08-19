import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantity,
  clearCart,
} from "../redux/cart/cartSlice";

import ReactLoading from "react-loading";

import PaymentDetails from "../components/PaymentDetails";

const generateOrderId = () => {
  return "#" + Math.random().toString(36).substring(2, 9).toUpperCase();
};

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    shippingAddress: "",
    city: "",
    branch: "",
    specialNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showPayment, setShowPayment] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleCloseModal = () => {
    setShowPayment(false);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleProceedToPayment = async () => {
    if (
      !shippingDetails.name ||
      !shippingDetails.phone ||
      !shippingDetails.email ||
      !shippingDetails.shippingAddress ||
      !shippingDetails.city ||
      !shippingDetails.branch
    ) {
      return toast.error("Please fill in all the fields!");
    }

    // Generate order data
    const orderData = {
      user: currentUser._id,
      orderId: generateOrderId(),
      name: shippingDetails.name,
      email: shippingDetails.email,
      menuItems: cartItems.map((item) => ({
        menuItemId: item._id,
        quantity: item.quantity,
      })),
      shippingAddress: shippingDetails.shippingAddress,
      specialNotes: shippingDetails.specialNotes,
      city: shippingDetails.city,
      phone: shippingDetails.phone,
      status: "Pending",
      totalPrice: cartTotal,
      paymentStatus: paymentMethod === "card" ? "Paid" : "COD",
      branch: shippingDetails.branch,
    };

    setLoading(true);

    try {
      await fetch("/api/admin/add-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      toast.success("Order placed successfully!");
      navigate("/order-confirmation");
      setTimeout(() => {
        dispatch(clearCart());
      }, 5000);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setShowPayment(false);
    }
  };

  const handleProceedClick = () => {
    if (paymentMethod === "card") {
      setShowPayment(true);
    } else {
      handleProceedToPayment();
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" border-r-2 p-10  ">
          <h3 className="text-xl font-medium mb-4">Shipping Details</h3>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Contact Number</label>
            <input
              type="number"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your contact number"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="shippingAddress"
              value={shippingDetails.shippingAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your city"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Branch</label>
            <select
              name="branch"
              value={shippingDetails.branch}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="" disabled>
                Select your branch
              </option>
              <option value="Colombo">Colombo</option>
              <option value="Galle">Galle</option>
              <option value="Kandy">Kandy</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Special Notes</label>
            <textarea
              type="text"
              name="specialNotes"
              value={shippingDetails.specialNotes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter if there any special notes"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center">
                <div className="flex items-center">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="font-semibold text-red-500 font-montserrat">
                      Rs.{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(addItemToCart(item))}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md mr-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(reduceItemQuantity(item._id))}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md mr-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(removeItemFromCart(item._id))}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>Rs.{cartTotal}</span>
            </div>
          </div>

          <div className="my-6">
            <label className="block mb-2 font-medium text-lg">
              Select Payment Method
            </label>
            <div className="flex gap-4 mb-4">
              <div
                onClick={() => handlePaymentMethodChange("card")}
                className={`cursor-pointer p-4 border rounded-lg text-center flex-1 ${
                  paymentMethod === "card"
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300"
                }`}
              >
                <div className="font-medium text-sm md:font-base">
                  Credit/Debit Card
                </div>
              </div>
              <div
                onClick={() => handlePaymentMethodChange("cash")}
                className={`cursor-pointer p-4 border rounded-lg text-center flex-1 ${
                  paymentMethod === "cash"
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300"
                }`}
              >
                <div className="font-medium text-sm md:font-base">
                  Cash on Delivery
                </div>
              </div>
            </div>
            <button
              onClick={handleProceedClick}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
      {showPayment && paymentMethod === "card" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <PaymentDetails onPaymentSuccess={handleProceedToPayment} />
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ReactLoading
            type={"spin"}
            color={"#ffffff"}
            height={50}
            width={50}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
