import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "leaflet/dist/leaflet.css";
import { fetchMediaItems } from "../../services/consume_api";
import { getImageForMediaType } from '../../services/get_image'
import SlickSlider from "../../components/slick_slider";
import { CgPin } from "react-icons/cg";
import { MdOutlineSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import BottomNavbar from "../../components/nav_bar";

const createIcon = (mediaType) => {
  return new L.Icon({
    iconUrl: getImageForMediaType(mediaType),
    iconSize: [30, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const createUserLocationIcon = () => {
  return new L.Icon({
    iconUrl: "/user.svg",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export default function MediaMap() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentItems, setRecentItems] = useState(() => {
    const savedRecents = localStorage.getItem('recentItems');
    return savedRecents ? JSON.parse(savedRecents) : [];
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-8.05428, -34.8813]);
  const navigate = useNavigate();
  const [mapZoom, setMapZoom] = useState(14);

  useEffect(() => {
    setMapZoom(14); // Defina um zoom inicial se necessário
  }, []);

  const MapEventHandler = () => {
    useMapEvents({
      zoomend: (e) => {
        setMapZoom(e.target.getZoom());
      },
    });
    return null;
  };

  // Função atualizada para obter localização do usuário
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Atualiza tanto a localização do usuário quanto o centro do mapa
          setUserLocation({ latitude, longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log("Erro ao obter localização", error);
        }
      );
    } else {
      console.log("Geolocalização não é suportada pelo navegador.");
    }
  };

  useEffect(() => {
    fetchMediaItems(setMediaItems, setLoading, setError);
    getUserLocation(); // Obtém a localização quando o componente monta
  }, []);

  useEffect(() => {
    localStorage.setItem('recentItems', JSON.stringify(recentItems));
  }, [recentItems]);

  const getFilteredItems = () => {
    if (!searchQuery) return [];

    return mediaItems.filter((item) =>
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 2);
  };

  const handlePinClick = (item) => {
    setSelectedPin(item);

    setRecentItems((prevItems) => {
      const isItemInRecents = prevItems.some((recent) => recent.id === item.id);
      if (isItemInRecents) return prevItems;

      const newRecentItems = [item, ...prevItems].slice(0, 2);
      localStorage.setItem('recentItems', JSON.stringify(newRecentItems));
      return newRecentItems;
    });

    setIsVisible(false);
  };

  const handleCloseDetails = () => {
    setSelectedPin(null);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 1170);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-200 rounded-full mb-8"></div>
        <p className="text-white text-lg">Aguarde, o mapa está carregando...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Erro: {error}</div>;
  }

  const filteredItems = getFilteredItems();
  const showRecents = !searchQuery && recentItems.length > 0;

  return (
    <>
      <div className="flex flex-col h-screen w-full md:overflow-y-hidden sm:overflow-visible">
        <div className="relative flex-grow w-full">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="h-full w-full z-0"
            attributionControl={true}
          >
            <MapEventHandler />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mediaItems.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={createIcon(item.media_type)}
                eventHandlers={{
                  click: () => handlePinClick(item),
                }}
              >
                {mapZoom >= 14 && (
                  <Tooltip
                    permanent
                    direction="right"
                    offset={[15, -30]}
                    className="!bg-transparent !p-0 !border-none !shadow-none"
                  >
                    <div className="text-black text-xs font-semibold">{item.title}</div>
                  </Tooltip>
                )}
              </Marker>
            ))}

            {userLocation && (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={createUserLocationIcon()}
              >
                <Popup>Você está aqui</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <AnimatePresence>
          {selectedPin && (
            <motion.div
              className="bg-gray-100 p-4 w-full shadow-md relative"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              <button
                onClick={handleCloseDetails}
                className="absolute top-5 right-2 text-black text-2xl"
              >
                <IoClose />
              </button>

              <div className="text-black top-4">
                <h1 className="text-2xl font-medium top-4 mb-3">{selectedPin.location}</h1>
                <SlickSlider
                  images={[selectedPin.imagem_cartaz, selectedPin.imagem_obra, selectedPin.imagem_local]}
                  captions={[selectedPin.legenda_1, selectedPin.legenda_2, selectedPin.legenda_3]}
                />

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => navigate(`/details/${selectedPin.id}`)}
                    className="bg-[#0650FF] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-lg px-32 sm:px-24 md:px-36 py-4 text-white hover:bg-blue-600"
                  >
                    Descobrir
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isVisible && (
          <div className="flex flex-col">
            <div className="bg-gray-100 p-4 sm:p-4 shadow-lg w-full h-64 sm:h-64">
              <div className="relative w-full max-w-3xl mx-auto">
                <div className="relative w-full">
                  <div className="absolute top-0 left-0 flex items-center pl-5 h-full">
                    <MdOutlineSearch className="text-slate-500 text-xl" />
                  </div>
                  <input
                    type="text"
                    placeholder="Pesquise aqui"
                    className="w-full p-4 pl-14 rounded-full border-2 border-blue-500 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-4 max-h-40 sm:max-h-60 overflow-y-auto lg:max-h-full">
                {showRecents && (
                  <>
                    <div className="flex items-center mb-2 sm:mb-2">
                      <h1 className="text-lg font-semibold">Recentes</h1>
                    </div>
                    {recentItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-full rounded-full p-4 mb-2 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-300 bg-gray-100 overflow-y-visible"
                        onClick={() => handlePinClick(item)}
                      >
                        <div className="flex items-center space-x-3">
                          <CgPin className="text-blue-500 text-lg" />
                          <span className="text-gray-800 text-base sm:text-base">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {filteredItems.length > 0 && (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="w-full rounded-full p-4 sm:p-3 mb-2 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-200"
                      onClick={() => handlePinClick(item)}
                    >
                      <div className="flex items-center space-x-3">
                        <CgPin className="text-blue-500 text-lg" />
                        <span className="text-gray-800 text-base sm:text-base">{item.title}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <BottomNavbar />
          </div>
        )}
      </div>
    </>
  );
}