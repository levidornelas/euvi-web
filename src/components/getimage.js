export const getImageForMediaType = (mediaType) => {
  switch (mediaType) {
    case 'Filme':
      return '/film.png' // Imagem para filme
    case 'Novela':
      return '/logo.png'
    default:
      return null;
  }
};