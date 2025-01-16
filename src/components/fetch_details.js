export const fetchItemDetails = async (id) => {
  try {
    // Buscar o item específico diretamente usando o endpoint correto
    const response = await fetch(`http://192.168.0.102:8000/api/media-items/${id}/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const selectedItem = await response.json();

    // Buscar locais próximos relacionados
    const locaisResponse = await fetch(`http://192.168.0.102:8000/api/locais-proximos/?media_item=${id}`);
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