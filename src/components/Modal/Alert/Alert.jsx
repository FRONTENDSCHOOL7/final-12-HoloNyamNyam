import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AlertDiv,
  AlertWrapArticle,
  AlertTextP,
  AlertBottomSection,
  AlertCancelBtn,
  AlertMainBtn,
  AlertLineSpan,
} from './AlertStyle';
import { feedDeleteApi, feedReportApi } from '../../../api/feed';
import { recommendDeleteApi } from '../../../api/recommend';
import { commentDeleteApi, commentReportApi } from '../../../api/comments';
import { userInfoApi } from '../../../api/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import { cardShowState } from '../../../recoil/cardShowAtom';

export default function Alert({
  type,
  alertClose,
  modalClose,
  productId,
  handleCommentDelete,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useRecoilState(modalState);
  const setCardShow = useSetRecoilState(cardShowState);

  const onClickLogout = () => {
    setModal({ show: false, type: 'myProfile', commentId: null, feedId: null });
    setTimeout(() => {
      sessionStorage.clear();
      navigate('/');
    }, 0);
  };
  const handleDeleteFeed = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await feedDeleteApi(modal.feedId, token);
      alertClose('feed');
      modalClose('myFeed');
      navigate('/myprofile', {
        state: {
          accountname: sessionStorage.getItem('accountname'),
          feedId: modal.feedId,
        },
      });
      try {
        await userInfoApi(token);
      } catch (error) {
        console.error('Failed to fetch post info:', error);
      }
    } catch (error) {
      console.error('Delete request failed', error);
      navigate('/error');
    }
    // window.location.reload();
  };

  const handleDeletePlace = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await recommendDeleteApi(productId, token);
      alertClose('place');
      modalClose('myPlace');
      if (location.pathname === '/placelist') {
        navigate('/placelist');
      } else {
        navigate('/myprofile');
      }

      setCardShow(false);
    } catch (error) {
      console.error('Delete request failed', error);
      navigate('/error');
    }
  };

  const handleDeleteComment = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await commentDeleteApi(modal.feedId, modal.commentId, token);
      alertClose('comment');
      modalClose('myFeedComment');
      handleCommentDelete(modal.commentId);
    } catch (error) {
      console.error('Delete request failed', error);
    }
  };

  const handleReportComment = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await commentReportApi(modal.feedId, modal.commentId, token);
      alertClose('reportComment');
      modalClose('yourComment');
      alert('해당 댓글을 신고하였습니다.');
    } catch (error) {
      console.error('Delete request failed', error);
    }
  };

  const handleReportFeed = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await feedReportApi(modal.feedId, token);
      alertClose('reportFeed');
      modalClose('yourFeed');
      alert('해당 게시글을 신고하였습니다.');
    } catch (error) {
      console.error('Delete request failed', error);
    }
  };

  const handleReportUser = async () => {
    alertClose('reportUser');
    modalClose('yourProfile');
    alert('해당 혼바비언을 신고하였습니다.');
  };

  const UI = {
    logout: (
      <AlertWrapArticle>
        <AlertTextP>로그아웃하시겠어요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={onClickLogout}>로그아웃</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    feed: (
      <AlertWrapArticle>
        <AlertTextP>게시글을 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleDeleteFeed}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    place: (
      <AlertWrapArticle>
        <AlertTextP>냠냠평가를 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleDeletePlace}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    comment: (
      <AlertWrapArticle>
        <AlertTextP>댓글을 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleDeleteComment}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    reportUser: (
      <AlertWrapArticle>
        <AlertTextP>정말 신고하시겠어요? :&#40;</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleReportUser}>확인</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    reportFeed: (
      <AlertWrapArticle>
        <AlertTextP>정말 신고하시겠어요? :&#40;</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleReportFeed}>확인</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    reportComment: (
      <AlertWrapArticle>
        <AlertTextP>정말 신고하시겠어요? :&#40;</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan />
          <AlertMainBtn onClick={handleReportComment}>확인</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
  };

  return <AlertDiv>{UI[type]}</AlertDiv>;
}
