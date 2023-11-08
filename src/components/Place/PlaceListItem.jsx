import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { viewBtnState } from '../../recoil/viewBtnAtom';
import { imgState } from '../../recoil/skeletonAtom';
import { SkeletonRateImg } from '../common/Skeleton/Skeleton';

export default function PlaceListItem({ cardOpen, cardClose, cardClosed }) {
  const [placeInfo, setPlaceInfo] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [, setUploadList] = useState(cardClosed);
  const [viewMode] = useRecoilState(viewBtnState);
  const imgLoading = useRecoilValue(imgState);

  useEffect(() => {
    const getUserInfo = async () => {
      const { accountname } = location.state || {};
      const token = sessionStorage.getItem('token');

      try {
        const res = await placeListApi(
          accountname || sessionStorage.getItem('accountname'),
          token,
        );
        setPlaceInfo(res.data.product);
        setUploadList(!cardClosed);
      } catch (error) {
        console.error('error');
        navigate('/error');
      }
    };

    getUserInfo();
    if (cardClosed) {
      getUserInfo();
    }
  }, [location, cardClosed, viewMode, navigate]);

  if (placeInfo.length === 0) {
    return null;
  }

  return (
    <>
      {placeInfo
        // eslint-disable-next-line array-callback-return
        .sort((a, b) => {
          if (viewMode === '별점순') {
            return b.updatedAt - a.updatedAt;
          } else if (viewMode === '최신순') {
            return b.price - a.price;
          }
        })
        .map((place) => (
          <PlaceItem key={place.id} onClick={() => cardOpen(place.id)}>
            {imgLoading ? (
              <SkeletonRateImg />
            ) : (
              <PlaceImg src={place.itemImage} alt='냠냠평가 사진' />
            )}
            <PlaceInfo>
              <PlaceName title={place.itemName}>{place.itemName}</PlaceName>
              <StarWrap>
                <Star src={StarImg} />
                <Rate>{place.price}.0</Rate>
              </StarWrap>
            </PlaceInfo>
          </PlaceItem>
        ))}
    </>
  );
}
