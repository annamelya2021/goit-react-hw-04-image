import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { Overlay, ModalSt } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ largeImageURL, onImageClick }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onImageClick();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.addEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onImageClick();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalSt>
        <img src={largeImageURL} alt=""></img>
      </ModalSt>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onImageClick: PropTypes.func.isRequired,
};

export default Modal;
