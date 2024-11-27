// Captura o item pelo ID.
export const fetchItemDetails = async (id) => {
  try {
    const response = await fetch('http://192.168.0.102:8000/api/media-items/');
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const items = await response.json();
    const selectedItem = items.find((i) => i.id.toString() === id);

    if (!selectedItem) {
      throw new Error(`Item com ID ${id} não encontrado`);
    }

    return selectedItem;
  } catch (err) {
    throw new Error(err.message);
  }
};
