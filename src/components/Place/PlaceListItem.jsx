import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PlaceWrap,
  ButtonWrap,
  PlaceItem,
  SortButton,
  PlaceImg,
  PlaceInfo,
  PlaceName,
  StarWrap,
  Star,
  Rate,
} from './PlaceListItemStyle';
import StarImg from '../../images/Star.svg';
import { recommendListApi } from '../../api/recommend';

export default function PlaceListItem({ cardOpen, cardClose, cardClosed }) {
  const [recommendInfo, setRecommendInfo] = useState([]);
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
      const res = await recommendListApi(
        accountname || localStorage.getItem('accountname'),
        token,
      );
      setRecommendInfo(res.data.product);
      setUploadList(!cardClosed);
    } catch (error) {
      console.log('error');
      navigate('/error');
    }
  };

  if (recommendInfo.length === 0) {
    return null;
  }

  return (
    <>
      <ButtonWrap>
        <SortButton>
          <Star src={StarImg} />
          &nbsp;별점순으로 보기&nbsp;
        </SortButton>
      </ButtonWrap>
      <PlaceWrap>
        {recommendInfo.map((recommendation) => (
          <PlaceItem
            key={recommendation.id}
            onClick={() => cardOpen(recommendation.id)}
          >
            <PlaceImg src={recommendation.itemImage} alt='냠냠평가 사진' />
            <PlaceInfo>
              <PlaceName>{recommendation.itemName}</PlaceName>
              <StarWrap>
                <Star src={StarImg} />
                <Rate>{recommendation.price}.0</Rate>
              </StarWrap>
            </PlaceInfo>
          </PlaceItem>
        ))}
      </PlaceWrap>
    </>
  );
}
