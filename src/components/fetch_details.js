export const fetchItemDetails = async (id) => {
  try {
    // Buscar o item específico diretamente usando o endpoint correto
    const response = await fetch(`https://euvi-backend.onrender.com/api/media-items/${id}/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const selectedItem = await response.json();

    // Buscar locais próximos relacionados
    const locaisResponse = await fetch(`https://euvi-backend.onrender.com/api/locais-proximos/?media_item=${id}`);
    if (!locaisResponse.ok) {
      throw new Error('Erro ao buscar locais próximos');
    }
    const locais = await locaisResponse.json();

    // Adicionar os locais próximos ao item
    selectedItem.locais = locais;

    return selectedItem;
  } catch (err) {
    throw new Error(err.message);
  }
};