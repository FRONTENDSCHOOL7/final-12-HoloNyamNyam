/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import close from '../../../images/close-btn.svg';
import StarImg from '../../../images/Star.svg';
import { placeState } from '../../../recoil/placeEditAtom';
import { Suspense } from 'react';
import {
  SkeletonRateModal,
  SkeletonRateModalAddress,
  SkeletonRateModalName,
} from '../../common/Skeleton/Skeleton';

const Modal = lazy(() => import('../Modal/Modal'));

export default function PlaceCard({ cardClose, id }) {
  const SocialSVG = ({ id, color = 'white', size = 22 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  const location = useLocation();
  let { accountname } = location.state || {};

  if (location.pathname === '/placelist') {
    if (accountname === sessionStorage.getItem('accountname')) {
      accountname = '';
    }
  }

  const [placeInfo, setPlaceInfo] = useState({
    postimage: '',
    restaurantname: '',
    price: '',
    address: '',
  });
  const navigation = useNavigate();
  const [placeEditModalOpen, setPlaceEditModalOpen] = useState(false);
  const [shouldFetchProductInfo, setShouldFetchProductInfo] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const setPlace = useSetRecoilState(placeState);
  const modalOpen = () => {
    setModal({ show: true, type: !accountname ? 'product' : 'yourproduct' });
  };

  const [placeCardLoading, setPlaceCardLoading] = useState(false);

  const getUserInfo = async () => {
    const token = sessionStorage.getItem('token');
    try {
      setPlaceCardLoading(true);
      await getPlaceInfoApi(id, token).then((res) => {
        const { itemImage, itemName, link, price } = res.data.product;
        setPlaceInfo({
          itemImage,
          itemName,
          link,
          price,
        });
        setShouldFetchProductInfo(false);
        setTimeout(() => setPlaceCardLoading(false), 500);
      });
    } catch (err) {
      console.error('error');
      navigation('/error');
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openPlaceEditModal = () => {
    setPlaceEditModalOpen(true);
  };

  const closePlaceEditModal = () => {
    setPlaceEditModalOpen(false);
    setShouldFetchProductInfo(true);
    setModal((prevModal) => ({ ...prevModal, show: false }));
    getUserInfo();
  };

  useEffect(() => {
    if (shouldFetchProductInfo) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchProductInfo]);

  const moveUpload = (item, id) => {
    navigation('/EditPlace');
    setModal({ show: false });
    setPlace({
      type: 'edit',
      id: id,
      itemName: item.itemName,
      itemImage: item.itemImage,
      link: item.link,
      price: item.price,
    });
  };

  return (
    <PlaceDim onClick={cardClose}>
      <PlaceCardArticle>
        <h3 className='a11y-hidden'>냠냠 평가 카드</h3>
        {placeCardLoading ? (
          <SkeletonRateModal />
        ) : (
          <PlaceListImg src={placeInfo.itemImage} alt='' />
        )}
        <PlaceTextSection>
          {placeCardLoading ? (
            <SkeletonRateModalName />
          ) : (
            <TitleWrapper>
              <PlaceName>{placeInfo.itemName}</PlaceName>
              <img src={StarImg} alt='평점 아이콘' />
              <PlaceScoreSpan>{placeInfo.price}.0</PlaceScoreSpan>
            </TitleWrapper>
          )}
          {placeCardLoading ? (
            <SkeletonRateModalAddress />
          ) : (
            <PlaceLocationP>{placeInfo.link}</PlaceLocationP>
          )}
          <PlaceMoreBtn
            type='button'
            onClick={modalOpen}
            title='옵션 및 설정 더보기'
          >
            <SocialSVG id='icon-more-vertical' />
          </PlaceMoreBtn>
          <PlaceCloseBtn type='button' title='냠냠평가 카드 닫기'>
            <img src={close} alt='닫기 버튼' onClick={cardClose} />
          </PlaceCloseBtn>
        </PlaceTextSection>
      </PlaceCardArticle>
      {modal.show && (
        <Suspense>
          <Modal
            type={accountname ? 'yourPlace' : 'myPlace'}
            productId={id}
            placeName={placeInfo.itemName}
            placeLink={placeInfo.link}
            placeInfo={placeInfo}
            // handlerPlaceEdit={openPlaceEditModal}
            handlerPlaceEdit={() => moveUpload(placeInfo, id)}
          />
        </Suspense>
      )}
    </PlaceDim>
  );
}
