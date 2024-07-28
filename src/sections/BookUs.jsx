import React from "react";

const BookUs = () => {
  return (
    <div className="p-4">
      {/* Text Part */}
      <div className="flex items-center justify-center flex-col gap-4 text-center">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          Book Us Now
        </p>
        <h2 className="text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
          Reserve Your <span className="text-red-500">Spot</span>
        </h2>
        <p className="text-sm font-semibold mb-10 max-w-lg text-gray-500">
          Secure your place for a delightful dining experience or event with us.
          We look forward to serving you!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 mx-4 ">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1501014882647-fa3cef30d47d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGRlc3NlcnR8ZW58MHx8MHx8fDA%3D"
            alt="Dessert"
            className="w-full object-cover\"
          />
        </div>
        <div className="flex-1 bg-gray-100 p-5 ">
          <form className="space-y-4 lg:mt-20 ">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="p-2 border text-xs  border-gray-300 rounded outline-none w-full md:w-1/3"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="p-2 border text-xs  border-gray-300 rounded outline-none w-full md:w-1/3"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                className="p-2 border border-gray-300 text-xs  rounded outline-none w-full md:w-1/3"
              />
            </div>
            <div className="flex flex-col text-xs  md:flex-row justify-between gap-4">
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                className="p-2 border border-gray-300 text-xs rounded outline-none w-full md:w-1/3"
              />
              <input
                type="time"
                id="time"
                name="time"
                placeholder="time"
                className="p-2 border border-gray-300 rounded outline-none w-full md:w-1/3"
              />
              <input
                type="number"
                id="count"
                name="count"
                placeholder="Number of People"
                className="p-2 border border-gray-300 rounded outline-none w-full md:w-1/3"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="p-2 border text-xs  border-gray-300 rounded outline-none w-full h-24"
              ></textarea>
            </div>
            <button className="w-full  bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookUs;
