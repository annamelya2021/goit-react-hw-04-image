import {
  ImageGalleryItemSt,
  ImageGalleryImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, onClick }) => {
  return (
    <>
      {data.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItemSt key={id}>
          <ImageGalleryImage
            onClick={() => onClick(largeImageURL)}
            src={webformatURL}
            alt={tags}
          />
        </ImageGalleryItemSt>
      ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGalleryItem;
