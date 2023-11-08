import React, { useState, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ModalDim,
  ModalWrapArticle,
  ModalLineSpan,
  ModalTextBtn,
} from './ModalStyle';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import { cardShowState } from '../../../recoil/cardShowAtom';
import { userInfoState } from '../../../recoil/userInfoAtom';
import { Suspense } from 'react';

const Alert = lazy(() => import('../Alert/Alert'));

export default function Modal({
  type,
  productId,
  placeName,
  placeLink,
  handlerProfile,
  handlerFeedEdit,
  handlerCommentEdit,
  handlerPlaceEdit,
  handleCommentDelete,
  handlerFeedDetail,
  placeInfo,
  detail,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState('logout');
  const [, setModal] = useRecoilState(modalState);
  const [, setCardShow] = useRecoilState(cardShowState);
  const [userInfo] = useRecoilState(userInfoState);
  const location = useLocation();

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

  function moveProfileEdit() {
    navigate('/myprofile/edit');
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }

  function kakaoButton(placeInfo) {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init('2df8baf0a061ee9ba8cfeadb844cdfb4');
      }

      kakao.Share.sendDefault({
        objectType: 'location',
        address: placeInfo.link,
        addressTitle: placeInfo.itemName,
        content: {
          title: placeInfo.itemName,
          imageUrl: placeInfo.itemImage,
          description: placeInfo.link,
          link: {
            mobileWebUrl: 'https://holonyam.netlify.app/',
            webUrl: 'https://holonyam.netlify.app/',
          },
        },
        social: {
          likeCount: placeInfo.price,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: 'https://holonyam.netlify.app/',
              webUrl: 'https://holonyam.netlify.app/',
            },
          },
        ],
      });
    }
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }

  function kakaoProfileButton(userInfo) {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init('2df8baf0a061ee9ba8cfeadb844cdfb4');
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `@${userInfo.accountname}`,
          description: userInfo.intro,
          imageUrl: userInfo.image,
          link: {
            mobileWebUrl: 'https://holonyam.netlify.app/',
            webUrl: 'https://holonyam.netlify.app/',
          },
        },
        itemContent: {
          profileText: userInfo.username,
        },
        buttons: [
          {
            title: '프로필 구경하기',
            link: {
              mobileWebUrl: 'https://holonyam.netlify.app/',
              webUrl: 'https://holonyam.netlify.app/',
            },
          },
        ],
      });
    }
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }

  const UI = {
    yourProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        {location.pathname !== '/feeddetail' && (
          <ModalTextBtn onClick={() => kakaoProfileButton(userInfo)}>
            프로필 공유하기
          </ModalTextBtn>
        )}
        <ModalTextBtn onClick={() => alertOpen('reportUser')}>
          신고하기
        </ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen('logout')}>
          로그아웃
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    myProfile: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={moveProfileEdit}>프로필 수정</ModalTextBtn>
        {location.pathname !== '/feeddetail' && (
          <ModalTextBtn onClick={() => kakaoProfileButton(userInfo)}>
            프로필 공유하기
          </ModalTextBtn>
        )}
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
        {detail || (
          <ModalTextBtn onClick={handlerFeedDetail}>상세보기</ModalTextBtn>
        )}
        <ModalTextBtn onClick={() => alertOpen('feed')}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerFeedEdit}>수정</ModalTextBtn>
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
        <ModalTextBtn onClick={() => kakaoButton(placeInfo)}>
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
        <ModalTextBtn onClick={() => kakaoButton(placeInfo)}>
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
        <Suspense>
          <Alert
            type={alertType}
            modalClose={modalClose}
            alertClose={alertClose}
            productId={productId}
            handleCommentDelete={handleCommentDelete}
          />
        </Suspense>
      )}
    </>
  );
}
