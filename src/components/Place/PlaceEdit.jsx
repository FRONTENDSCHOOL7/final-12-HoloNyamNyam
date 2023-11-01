import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../Place/StarRating';
import Button from '../../components/common/Button/Button';
import { PlaceLabel } from '../../pages/Place/MakePlace';
import {
  PlaceInfo,
  ModalContent,
  ModalOverlay,
  HeaderLayoutDiv,
  HeaderLeftBtn,
  EditContainer,
  ProductImage,
  SocialSvg,
} from './PlaceEditStyle';
import { getPlaceInfoApi, placeEditApi } from '../../api/place';
import sprite from '../../images/SpriteIcon.svg';

export default function PlaceEdit({ closeModal, productId }) {
  const SocialSVG = ({ id, color = 'white', size = 24, onClick }) => (
    <SocialSvg onClick={onClick}>
      <svg fill={color} width={size} height={size}>
        <use href={`${sprite}#${id}`} />
      </svg>
    </SocialSvg>
  );
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async () => {
    try {
      const res = await getPlaceInfoApi(productId, token);
      const product = res.data.product;
      setProductInfo(product);
    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };
  const recommendEditUpload = async () => {
    try {
      const res = await placeEditApi(productId, token, productInfo);
      const updatedProduct = res.data.product;
      setProductInfo(updatedProduct);
      closeModal();
    } catch (error) {
      console.error(error);
      navigate('/error');
      return false;
    }
  };

  function handleUpload() {
    recommendEditUpload();
  }
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <EditContainer>
          <HeaderLayoutDiv>
            <HeaderLeftBtn type='button'>
              <SocialSVG id='icon-arrow-left' onClick={closeModal} />
            </HeaderLeftBtn>
            <Button
              type='submit'
              content='저장'
              size='ms'
              width='ms'
              $bgcolor='active'
              onClick={handleUpload}
            />
          </HeaderLayoutDiv>
          {productInfo.itemImage !== '' && (
            <ProductImage src={productInfo.itemImage} alt='게시물 사진' />
          )}
          <PlaceLabel htmlFor='restaurantName'>음식점</PlaceLabel>
          <PlaceInfo
            id='restaurantName'
            type='text'
            value={productInfo.itemName || ''}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                itemName: e.target.value,
              })
            }
          />
          <StarRating
            onRatingChange={(rate) =>
              setProductInfo({
                ...productInfo,
                price: rate,
              })
            }
          />
          <PlaceLabel htmlFor='address'>주소</PlaceLabel>
          <PlaceInfo
            id='address'
            type='text'
            value={productInfo.link || ''}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                link: e.target.value,
              })
            }
          />
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
