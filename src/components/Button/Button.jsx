import { ButtonSt } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <ButtonSt type="button" onClick={onClick}>
      Load more
    </ButtonSt>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
