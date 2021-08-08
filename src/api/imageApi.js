import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '21973374-56c885108110b7a34a7b7e2cd';

const fetchImg = ({ searchQuery, currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=${perPage}&key=${apiKey}&page=${currentPage}`,
    )
    .then(res => res.data.hits);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { fetchImg };
