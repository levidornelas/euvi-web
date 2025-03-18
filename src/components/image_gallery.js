const ImageGallery = ({ images, setSelectedImage }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => setSelectedImage(image)}
        >
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;