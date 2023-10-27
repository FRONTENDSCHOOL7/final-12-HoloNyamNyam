import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PlaceDim,
  PlaceCardArticle,
  PlaceListImg,
  PlaceTextSection,
  PlaceName,
  PlaceScoreSpan,
  PlaceLocationP,
  PlaceMoreBtn,
  PlaceCloseBtn,
  TitleWrapper,
} from './PlaceCardStyle';
import { getPlaceInfoApi } from '../../../api/place';
import sprite from '../../../images/SpriteIcon.svg';
import { useRecoilState } from 'recoil';
import Modal from '../Modal/Modal';
import { modalState } from '../../../recoil/modalAtom';

export default function PlaceCard({ cardClose, id }) {
  const SocialSVG = ({ id, color = 'white', size = 22 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  const location = useLocation();
  const { accountname } = location.state || {};
  const [placeInfo, setPlaceInfo] = useState({
    postimage: '',
    restaurantname: '',
    price: '',
    address: '',
  });
  const navigation = useNavigate();
  const [shouldFetchProductInfo, setShouldFetchProductInfo] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = () => {
    setModal({ show: true, type: !accountname ? 'product' : 'yourproduct' });
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    try {
      await getPlaceInfoApi(id, token).then((res) => {
        const { itemImage, itemName, link, price } = res.data.product;
        setPlaceInfo({
          itemImage,
          itemName,
          link,
          price,
        });
        setShouldFetchProductInfo(false);
      });
    } catch (err) {
      console.log('error');
      navigation('/error');
    }
  };

  useEffect(() => {
    if (shouldFetchProductInfo) {
      getUserInfo();
    }
  }, [shouldFetchProductInfo]);

  return (
    <PlaceDim onClick={cardClose}>
      <PlaceCardArticle>
        <h3 className='a11y-hidden'>냠냠 평가 카드</h3>
        <PlaceListImg src={placeInfo.itemImage} alt='' />
        <PlaceTextSection>
          <TitleWrapper>
            <PlaceName>{placeInfo.itemName}</PlaceName>
            <SocialSVG id='star' size='16px' />
            <PlaceScoreSpan>{placeInfo.price}.0</PlaceScoreSpan>
          </TitleWrapper>
          <PlaceLocationP>{placeInfo.link}</PlaceLocationP>
          <PlaceMoreBtn type='button' onClick={modalOpen}>
            <SocialSVG id='icon-more-vertical' />
          </PlaceMoreBtn>
          <PlaceCloseBtn type='button' onClick={cardClose} />
        </PlaceTextSection>
      </PlaceCardArticle>
      {modal.show && (
        <Modal
          type='myBobzip'
          productId={id}
          restaurantName={placeInfo.itemName}
          placeInfo={placeInfo}
        />
      )}
    </PlaceDim>
  );
}
