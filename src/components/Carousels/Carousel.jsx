import React, { useState } from 'react';
import {
  CarouselWrapper,
  CarouselImages,
  LeftButton,
  RightButton,
  CarouselIndicator,
  Dot,
} from './StyledCarousel';
import Left from '../../images/chevron-left.svg';
import Right from '../../images/chevron-right.svg';
export default function Carousel({
  images,
  userInfo,
  onImageClick,
  previews,
  detail,
}) {
  const carouselImages = previews
    ? previews
    : images.includes(',')
    ? images.split(',')
    : [images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? carouselImages.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === carouselImages.length ? 0 : prevIndex + 1,
    );
  };
  return (
    <CarouselWrapper>
      <CarouselImages>
        {carouselImages?.map((imgItem, index) => (
          <img
            key={index}
            src={
              previews
                ? imgItem
                : imgItem.trim().startsWith('https://')
                ? imgItem
                : `https://api.mandarin.weniv.co.kr/${imgItem.trim()}`
            }
            className={currentIndex === index ? 'active' : 'inactive'}
            alt={previews ? userInfo : `포스트이미지 by @${images.userInfo}.`}
            crossOrigin='anonymous'
            loading='lazy'
            onClick={onImageClick}
            style={{ cursor: detail === true ? 'default' : 'pointer' }}
          />
        ))}
      </CarouselImages>
      {carouselImages.length > 1 && (
        <div>
          <LeftButton onClick={handlePrevious} title='이전 이미지 보기'>
            <img src={Left} alt='이전 사진 보기 화살표 버튼' />
          </LeftButton>
          <RightButton onClick={handleNext} title='다음 이미지 보기'>
            <img src={Right} alt='다음 사진 보기 화살표 버튼' />
          </RightButton>
        </div>
      )}
      <CarouselIndicator>
        {carouselImages.length > 1 &&
          carouselImages.map((_, index) => (
            <Dot
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
            />
          ))}
      </CarouselIndicator>
    </CarouselWrapper>
  );
}
