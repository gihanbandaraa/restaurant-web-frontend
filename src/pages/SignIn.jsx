import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaLock,
  FaRegEnvelope,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput"; // Import the new TextInput component
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { alertInfo, handleShowAlert, handleCloseAlert } = useAlert();
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      handleShowAlert("error", "Please fill all fields!");
      return;
    }
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        handleShowAlert("error", data.message);
      }
      if (res.ok) {
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="h-screen w-full relative">
      <Alert
        type={alertInfo.type}
        message={alertInfo.message}
        showAlert={alertInfo.showAlert}
        onClose={handleCloseAlert}
      />
      <img
        src="Images/back.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 mt-10 md:mt-10 lg:mt-12 text-center">
        <h1 className="font-bold text-xl md:text-3xl">Sign In</h1>
        <p className="font-semibold text-sm sm:text-base px-1 mt-2">
          More than <span className="text-red-500">750 recipes</span> from
          around the world
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput
              type="email"
              placeholder="Enter your email"
              icon={FaRegEnvelope}
              onChange={handleChange}
              id={"email"}
            />
            <div className="relative">
              <TextInput
                type={passwordShown ? "text" : "password"}
                placeholder="Enter your password"
                icon={FaLock}
                onChange={handleChange}
                id={"password"}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? (
                  <FaRegEye className="text-gray-400" size={18} />
                ) : (
                  <FaRegEyeSlash className="text-gray-400" size={18} />
                )}
              </div>
            </div>

            <div className="flex sm:items-center gap-2 flex-col sm:flex-row justify-between">
              <div>
                <input type="checkbox" id="remember" />
                <label
                  htmlFor="remember"
                  className="ml-2 text-xs sm:text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="bg-red-600 text-white font-bold w-full mt-1 px-4 py-2 rounded-full hover:bg-red-400 transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/sign-up"}
                className="text-red-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-xs font-medium text-gray-400">
              Sign in with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="bg-gray-200 rounded-full p-1">
              <FcGoogle className="text-2xl" />
            </div>
            <div className="bg-gray-200 rounded-full p-1">
              <FaFacebook className="text-2xl text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
