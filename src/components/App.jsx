import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import api from './api/api';

export function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loging, setLoging] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState({});
  const [modalStart, setModalStart] = useState(false);

  useEffect(() => {
    if (search === '') return;

    const asincApi = async () => {
      const arr = await api(search, page);
      setData(prev => [...prev, ...arr.hits]);
      setLoging(false);
      setTotalHits(arr.totalHits);
    };
    asincApi();
    setLoging(true);
  }, [page, search]);

  const handelSearch = value => {
    setSearch(value, setPage(1), setData([]));
  };
  const handlBtnlick = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickModal = (src, alt) => {
    setModalData({ src, alt });
    setModalStart(true);
  };

  const toggleModal = () => {
    setModalStart(false);
  };

  const totalPage = Math.ceil(totalHits / 12);
  return (
    <div>
      <Searchbar handelSearch={handelSearch} />
      {loging && <Loader />}
      <ImageGallery>
        <ImageGalleryItem data={data} onClickModal={onClickModal} />
      </ImageGallery>
      {totalPage > page && <Button handlBtnlick={handlBtnlick} />}

      {modalStart && <Modal modalData={modalData} toggleModal={toggleModal} />}
    </div>
  );
}
