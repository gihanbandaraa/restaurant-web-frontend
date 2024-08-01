import React from 'react'

const Contact = () => {
  return (
    <div className="container py-10 mx-auto px-6">
    <div className="text-center mb-12">
      <p className="font-bold font-montserrat text-sm text-gray-500">CONTACT US</p>
      <h2 className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
        Get in <span className="text-red-500">Touch</span> with Us
      </h2>
      <p className="text-sm font-semibold mb-2 max-w-lg mx-auto text-gray-500">
        We'd love to hear from you! Fill out the form below to send us a message.
      </p>
    </div>
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Contact