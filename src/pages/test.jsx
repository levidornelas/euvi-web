import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MuseumUI = () => {
  const [activeTab, setActiveTab] = useState(0);

  const imageUrls = [
    '/film.png',
    '/logo.png',
    '/logo192.png',
  ];

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
    <div className="container mx-auto py-24">
      <div className="mb-6">
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden rounded-lg border-10 border-white shadow-lg bg-white"
            >
              <img
                src={url}
                alt={`Museum ${index}`}
                className="w-4/5 h-4/5 object-cover mx-auto my-auto"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(0)}
          >
            Informações Gerais
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(1)}
          >
            Avaliações
          </button>
        </div>

        {activeTab === 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Museu do Homem do Nordeste</h2>
            <p>
              Inaugurado em 24 de Janeiro de 1979, o Museu do Homem do Nordeste tem como objetivo resgatar a história e as tradições da região Nordeste do Brasil. O museu apresenta uma coleção de peças que retratam as diversas manifestações culturais desta região, desde os períodos pré-históricos até a atualidade.
            </p>
          </div>
        )}

        {activeTab === 1 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Avaliações</h2>
            <p>Ainda não há avaliações disponíveis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumUI;
