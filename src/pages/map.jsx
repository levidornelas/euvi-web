import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; 
import "leaflet/dist/leaflet.css";
import { fetchMediaItems } from "../components/consume_api";
import { getImageForMediaType } from "../components/get_image";

// Função para criar ícone dinâmico
const createIcon = (mediaType) => {
  return new L.Icon({
    iconUrl: getImageForMediaType(mediaType),
    iconSize: [45, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export default function MediaMap() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // Estado para o texto de busca
  const navigate = useNavigate();

  useEffect(() => {
    fetchMediaItems(setMediaItems, setLoading, setError);
  }, []);

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (error) {
    return <div className="p-4">Erro: {error}</div>;
  }

  return (
    <div className="h-full w-full relative flex flex-col">
      {/* Barra de pesquisa fixa no topo */}
      <div className="bg-gray-700 p-4 shadow-lg w-full">
        <div className="relative w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Exemplo: Retratos Fantasmas"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-4 pl-10 rounded-full border-2 border-blue-500 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {/* Ícone de pesquisa */}
          <div className="absolute top-0 left-0 flex items-center pl-3 h-full">
            <FaSearch className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 w-full">
        <MapContainer
          center={[-8.05428, -34.8813]}
          zoom={13}
          className="h-full w-full"
          attributionControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mediaItems.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={createIcon(item.media_type)}
            >
              <Popup>
                {/* Title Styling */}
                <div className="flex flex-col space-y-2">
                  <strong className="text-lg font-semibold text-blue-600">{item.title}</strong>

                  {/* Media Type */}
                  <span className="text-sm text-gray-500">{item.media_type} do recife</span>

                  {/* Action Button */}
                  <button
                    className="mt-3 w-full py-2 px-4 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => navigate(`/details/${item.id}`)}
                  >
                    Descobrir
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
