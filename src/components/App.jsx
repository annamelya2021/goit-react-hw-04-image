import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import fetchImages from '../services/API';
import { Notify } from 'notiflix';
import { Apps } from './App.styled';

class App extends Component {
  state = {
    allImages: [],
    selectedImage: '',
    reqStatus: '',
    request: '',
    page: 1,
    totalImages: 0,
  };

  onImageClick = image => {
    this.setState({ selectedImage: image });
  };

  componentDidUpdate(_, prevState) {
    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.getImage();
    }
  }
  getImage = async () => {
    const { request, page } = this.state;
    this.setState({ reqStatus: 'loading' });
    try {
      const result = await fetchImages(request, page);
      if (result.totalHits > 0) {
        this.setState(prevState => ({
          allImages: [...prevState.allImages, ...result.hits],
          totalImages: result.totalHits,
        }));
      } else {
        return Notify.failure('ввведіть запит повторно');
      }
    } catch (error) {
      Notify.failure('Помилка запиту');
    } finally {
      this.setState({ reqStatus: null });
    }
  };

  onHandleSubmit = request => {
    this.setState({ allImages: [], request: request, totalImages: 0, page: 1 });
  };

  onClick = e => {
    e.preventDefault();
    const myQuery = e.target.elements.request.value.trim();
    if (!myQuery) {
      this.setState({ allImages: [], totalImages: 0 });
      return Notify.failure('Пусте поле, введіть запит');
    }
    this.onHandleSubmit(myQuery);
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { allImages, selectedImage, reqStatus, totalImages } = this.state;
    const showBtn = allImages.length < totalImages;
    return (
      <Apps>
        <Searchbar onClick={this.onClick} />
        <ImageGallery data={allImages} onClick={this.onImageClick} />
        {selectedImage && (
          <Modal
            largeImageURL={selectedImage}
            onImageClick={this.onImageClick}
          />
        )}
        {allImages.length > 0 && !reqStatus && showBtn && (
          <Button onClick={this.onLoadMore} />
        )}
        {reqStatus && <Loader />}
      </Apps>
    );
  }
}

export default App;
