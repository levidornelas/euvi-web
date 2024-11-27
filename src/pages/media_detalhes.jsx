import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch('http://192.168.0.109:8000/api/media-items/');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const items = await response.json();
        const selectedItem = items.find((i) => i.id.toString() === id);

        if (!selectedItem) {
          throw new Error(`Item with ID ${id} not found`);
        }

        setItem(selectedItem);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        Item não encontrado.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h1>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Tipo:</span> {item.media_type}
          </p>
          {item.description && (
            <p className="text-gray-700">
              <span className="font-semibold">Descrição:</span> {item.description}
            </p>
          )}
          {item.image && (
            <div className="mt-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}