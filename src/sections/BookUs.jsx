import React, { useEffect, useState } from "react";
import moment from "moment";
import useAlert from "../hooks/useAlert"; // Assuming you have a custom useAlert hook
import Alert from "../components/Alert";

const BookUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    message: "",
    branch: "", // Added branch to the form data
  });

  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();
  const [minDate, setMinDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Set the minimum date to today
    const today = moment().format("YYYY-MM-DD");
    setMinDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      handleShowAlert("error", "Please enter a valid 10-digit phone number.");
      return;
    }
    if (formData.people <= 0) {
      handleShowAlert("error", "Please enter a valid number of people.");
      return;
    }

    const formattedDate = moment(formData.date).format("YYYY-MM-DD");

    const reservationData = {
      ...formData,
      date: formattedDate,
    };

    try {
      const response = await fetch("/api/user/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        handleShowAlert(
          "success",
          data.message || "Reservation made successfully!"
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          people: "",
          message: "",
          branch: "",
        });
      } else {
        handleShowAlert(
          "error",
          data.message || "Failed to make the reservation."
        );
      }
    } catch (error) {
      handleShowAlert("error", "Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <Alert
        type={alertInfo.type}
        message={alertInfo.message}
        showAlert={alertInfo.showAlert}
        onClose={handleCloseAlert}
      />
      <div className="flex items-center justify-center flex-col gap-4 text-center">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          Book Us Now
        </p>
        <h2 className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
          Reserve Your <span className="text-red-500">Spot</span>
        </h2>
        <p className="text-sm font-semibold mb-10 max-w-lg text-gray-500">
          Secure your place for a delightful dining experience or event with us.
          We look forward to serving you!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 mx-4">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1501014882647-fa3cef30d47d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGRlc3NlcnR8ZW58MHx8MHx8fDA%3D"
            alt="Dessert"
            className="w-full object-cover "
          />
        </div>
        <div className="flex-1 bg-gray-100 p-8">
          <form className="space-y-4 lg:mt-20" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-3 border text-xs border-gray-300 rounded outline-none w-full md:w-1/3"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border text-xs border-gray-300 rounded outline-none w-full md:w-1/3"
                required
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 border text-xs border-gray-300 rounded outline-none w-full md:w-1/3"
                required
              />
            </div>
            <div className="flex flex-col text-xs md:flex-row justify-between gap-4">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                min={minDate}
                onChange={handleChange}
                placeholder="Date"
                className="p-3 border border-gray-300 rounded outline-none w-full md:w-1/3"
                required
              />
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Time"
                className="p-3 border border-gray-300 rounded outline-none w-full md:w-1/3"
                required
              />
              <input
                type="number"
                id="people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                placeholder="Number of People"
                className="p-3 border border-gray-300 rounded outline-none w-full md:w-1/3"
                required
                min="1"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded outline-none w-full  text-xs"
                required
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Kandy">Kandy</option>
              </select>
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="p-3 border text-xs border-gray-300 rounded outline-none w-full h-24"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookUs;
