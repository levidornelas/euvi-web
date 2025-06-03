import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MapPin, Info, ChevronLeft, Link as LinkIcon } from 'lucide-react';
import { fetchItemDetails } from '../../services/fetch_details';
import SlickSlider from '../../components/slick_slider';
import { Link } from 'react-router-dom';
import ImageGallery from '../../components/image_gallery';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    return () => speechSynthesis.cancel(); // limpa ao desmontar
  }, []);

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

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-200 rounded-full mb-4"></div>
      <p className="text-white text-lg">Carregando detalhes...</p>
    </div>
  );

  const speak = (text) => {
    if (!text) return
    speechSynthesis.cancel()
    const textToSpeech = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(textToSpeech)
  }

  const renderError = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-red-50">
      <div className="text-red-600 mb-4">
        <Info size={48} strokeWidth={1.5} />
      </div>
      <p className="text-red-700 text-lg">{error}</p>
    </div>
  );

  const renderSemItem = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-gray-600 mb-4">
        <Info size={48} strokeWidth={1.5} />
      </div>
      <p className="text-gray-700 text-lg">Item não encontrado</p>
    </div>
  );

  const tabs = [
    { key: 'about', label: 'Sobre' },
    { key: 'author', label: 'Autor' },
    { key: 'info', label: 'Local' },
    { key: 'gallery', label: 'Galeria' },
  ];

  if (loading) return renderLoading();
  if (error) return renderError();
  if (!item) return renderSemItem();

  const galleryImages = [
    item.imagem_cartaz,
    item.imagem_local,
    item.imagem_obra,
    item.outra_imagem1,
    item.outra_imagem2,
    item.autor_imagem
  ].filter(Boolean);

  return (
    <div className="relative min-h-screen bg-gray-200 overflow-auto">
      <div className="sticky top-0 z-10 bg-[#0650FF] text-white p-4 flex items-center">
        <button className="mr-4">
          <Link to={'/map'}>
            <ChevronLeft size={24} />
          </Link>
        </button>
        <h1 className="text-xl font-bold truncate flex-grow">{item.title}</h1>
      </div>

      <div className="mb-4 mx-4">
        <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg mt-6 h-auto">
          <SlickSlider
            images={[item.imagem_cartaz, item.imagem_obra, item.imagem_local]}
            captions={[item.legenda_1, item.legenda_2, item.legenda_3]}
          />
        </div>
      </div>

      <div className="px-4 max-h">
        <div className="flex justify-between mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center transition-colors ${activeTab === tab.key ? 'text-blue-700' : 'text-black hover:text-blue-700'
                }`}
            >
              <span
                className={`text-sm mt-0 ml-0 inline-block pb-1 ${activeTab === tab.key
                  ? 'border-b-2 border-blue-700'
                  : 'border-b-2 border-transparent hover:border-blue-700'
                  }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        {activeTab === 'about' && (
          <div className="space-y-4 overflow-hidden bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-black">Sobre o espaço</h2>
            <button
              onClick={() => speak(item.general_info)}
              className="bg-[#0650FF] rounded-full p-3 text-white mt-4 hover:bg-blue-600"
            >
              🔊 Ouvir texto
            </button>
            {item.general_info ? (
              <>
                {item.general_info.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-black">{paragraph}</p>
                ))}
              </>
            ) : (
              <p className="text-black">Não há informações gerais disponíveis</p>
            )}
          </div>
        )}

        {activeTab === 'author' && (
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-black">{item.autor || 'Autor Desconhecido'}</h2>
            {item.autor_imagem && (
              <div className="mb-4">
                <img
                  src={item.autor_imagem}
                  alt={`Imagem de ${item.autor || 'Autor Desconhecido'}`}
                  className='rounded-lg'
                />
              </div>
            )}
            {item.autor_bio && (
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2 text-black">Biografia</h3>
                {item.autor_bio.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-black mb-2">{paragraph}</p>
                ))}
              </div>
            )}
            {item.obras && (
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2 text-black">Outras Obras</h3>
                <ul className="list-disc pl-6 text-black">
                  {item.obras.split("\n").map((obra, index) => (
                    <li key={index} className="mb-1">{obra.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.autor_link && (
              <div className="flex items-center space-x-2">
                <LinkIcon size={20} />
                <a
                  href={item.autor_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Mais sobre o autor
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <>
            <div className="bg-gray-200 p-4 rounded-lg overflow-y-visible">
              <h2 className="text-lg font-semibold mb-4 text-black">Informações gerais</h2>
              <div className="space-y-">
                <div className="flex items-center space-x-2 text-black">
                  <MapPin size={20} />
                  <span>{item.location || 'Localização não disponível'}</span>
                </div>
              </div>
            </div>
            {item.locais && item.locais.length > 0 && (
              <div className="bg-gray-200 p-4 rounded-lg mt-0">
                <h2 className="text-lg font-semibold mb-4 text-black">Locais Próximos</h2>
                {item.locais.map((local, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <h3 className="text-md font-semibold text-black">{local.name}</h3>
                    <p className="text-black">{local.description}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold p-4 text-black">Galeria</h2>
            <ImageGallery
              images={galleryImages}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
