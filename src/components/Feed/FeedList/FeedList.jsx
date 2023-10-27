import React from 'react';
// import FeedItem from './../FeedItem/FeedItem';
import sprite from '../../../images/SpriteIcon.svg';
import { FeedListBtnWrap, ImgInfo, ImgBtn } from './StyledFeedList';

export default function FeedList() {
  const ViewSVG = ({ id, color = 'white', size = 26 }) => (
    <svg fill={color} width={size} height={size} stroke={color}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  return (
    <>
      <FeedListBtnWrap>
        <button type='button'>
          <ViewSVG id='icon-post-list-on' />
        </button>
        <button type='button'>
          <ViewSVG id='icon-post-album-off' />
        </button>
      </FeedListBtnWrap>
      {/* <FeedItem /> */}
      {/* <ul>
        <li>
          <ImgBtn>
            <img src='https://api.mandarin.weniv.co.kr/1697095241244.jpg' />
            <ImgInfo>
              <ViewSVG id='icon-heart' size={19} />
              <ViewSVG id='icon-message-circle' size={19} stroke='white' />
            </ImgInfo>
          </ImgBtn>
        </li>
      </ul> */}
    </>
  );
}
