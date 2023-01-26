import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onClick }) => {
  return (
    <SearchBar>
      <SearchForm onSubmit={onClick}>
        <SearchFormButton type="submit">
          <FcSearch size="26px"></FcSearch>
        </SearchFormButton>

        <SearchFormInput
          name="request"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Searchbar;
