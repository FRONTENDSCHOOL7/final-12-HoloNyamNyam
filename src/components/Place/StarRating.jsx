import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';

const RatingWrapper = styled.article`
  margin-bottom: 28px;
`;
const RatingP = styled.p`
  margin-bottom: 14px;
  font-size: 12px;
  font-weight: 500;
  color: #767676;
`;
export default function StarRating({ onRatingChange, initialValue }) {
  const [rating, setRating] = useState(initialValue || 0);

  useEffect(() => {
    if (initialValue !== undefined) {
      setRating(initialValue);
    }
  }, [initialValue]);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChange(rate);
  };
  return (
    <RatingWrapper>
      <RatingP>평점</RatingP>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        initialValue={rating}
      />
    </RatingWrapper>
  );
}
