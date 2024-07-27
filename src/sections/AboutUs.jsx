import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-4">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          ABOUT US
        </p>
        <h2 className="font-extrabold text-gray-800 font-poppins text-2xl md:text-4xl">
          Learn More <span className="text-red-500">About Us</span>
        </h2>
      </div>

      <div className="mt-10 m-5 flex gap-4 md:gap-8 flex-col-reverse md:flex-row ">
        {/*Left Div*/}
        <div>
          <div className="group overflow-hidden cursor-pointer">
            <img
              src="/Images/restaurant4.jpg"
              alt="restaurant"
              className="transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <div className="p-5 m-2 border-gray-400 border-2 flex items-center justify-center flex-col mt-4 ">
            <h3 className="text-xl font-bold text-gray-800 font-montserrat">
              Book A Table
            </h3>
            <p className="text-2xl md:text-3xl font-semibold mt-2 font-poppins text-red-500">
              +94 71 123 4567DF
            </p>
          </div>
          <h2 className="font-montserrat text-sm font-bold mt-4">
            Our Philosophy
          </h2>
          <p className="font-montserrat text-sm mt-2">
            We use the freshest local ingredients and support sustainable
            practices. Our menu features a variety of traditional dishes, each
            crafted with care and passion. We believe dining is about more than
            just food; it’s about sharing stories and creating memories
          </p>
          <h2 className="font-montserrat text-sm font-bold mt-4">Join Us</h2>
          <p className="font-montserrat text-sm mt-2">
            Come and enjoy the flavors of Sri Lanka at Serendib Savor. We look
            forward to welcoming you and sharing our love for Sri Lankan
            cuisine.
          </p>
          <button className="mt-5 bg-red-500 font-medium text-white px-5 py-2 rounded-md hover:bg-red-400">
            Get Started
          </button>
        </div>

        {/*Right Div*/}
        <div className="flex flex-col-reverse gap-4 md:gap-2 md:flex-col">
          <div>
            <h2 className="font-montserrat text-sm font-bold">
              Welcome to Serendib Savor
            </h2>
            <p className="font-montserrat text-sm mt-2">
              At Serendib Savor, we are dedicated to bringing the authentic
              flavors of Sri Lanka to your table. Our journey started with a
              love for Sri Lankan cuisine and a passion for sharing it with our
              community.
            </p>
            <h2 className="font-montserrat text-sm font-bold mt-4">
              Our Story
            </h2>
            <p className="font-montserrat text-sm mt-2">
              Founded by a group of food enthusiasts, Serendib Savor was born
              from our travels across Sri Lanka, gathering recipes and learning
              the secrets of authentic Sri Lankan cooking. We strive to offer a
              unique dining experience that reflects the rich cultural heritage
              of our beloved island.
            </p>
          </div>
          <div className="group overflow-hidden mt-2 cursor-pointer">
            <img
              src="/Images/restaurant2.jpg"
              alt="restaurant"
              className="transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
