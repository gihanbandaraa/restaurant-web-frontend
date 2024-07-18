import React from 'react'
import { CiLock } from "react-icons/ci";
import { FaFacebook, FaRegEnvelope, FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-screen w-full relative">
    <img
      src="Images/back.jpg"
      alt=""
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 mt-10 md:mt-10 lg:mt-12  text-center">
      <h1 className="font-bold text-xl md:text-3xl">Sign Up</h1>
      <p className="font-semibold text-sm sm:text-base px-1 mt-2">
        More than <span className="text-red-500">750 recipes</span> from
        around the world
      </p>
    </div>
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-sm w-full">
        <form className="space-y-4">
          <div>
            <div
              className="mt-1 items-center w-full 
            flex flex-row px-3 py-2 border gap-2 sm:gap-4
             border-gray-300 rounded-full shadow-sm 
              focus:ring focus:ring-indigo-200"
            >
              <FaRegUserCircle
                className="inline-block text-gray-400  "
                size={20}
              />
              <input
                type="text"
                className="focus:outline-none text-sm sm:text-base"
                placeholder="Enter your username"
              />
            </div>
            <div className="mt-4 items-center w-full flex flex-row px-3 py-2 border gap-2 sm:gap-4 border-gray-300 rounded-full shadow-sm  focus:ring focus:ring-indigo-200">
              <FaRegEnvelope
                className="inline-block text-gray-400"
                size={20}
              />
              <input
                type="email"
                className="focus:outline-none text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4 items-center w-full flex flex-row px-3 py-2 border gap-2 sm:gap-4 border-gray-300 rounded-full shadow-sm  focus:ring focus:ring-indigo-200">
              <CiLock className="inline-block text-gray-400" size={20} />
              <input
                type="password"
                className="focus:outline-none text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex sm:items-center gap-2 flex-col sm:flex-row  justify-between">
            <div>
              <input type="checkbox" id="remember" />
              <label
                htmlFor="remember"
                className="ml-2 text-xs sm:text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-600 text-white font-bold w-full mt-1 px-4 py-2 rounded-full hover:bg-red-400 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="text-red-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-xs font-medium text-gray-400">
            Sign up with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-200 rounded-full p-1 ">
            <FcGoogle className="text-2xl " />
          </div>
          <div className="bg-gray-200 rounded-full p-1 ">
            <FaFacebook className="text-2xl text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp