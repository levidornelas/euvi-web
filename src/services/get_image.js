export const getImageForMediaType = (mediaType) => {
  switch (mediaType) {
    case 'Filmes':
      return '/films.svg' 
    case 'Livros':
      return '/books.svg'
    case 'Músicas':
      return '/music.svg'
    case 'Artes':
      return '/art.svg'
    default:
      return null;
  }
};