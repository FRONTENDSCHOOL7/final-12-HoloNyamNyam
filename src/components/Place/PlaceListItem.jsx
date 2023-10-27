import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PlaceWrap,
  PlaceItem,
  PlaceImg,
  PlaceInfo,
  PlaceName,
  StarWrap,
  Star,
  Rate,
} from './PlaceListItemStyle';
import StarImg from '../../images/Star.svg';
import { placeListApi } from '../../api/place';

export default function PlaceListItem({ cardOpen, cardClose, cardClosed }) {
  const [placeInfo, setPlaceInfo] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadList, setUploadList] = useState(cardClosed);
  useEffect(() => {
    getUserInfo();
    if (cardClosed) {
      getUserInfo();
    }
  }, [location, cardClosed]);

  const getUserInfo = async () => {
    const { accountname } = location.state || {};
    const token = localStorage.getItem('token');
    try {
      const res = await placeListApi(
        accountname || localStorage.getItem('accountname'),
        token,
      );
      setPlaceInfo(res.data.product);
      setUploadList(!cardClosed);
    } catch (error) {
      console.log('error');
      navigate('/error');
    }
  };

  if (placeInfo.length === 0) {
    return null;
  }

  return (
    <PlaceWrap>
      {placeInfo.map((place) => (
        <PlaceItem key={place.id} onClick={() => cardOpen(place.id)}>
          <PlaceImg src={place.itemImage} alt='냠냠평가 사진' />
          <PlaceInfo>
            <PlaceName>{place.itemName}</PlaceName>
            <StarWrap>
              <Star src={StarImg} />
              <Rate>{place.price}.0</Rate>
            </StarWrap>
          </PlaceInfo>
        </PlaceItem>
      ))}
    </PlaceWrap>
  );
}
