// Função que escolhe um ícone do mapa para cada tipo de mídia; COMEÇAR COM LETRA MAIUSCULA !!
export const getImageForMediaType = (mediaType) => {
  switch (mediaType) {
    case 'Filmes':
      return '/film.png' // Imagem para filme
    case 'Novelas':
      return '/logo.png'
    default:
      return null;
  }
};