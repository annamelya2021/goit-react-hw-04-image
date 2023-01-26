import { ImageGallerySt } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ data, onClick }) => {
  return (
    <ImageGallerySt>
      <ImageGalleryItem data={data} onClick={onClick} />
    </ImageGallerySt>
  );
};
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ImageGallery;
