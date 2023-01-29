import { LoaderSt } from './Loader.styled';
import { InfinitySpin } from 'react-loader-spinner';

function Loader() {
  return (
    <LoaderSt>
      <InfinitySpin color="#6562a4" />
    </LoaderSt>
  );
}

export default Loader;
