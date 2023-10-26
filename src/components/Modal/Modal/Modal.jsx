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
// import { cardShowState } from '../../../recoil/modalAtom';

export default function Modal({
  type,
  productId,
  restaurantName,
  handlerPostEdit,
  handlerRecommendEdit,
  handleCommentDelete,
  recommendInfo,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState('logout');
  const [modal, setModal] = useRecoilState(modalState);
  // const [cardShow, setCardShow] = useRecoilState(cardShowState);

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
  //수정중~
  function handlerOpenMap() {
    navigate('/map', {
      state: {
        restaurantname: restaurantName,
      },
    });
    setModal((prevModal) => ({ ...prevModal, show: false }));
    // setCardShow(false);
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
  //~수정중
  const UI = {
    report: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('report')}>
          신고하기
        </ModalTextBtn>
        <ModalTextBtn>팔로우 취소</ModalTextBtn>
        <ModalTextBtn>이 계정 정보</ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('report')}>
          신고하기
        </ModalTextBtn>
        <ModalTextBtn>차단</ModalTextBtn>
        <ModalTextBtn>이 계정 정보</ModalTextBtn>
        <ModalTextBtn>이 프로필 공유하기</ModalTextBtn>
      </ModalWrapArticle>
    ),
    myProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn>설정 및 개인정보</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('logout')}>
          로그아웃
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourPostComment: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('report')}>
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myPostComment: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn
          onClick={() => alertOpen(modal.commentId ? 'post' : 'comment')}
        >
          삭제
        </ModalTextBtn>
        <ModalTextBtn onClick={handlerPostEdit}>수정</ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourBobzip: (
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
    myBobzip: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen('bobzip')}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerRecommendEdit}>수정</ModalTextBtn>
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => kakaoButton(recommendInfo)}>
          SNS 공유하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    chat: (
      <ModalWrapArticle>
        <ModalLineSpan />
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
