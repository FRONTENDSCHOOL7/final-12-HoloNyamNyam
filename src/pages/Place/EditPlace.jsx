/* eslint-disable no-unused-vars */
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
import { placeEditApi } from '../../api/place';
import { useRecoilState } from 'recoil';
import { placeState } from '../../recoil/placeEditAtom';
import { imgUpload } from '../../api/imgUpload';

const { kakao } = window;

export default function EditPlace() {
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

  const [place, setPlace] = useRecoilState(placeState);
  const [imgUrl, setImgUrl] = useState(place ? place.itemImage || '' : '');
  const token = sessionStorage.getItem('token');
  const [isValid, setIsValid] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [itemName, setItemName] = useState(place ? place.itemName || '' : '');
  const [rate, setRate] = useState(place ? place.price : 0);
  const [selectedAddress, setSelectedAddress] = useState(
    place ? place.link || '' : '',
  );

  const checkContent = () => {
    if (itemName.trim().length === 0 || rate === 0 || selectedAddress === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName, rate, selectedAddress]);

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setAddressList(data);
      setSelectedAddress(data[0].road_address_name);
    }
  };

  const onButtonClick = (event) => {
    event.preventDefault(); // 이벤트 버블링 방지

    if (itemName) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(itemName, placesSearchCB);
    } else {
      alert('음식점 이름을 입력해주세요.');
    }
  };

  useEffect(() => {
    if (itemName) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(itemName, placesSearchCB);
    }
  }, [itemName]);

  useEffect(() => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      itemName: itemName,
      link: selectedAddress,
      price: rate,
      itemImage: imgUrl,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName, selectedAddress, rate, imgUrl]);

  const convertBase64ToBlob = async (base64Data) => {
    const response = await fetch(base64Data);
    const blob = await response.blob();
    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
  };

  const placeEditUpload = async () => {
    try {
      const RecImg = await convertBase64ToBlob(imgUrl);
      const formData = new FormData();
      formData.append('image', RecImg);

      const uploadResponse = await imgUpload(formData);
      const imageUrl =
        'https://api.mandarin.weniv.co.kr/' + uploadResponse.data.filename;

      const response = await placeEditApi(place.id, token, {
        itemName: place.itemName,
        price: place.price,
        link: place.link,
        itemImage: imageUrl,
      });

      if (response.status === 200) {
        navigate('/myprofile');
      }
    } catch (error) {
      navigate('/error');
    }
  };

  function handleUpload() {
    placeEditUpload();
  }

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
      <h1 className='a11y-hidden'>냠냠평가 수정 페이지</h1>
      <Header
        type='placeupload'
        edit
        handleUploadBtn={isValid}
        uploadHandler={handleUpload}
      />
      <PlaceWrapper>
        <form onSubmit={handleSubmit}>
          <PlaceImgPrev
            initialImage={place.itemImage || []}
            onPlaceImageUrlChange={(file, url) => {
              // setImgFile(file);
              setImgUrl(url);
            }}
            alt='게시물 사진'
          />
          <Restaurant>
            <PlaceLabel htmlFor='restaurantName'>음식점</PlaceLabel>
            <PlaceInfo
              id='restaurantName'
              type='text'
              defaultValue={itemName || ''}
              onChange={(e) => setItemName(e.target.value)}
              onSubmit={handleSubmit}
            />
            <SearchAddressButton onClick={onButtonClick} type='button'>
              검색
            </SearchAddressButton>
          </Restaurant>
          <StarRating
            initialValue={place.price}
            onRatingChange={(rate) => setRate(rate)}
          />
          <PlaceLabel htmlFor='addresslist'>주소</PlaceLabel>
          <StyledSelect
            id='addresslist'
            onChange={(e) => {
              setSelectedAddress(e.target.value);
            }}
            value={selectedAddress}
          >
            {addressList.map((address, index) => (
              <option key={index} value={address.road_address_name}>
                {address.place_name} ({address.road_address_name})
              </option>
            ))}
          </StyledSelect>
        </form>
      </PlaceWrapper>
    </>
  );
}
