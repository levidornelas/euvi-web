// Função que escolhe um ícone do mapa para cada tipo de mídia; COMEÇAR COM LETRA MAIUSCULA !!
export const getImageForMediaType = (mediaType) => {
  switch (mediaType) {
    case 'Filmes':
      return '/films.svg' // Imagem para filme
    case 'Livros':
      return '/books.svg'
    case 'Músicas':
      return '/music.svg'
    default:
      return null;
  }
};