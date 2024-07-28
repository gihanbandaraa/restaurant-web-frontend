import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const offers = [
  {
    id: 1,
    image: "https://media.istockphoto.com/id/940891760/vector/discount-20-background-with-brush-strokes.jpg?s=612x612&w=0&k=20&c=9u0ar0h2zbCB9KM1OCPCZC96GRHjm1ME3bS-fn7Y43U=",
    title: "Discount on Dine-In",
    description: "Enjoy 20% off on all dine-in orders this weekend.",
    buttonText: "Get Offer",
  },
  {
    id: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzaGmPC6mXH-MXsbSEXHWobU-WQXCmROInw&s",
    title: "Free Dessert",
    description: "Get a free dessert with every main course.",
    buttonText: "Claim Now",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnVw92FdVozhM1VO4C5rGycrWVSQkzh6aVA&s",
    title: "Happy Hour",
    description: "50% off on all drinks from 5 PM to 7 PM.",
    buttonText: "Join Us",
  },
];

const Offers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint:650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="mt-10 py-10 flex flex-col items-center justify-center w-full overflow-hidden">
      <div className="text-center">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          Special Offers
        </p>
        <h2 className="text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
          Check Our <span className="text-red-500">Offers</span>
        </h2>
        <p className="text-sm font-semibold mb-10 max-w-lg mx-auto text-gray-500">
          Enjoy our exclusive deals and discounts available for a limited time.
          Don't miss out on our Happy Hour specials!
        </p>
      </div>

      <div className="max-w-screen-lg w-full">
        <Slider {...settings} className="w-full">
          {offers.map((offer) => (
            <div key={offer.id} className="p-2 box-border">
              <div className="bg-gray-100 p-5 m-2 sm:m-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 transform transition-transform duration-200">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full object-cover object-center rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {offer.description}
                </p>
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition-colors">
                  {offer.buttonText}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
