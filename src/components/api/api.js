import axios from 'axios';

const api = async (search, page) => {
  const searchParams = new URLSearchParams({
    q: search,
    page: page,
    key: '28561602-86e3b026ea867d304dbb7c510',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return data;
};
export default api;
