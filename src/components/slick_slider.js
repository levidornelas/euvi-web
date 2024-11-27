// Slider para o carrossel de imagem em media_detalhes.jsx

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
        <div
          key={index}
          className="relative w-full"
        >
          <div className="w-full h-[300px] overflow-hidden rounded-lg border-4 border-gray-300 shadow-lg">
            <img
              src={url}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
