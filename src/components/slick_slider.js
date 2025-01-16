import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = ({ images, captions }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
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
        <div key={index} className="relative w-full">
          <div className="w-full h-[370px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={url}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
            {captions && captions[index] && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                {captions[index]}
              </div>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
