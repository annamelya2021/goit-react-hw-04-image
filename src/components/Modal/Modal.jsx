import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { Overlay, ModalSt } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onImageClick: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onImageClick();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onImageClick();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalSt>
          <img src={this.props.largeImageURL} alt=""></img>
        </ModalSt>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
