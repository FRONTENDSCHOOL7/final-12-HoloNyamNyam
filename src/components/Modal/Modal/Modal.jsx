import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import {
  ModalDim,
  ModalWrapArticle,
  ModalLineSpan,
  ModalTextBtn,
} from './ModalStyle';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import { cardShowState } from '../../../recoil/cardShowAtom';

export default function Modal({
  type,
  productId,
  placeName,
  placeLink,
  handlerProfile,
  handlerFeedEdit,
  handlerFeedEdit2,
  handlerCommentEdit,
  handlerPlaceEdit,
  handleCommentDelete,
  handlerFeedDetail,
  recommendInfo,
  detail,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState('logout');
  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useRecoilState(modalState);
  // eslint-disable-next-line no-unused-vars
  const [cardShow, setCardShow] = useRecoilState(cardShowState);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModal((prevModal) => ({ ...prevModal, show: false }));
    }
  }
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }
  function alertOpen(type) {
    setAlertShow(true);
    setAlertType(type);
  }

  function handlerOpenMap() {
    navigate('/map', {
      state: {
        placeName: placeName,
        placeLink: placeLink,
      },
    });
    setModal((prevModal) => ({ ...prevModal, show: false }));
    setCardShow(false);
  }
  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('cac39e5e6556a7917d1c0c5b966012b7');
    }
  };

  function kakaoButton(recommendInfo) {
    initializeKakao();
    if (!window.Kakao) {
      return;
    }
    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: 'location',
      address: recommendInfo.link,
      addressTitle: recommendInfo.itemName,
      content: {
        title: recommendInfo.itemName,
        imageUrl: recommendInfo.itemImage,
        description: recommendInfo.link,
        link: {
          mobileWebUrl: 'https://foodzip.netlify.app',
          webUrl: 'https://foodzip.netlify.app',
        },
      },
      social: {
        likeCount: recommendInfo.price,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://foodzip.netlify.app',
            webUrl: 'https://foodzip.netlify.app',
          },
        },
      ],
    });
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }
  const UI = {
    yourProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn>차단</ModalTextBtn>
        <ModalTextBtn>이 계정 정보</ModalTextBtn>
        <ModalTextBtn>이 프로필 공유하기</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('reportUser')}>
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn>내 프로필 공유하기</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('logout')}>
          로그아웃
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourFeed: (
      <ModalWrapArticle>
        <ModalLineSpan />
        {detail || (
          <ModalTextBtn onClick={handlerFeedDetail}>상세보기</ModalTextBtn>
        )}
        <ModalTextBtn onClick={handlerProfile}>이 계정 정보</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('reportFeed')}>
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myFeed: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={handlerFeedDetail}>상세보기</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('feed')}>삭제</ModalTextBtn>
        {/* <ModalTextBtn onClick={handlerFeedEdit}>수정</ModalTextBtn> */}
        <ModalTextBtn onClick={handlerFeedEdit2}>수정</ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourComment: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={handlerProfile}>이 계정 정보</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('reportComment')}>
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myComment: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('comment')}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerCommentEdit}>수정</ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourPlace: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => kakaoButton(recommendInfo)}>
          SNS 공유하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myPlace: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('place')}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerPlaceEdit}>수정</ModalTextBtn>
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => kakaoButton(recommendInfo)}>
          SNS 공유하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    chat: (
      <ModalWrapArticle style={{ borderBottom: '1px solid #dbdbdb' }}>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('reportUser')}>
          신고하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => navigate(-1)}>채팅방 나가기</ModalTextBtn>
      </ModalWrapArticle>
    ),
  };

  return (
    <>
      <ModalDim onClick={modalClose}>{UI[type]}</ModalDim>
      {alertShow && (
        <Alert
          type={alertType}
          modalClose={modalClose}
          alertClose={alertClose}
          productId={productId}
          handleCommentDelete={handleCommentDelete}
        />
      )}
    </>
  );
}
