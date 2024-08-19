import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  reduceItemQuantity,
  addItemToCart,
  selectCartItems,
  selectCartTotal,
} from "../redux/cart/cartSlice";
import { MdDelete, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/menu/checkout");
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0  z-50 transition-opacity duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div
        className={`bg-white shadow-lg max-w-[90vw] h-full md:max-w-md w-full p-6 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ right: 0, position: "fixed" }}
      >
        <div className="relative">
          <button
            onClick={handleCloseClick}
            className="absolute  right-4 text-gray-600 hover:text-gray-900"
          >
            <MdClose size={24} />
          </button>
          <h2 className="text-2xl font-montserrat font-bold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-xs md:text-base">
                        {item.title}
                      </h3>
                      <p className="font-bold text-xs md:text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-red-500">
                        Rs.{item.price * item.quantity}
                        {item.offers && (
                          <span> ({item.offers}% off)</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(reduceItemQuantity(item._id))}
                      className="px-2 py-1 font-bold bg-gray-200 rounded-lg"
                    >
                      -
                    </button>
                    <button
                      onClick={() => dispatch(addItemToCart(item))}
                      className="px-2 py-1 font-bold bg-gray-200 rounded-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeItemFromCart(item._id))}
                      className="px-2 py-2 font-montserrat font-bold text-sm bg-red-500 text-white rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <h3 className="text-xl text-end font-semibold">
                  Total: Rs.{cartTotal}
                </h3>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="px-4 py-2 font-medium text-xs md:text-base bg-gray-200 rounded-lg"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-4 py-2 font-medium text-xs md:text-base bg-red-500 text-white rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="font-montserrat font-medium mt-6">
              Your cart is empty. Add items to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
