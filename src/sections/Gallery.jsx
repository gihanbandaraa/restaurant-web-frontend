import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles

const images = [
  "Images/chef1.jpg",
  "Images/chef2.jpg",
  "Images/chef3.png",
  "Images/chef4.jpg",
];

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const Gallery = () => {
  return (
    <div className="border-b-2 border-gray-100 pb-8">
      <div className="flex mt-8 items-center justify-center flex-col gap-4 text-center">
        <p className="font-bold font-montserrat text-sm text-gray-500">
          GALLERY
        </p>
        <h2 className="text-3xl md:text-4xl mt-4 font-extrabold font-montserrat mb-4 text-gray-800">
          Explore Our <span className="text-red-500">Gallery</span>
        </h2>
        <p className="text-sm font-semibold mb-2 max-w-lg text-gray-500">
          Discover the delightful ambiance and exquisite dishes that await you
          at Serendib Savor. Join us for a visual feast!
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={image} alt={`Gallery ${index}`} className="w-80 h-80 object-cover object-center" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
