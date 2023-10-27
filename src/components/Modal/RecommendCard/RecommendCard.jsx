import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  RecommendDim,
  RecommendCardArticle,
  RecommendListImg,
  RecommendTextSection,
  RecommendName,
  RecommendScoreSpan,
  RecommendLocationP,
  RecommendMoreBtn,
  RecommendCloseBtn,
  TitleWrapper,
} from './RecommendCardStyle';
import { getRecommendInfoApi } from '../../../api/recommend';
import sprite from '../../../images/SpriteIcon.svg';
import { useRecoilState } from 'recoil';
import Modal from '../Modal/Modal';
import { modalState } from '../../../recoil/modalAtom';

export default function RecommendCard({ cardClose, id }) {
  const SocialSVG = ({ id, color = 'white', size = 22 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  const location = useLocation();
  const { accountname } = location.state || {};
  const [recommendInfo, setRecommendInfo] = useState({
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
      await getRecommendInfoApi(id, token).then((res) => {
        const { itemImage, itemName, link, price } = res.data.product;
        setRecommendInfo({
          itemImage,
          itemName,
          link,
          price,
        });
        setShouldFetchProductInfo(false);
      });
    } catch (err) {
      console.log('에러!');
      // navigation('/error');
    }
  };

  useEffect(() => {
    if (shouldFetchProductInfo) {
      getUserInfo();
    }
  }, [shouldFetchProductInfo]);

  return (
    <RecommendDim onClick={cardClose}>
      <RecommendCardArticle>
        <h3 className='a11y-hidden'>냠냠 평가 카드</h3>
        <RecommendListImg src={recommendInfo.itemImage} alt='' />
        <RecommendTextSection>
          <TitleWrapper>
            <RecommendName>{recommendInfo.itemName}</RecommendName>
            <SocialSVG id='star' size='16px' />
            <RecommendScoreSpan>{recommendInfo.price}.0</RecommendScoreSpan>
          </TitleWrapper>
          <RecommendLocationP>{recommendInfo.link}</RecommendLocationP>
          <RecommendMoreBtn type='button' onClick={modalOpen}>
            <SocialSVG id='icon-more-vertical' />
          </RecommendMoreBtn>
          <RecommendCloseBtn type='button' onClick={cardClose} />
        </RecommendTextSection>
      </RecommendCardArticle>
      {modal.show && (
        <Modal
          type='myBobzip'
          productId={id}
          restaurantName={recommendInfo.itemName}
          recommendInfo={recommendInfo}
        />
      )}
    </RecommendDim>
  );
}
