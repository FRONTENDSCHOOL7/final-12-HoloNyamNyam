import React, { useState, useEffect } from 'react';
import PlaceListItem from '../Place/PlaceListItem';
import {
  RateWrap,
  RateTitleWrap,
  RateTitle,
  MoreViewBtn,
  PlaceList,
  NoListDiv,
} from './StyledRatePlace';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeListApi } from '../../api/place';
import { userSearch } from '../../api/search';

export default function RatePlace({ cardOpen, cardClosed }) {
  const navigate = useNavigate();
  function movePlaceList() {
    navigate('/placelist');
  }

  const [name, setName] = useState([]);
  const location = useLocation();
  const [rateList, setRateList] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const { accountname } = location.state || {};
      const token = localStorage.getItem('token');
      try {
        const res = await placeListApi(
          accountname || localStorage.getItem('accountname'),
          token,
        );
        const resName = await userSearch(
          accountname || localStorage.getItem('accountname'),
          token,
        );
        if (res.data.product.length > 0) {
          setRateList(true);
        } else {
          setRateList(false);
        }
        setName(resName.data[0].username);
      } catch (error) {
        console.error('error');
        navigate('/error');
      }
    };
    getUserInfo();
  }, [location, navigate]);

  return (
    <>
      <RateTitleWrap>
        <RateTitle>{name}님의 냠냠평가</RateTitle>
        {rateList && (
          <MoreViewBtn
            type='button'
            size='ms'
            $border='active'
            color='active'
            onClick={movePlaceList}
          >
            더보기
          </MoreViewBtn>
        )}
      </RateTitleWrap>
      <RateWrap>
        {rateList ? (
          <PlaceList>
            <PlaceListItem cardOpen={cardOpen} cardClosed={cardClosed} />
          </PlaceList>
        ) : (
          <NoListDiv>
            <p>등록된 냠냠평가가 없어요</p>
          </NoListDiv>
        )}
      </RateWrap>
    </>
  );
}
