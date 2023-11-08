import React, { useState, useEffect } from 'react';
import {
  PlaceWrapper,
  PlaceLabel,
  PlaceInfo,
  Restaurant,
  SearchAddressButton,
  StyledSelect,
} from './PlaceStyle';
import PlaceImgPrev from '../../components/Place/PlaceImgPrev';
import StarRating from '../../components/Place/StarRating';
import Header from '../../components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { imgUpload } from '../../api/imgUpload';
import { placeUploadApi } from '../../api/place';

const { kakao } = window;
export default function MakePlace() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [restaurantname, setRestaurantname] = useState('');
  const token = sessionStorage.getItem('token');
  const [rating, setRating] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  const handleImageUrlChange = (file, url) => {
    setImgFile(file);
    setImgUrl(url);
  };
  const uploadPlace = async () => {
    try {
      const RecImg = await convertBase64ToBlob(imgUrl);
      const formData = new FormData();
      formData.append('image', RecImg);

      const uploadResponse = await imgUpload(formData);
      const imageUrl =
        'https://api.mandarin.weniv.co.kr/' + uploadResponse.data.filename;

      await placeUploadApi(
        restaurantname,
        rating,
        selectedAddress,
        imageUrl,
        token,
      );
      navigate('/myprofile');
    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };

  const handleUpload = () => {
    if (isValid) {
      uploadPlace(imgUrl, restaurantname, rating, selectedAddress);
    } else {
      alert('입력이 안된 부분이 있습니다.');
    }
  };

  const checkContent = () => {
    if (
      restaurantname.trim().length === 0 ||
      !imgFile ||
      rating === 0 ||
      selectedAddress === ''
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantname, rating, selectedAddress, imgFile]);

  const onChangeName = (event) => {
    setRestaurantname(event.target.value);
    checkContent();
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setAddressList(data);
      setSelectedAddress(data[0].road_address_name);
    }
  };
  const convertBase64ToBlob = async (base64Data) => {
    const response = await fetch(base64Data);
    const blob = await response.blob();
    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
  };
  const onButtonClick = (event) => {
    event.preventDefault(); // 이벤트 버블링 방지

    if (restaurantname) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(restaurantname, placesSearchCB);
    } else {
      alert('음식점 이름을 입력해주세요.');
    }
  };
  const onAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }

  return (
    <>
      <h1 className='a11y-hidden'>냠냠평가 등록 페이지</h1>
      <Header
        type='placeupload'
        handleUploadBtn={isValid}
        uploadHandler={handleUpload}
      />
      <PlaceWrapper>
        <form onSubmit={handleSubmit}>
          <PlaceImgPrev onPlaceImageUrlChange={handleImageUrlChange} />
          <Restaurant>
            <PlaceLabel htmlFor='restaurantName'>음식점</PlaceLabel>
            <PlaceInfo
              id='restaurantName'
              type='text'
              value={restaurantname}
              onChange={onChangeName}
              onSubmit={handleSubmit}
            />
            <SearchAddressButton onClick={onButtonClick} type='button'>
              검색
            </SearchAddressButton>
          </Restaurant>
          <StarRating onRatingChange={handleRatingChange} />
          <PlaceLabel htmlFor='addresslist'>주소</PlaceLabel>
          {addressList.length > 0 && (
            <StyledSelect
              id='addresslist'
              onChange={onAddressChange}
              defaultValue={selectedAddress}
            >
              {addressList.map((address, index) => (
                <option key={index} value={address.road_address_name}>
                  {address.place_name} ({address.road_address_name})
                </option>
              ))}
            </StyledSelect>
          )}
        </form>
      </PlaceWrapper>
    </>
  );
}
