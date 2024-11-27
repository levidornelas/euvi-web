import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MapPin, Clock, Info, Star, ChevronLeft } from 'lucide-react';
import { fetchItemDetails } from '../components/fetch_details';
import SlickSlider from '../components/slick_slider';
import { Link } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadItemDetails = async () => {
      try {
        const selectedItem = await fetchItemDetails(id);
        setItem(selectedItem);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadItemDetails();
  }, [id]);

// Renderização de erros e Loading: 
  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="animate-pulse w-16 h-16 bg-blue-200 rounded-full mb-4"></div>
      <p className="text-gray-600 text-lg">Carregando detalhes...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-red-50">
      <div className="text-red-600 mb-4">
        <Info size={48} strokeWidth={1.5} />
      </div>
      <p className="text-red-700 text-lg">{error}</p>
    </div>
  );

  const renderNoItemState = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-gray-600 mb-4">
        <Info size={48} strokeWidth={1.5} />
      </div>
      <p className="text-gray-700 text-lg">Item não encontrado</p>
    </div>
  );

  // Definindo as três 'abas' em cada página de detalhes.
  const tabs = [
    { key: 'about', label: 'Sobre', icon: Info },
    { key: 'info', label: 'Informações', icon: MapPin },
    { key: 'reviews', label: 'Avaliações', icon: Star }
  ];

  // Renderizando as telas de loading, erro e Null.
  if (loading) return renderLoadingState();
  if (error) return renderErrorState();
  if (!item) return renderNoItemState();

  // Componente de criação da página de fato.
  return (
    <div className="relative bg-blue-200 min-h-screen">
      <div className="sticky top-0 z-10 bg-blue-500 text-white p-4 flex items-center">
        <button className="mr-4">
          <Link to={'/map'}>
            <ChevronLeft size={24} />
          </Link>
        </button>
        <h1 className="text-xl font-bold truncate flex-grow">{item.title}</h1>
        <div className="ml-auto">
          <img
            src="/rosa_.png"
            alt="Logo"
            className="w-12 h-12 mr-4 object-cover rounded-full"
          />
        </div>
      </div>
      {/* Container da imagem com tamanho reduzido */}
      <div className="mb-4 mx-4">
        <div className="relative w-full max-w-[300px] mx-auto overflow-hidden rounded-lg shadow-lg">
          <SlickSlider images={[item.local_image, item.film_image, item.other_image]} />
        </div>
      </div>

      <div className="px-4 max-h-[calc(100vh-200px)]">
        <div className="flex justify-between bg-blue-50 rounded-lg p-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center w-full py-2 rounded-lg transition-colors ${activeTab === tab.key
                ? 'bg-blue-500 text-white'
                : 'text-blue-700 hover:bg-blue-100'
                }`}
            >
              <tab.icon size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'about' && (
          <div className="space-y-4 overflow-hidden bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">História</h2>
            <p className="text-blue-600">{item.general_info}</p>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="bg-gray-100 p-4 rounded-lg overflow-y-visible">
            <h2 className="text-lg font-semibold mb-2">Detalhes Adicionais</h2>
            <p className="text-blue-600">{item.details}</p> <br />
            <div className="flex items-center space-x-2 text-blue-600">
              <MapPin size={20} />
              <span>{item.location || 'Localização não disponível'}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock size={20} />
              <span>{item.opening_hours || 'Horário não informado'}</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <Star size={48} className="mx-auto text-yellow-500 mb-4" />
            <p className="text-gray-600">Nenhuma avaliação disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}
