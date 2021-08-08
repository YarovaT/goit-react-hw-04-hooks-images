import Seachbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import Container from './components/Container';
import { useState, useEffect } from 'react';
import Api from './api/imageApi';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Button from './components/Button';
import Modal from './components/Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      fetchImg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const onChangeQuery = query => {
    setSearchQuery(query.trim());
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  const fetchImg = () => {
    const options = { searchQuery, currentPage };

    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    Api.fetchImg(options)
      .then(
        hits => setImages(prevState => [...prevState, ...hits]),
        setCurrentPage(prevState => prevState + 1),
      )
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };

  const toggleModal = () => {
    setShowModal(false);
    setModalImg('');
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setModalImg(largeImageURL);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <>
      <Seachbar onSubmit={onChangeQuery} />

      {error && <p>Whoops, something went wrong: {error.message}</p>}

      <Container>
        {isLoading && (
          <Loader
            type="Circles"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {<ImageGallery images={images} onImgClick={openModal} />}

        {shouldRenderLoadMoreButton && <Button onClick={fetchImg} />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
      </Container>
    </>
  );
}
