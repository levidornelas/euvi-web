export const fetchMediaItems = async (setMediaItems, setLoading, setError) => {
  try {
    const response = await fetch('http://192.168.0.102:8000/api/media-items/');
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