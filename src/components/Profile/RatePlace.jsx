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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { viewBtnState } from '../../recoil/viewBtnAtom';
import { userInfoState } from '../../recoil/userInfoAtom';
import { imgState } from '../../recoil/skeletonAtom';

export default function RatePlace({ cardOpen, cardClosed }) {
  const navigate = useNavigate();
  const [, setViewMode] = useRecoilState(viewBtnState);
  const [userInfo] = useRecoilState(userInfoState);
  const setImgLoading = useSetRecoilState(imgState);

  function movePlaceList(id) {
    navigate('/placelist', {
      state: { accountname: id.accountname, nickname: id.username },
    });
  }

  const location = useLocation();
  const [rateList, setRateList] = useState(false);
  const { accountname } = location.state || {};

  useEffect(() => {
    setViewMode('별점순');
    const getUserInfo = async () => {
      const token = sessionStorage.getItem('token');
      try {
        setImgLoading(true);
        const res = await placeListApi(
          accountname || sessionStorage.getItem('accountname'),
          token,
        );
        setTimeout(() => setImgLoading(false), 500);
        if (res.data.product.length > 0) {
          setRateList(true);
        } else {
          setRateList(false);
        }
      } catch (error) {
        console.error('error');
        navigate('/error');
      }
    };
    getUserInfo();
  }, [location, navigate, accountname, setViewMode, setImgLoading]);

  return (
    <>
      <RateTitleWrap>
        <RateTitle>{userInfo.username}님의 냠냠평가</RateTitle>
        {rateList && (
          <MoreViewBtn
            type='button'
            size='ms'
            $border='active'
            color='active'
            onClick={() => movePlaceList(userInfo)}
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
