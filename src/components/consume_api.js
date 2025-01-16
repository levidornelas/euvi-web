export const fetchMediaItems = async (setMediaItems, setLoading, setError) => {
  try {
    const response = await fetch('https://euvi-backend.onrender.com/api/media-items/');
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API');
    }
    const data = await response.json();
    setMediaItems(data);
    setLoading(false);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};