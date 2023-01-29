import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import fetchImages from '../services/API';
import { Notify } from 'notiflix';
import { Apps } from './App.styled';
function App() {
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [reqStatus, setReqStatus] = useState('');
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const showBtn = allImages.length < totalImages;

  const onImageClick = image => {
    setSelectedImage(image);
  };
  const onHandleSubmit = request => {
    setAllImages([]);
    setRequest(request);
    setTotalImages(0);
    setPage(1);
  };

  const onClick = e => {
    e.preventDefault();
    const myQuery = e.target.elements.request.value.trim();
    if (!myQuery) {
      setAllImages([]);
      setTotalImages(0);
      return Notify.failure('Пусте поле, введіть запит');
    }
    onHandleSubmit(myQuery);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!request) {
      return;
    }
    const getImage = async () => {
      setReqStatus('loading');
      try {
        const result = await fetchImages(request, page);
        if (result.totalHits > 0) {
          setAllImages(prevState => [...prevState, ...result.hits]);
          setTotalImages(result.totalHits);
        } else {
          return Notify.failure('ввведіть запит повторно');
        }
      } catch (error) {
        Notify.failure('Помилка запиту');
      } finally {
        setReqStatus(null);
      }
    };

    getImage();
  }, [request, page]);

  return (
    <Apps>
      <Searchbar onClick={onClick} />
      <ImageGallery data={allImages} onClick={onImageClick} />
      {selectedImage && (
        <Modal largeImageURL={selectedImage} onImageClick={onImageClick} />
      )}
      {allImages.length > 0 && !reqStatus && showBtn && (
        <Button onClick={onLoadMore} />
      )}
      {reqStatus && <Loader />}
    </Apps>
  );
}

export default App;
