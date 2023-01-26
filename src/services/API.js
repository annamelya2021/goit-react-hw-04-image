import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (search, page) => {
  const response = await axios.get(
    `?key=12397794-3c79aefa4a299d9b97accc173&q=${search}&page=${page}`
  );
  return response.data;
};
export default fetchImages;
