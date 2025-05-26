export const fetchMediaItems = async (setMediaItems, setLoading, setError) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}media-items/`);
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