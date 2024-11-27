import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { fetchMediaItems } from "../components/consume_api";
import { getImageForMediaType } from "../components/getimage";

// Função para criar ícone dinâmico
const createIcon = (mediaType) => {
  return new L.Icon({
    iconUrl: getImageForMediaType(mediaType),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
};

export default function MediaMap() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="h-full w-full relative">
      <div className="absolute bottom-16 left-0 right-0 z-[1000] px-3">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="w-full p-2 rounded-lg shadow-lg border border-blue-300 bg-white/90 backdrop-blur-s"
        />
      </div>

      <div className="h-full w-full">
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
                <strong>{item.title}</strong>
                <br />
                Tipo: {item.media_type}
                <br />
                <button
                  className="text-blue-500 underline"
                  onClick={() => navigate(`/details/${item.id}`)}
                >
                  Ver detalhes
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
