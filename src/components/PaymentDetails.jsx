import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'; // Import CSS

const PaymentDetails = ({ onPaymentSuccess }) => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handlePayNow = () => {
    // Call the onPaymentSuccess function passed as a prop
    onPaymentSuccess();
  };

  return (
    <div className="max-w-md mx-auto ">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form className="mt-4">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Name on Card</label>
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Expiration Date</label>
            <input
              type="number"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">CVC</label>
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handlePayNow}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;
