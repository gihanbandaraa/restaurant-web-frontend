import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/admin/get-offers"); // Assuming you have an endpoint for offers
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        toast.error("Failed to fetch offers");
      }
    };

    fetchOffers();
  }, []);

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
        breakpoint: 650,
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
        <h2 className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
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
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full object-cover object-center rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {offer.description}
                </p>
                <Link to={"/menu"}>
                  <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition-colors">
                    {offer.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
