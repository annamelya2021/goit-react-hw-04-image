import { Component } from 'react';
import { LoaderSt } from './Loader.styled';
import { InfinitySpin } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <LoaderSt>
        <InfinitySpin color="#6562a4" />
      </LoaderSt>
    );
  }
}

export default Loader;
