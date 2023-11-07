import React, { useState, useEffect, useRef, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import Comment from '../../Comment/Comment';
import BasicProfile from '../../../images/logo_bowl_gray.svg';
import { feedInfoApi } from '../../../api/feed';
import { commentListApi, commentUploadApi } from '../../../api/comments';
import { userInfoApi } from '../../../api/user';
import {
  FeedItemSection,
  CommentSection,
  FeedUserImg,
  BtnDisplay,
  WriteComment,
  WriteCommentSection,
  DetailFeedWrapper,
  CommentWrapper,
} from './StyledFeedComment';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { feedState } from '../../../recoil/feedEditAtom';
import { modalState } from '../../../recoil/modalAtom';
import { Suspense } from 'react';

const Modal = lazy(() => import('../../Modal/Modal/Modal'));

export default function FeedComment() {
  const [inputValue, setInputValue] = useState('');
  // const [selectedId, setSelectedId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const location = useLocation();
  const [comment, setComment] = useState([]);
  const data = location.state;
  const token = sessionStorage.getItem('token');
  const where = sessionStorage.getItem('accountname');
  const { id, infoToIterate } = data;
  const [commentCnt, setCommentCnt] = useState(infoToIterate.commentCount);
  const [myFeedInfo, setMyFeedInfo] = useState(infoToIterate);
  const [shouldFetchFeedInfo, setShouldFetchFeedInfo] = useState(false);
  const [myImg, setMyImg] = useState('');
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const [modal, setModal] = useRecoilState(modalState);
  const setFeed = useSetRecoilState(feedState);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchFeedInfo = async () => {
    try {
      const res = await feedInfoApi(id, token);
      const feed = res.data.post;
      setMyFeedInfo(feed);
      setShouldFetchFeedInfo(false);
      setCommentCnt(feed.commentCount);
    } catch (error) {
      navigate('/error');
    }
  };
  const uploadComment = async () => {
    try {
      const res = await commentUploadApi(id, inputValue, token);
      setInputValue('');
      loadCommentList();
      setCommentList((prev) => [res.data.comment, ...prev]);
      setComment(res.data.comment);
      setCommentCnt((prev) => prev + 1);
      setInputValue('');
    } catch (err) {}
  };

  const getCommentList = async (options) => {
    const res = await commentListApi(options);
    return res.data.comments;
  };

  const loadCommentList = async (options) => {
    try {
      const comments = await getCommentList(options);
      const uniqueComments = comments.filter(
        (newComment) =>
          !commentList.some(
            (existingComment) => existingComment.id === newComment.id,
          ),
      );
      setCommentList((prevComments) => [...prevComments, ...uniqueComments]);
      setSkip((prev) => prev + uniqueComments.length);
    } catch (err) {}
  };
  const getUserInfo = async () => {
    try {
      const res = await userInfoApi(token);
      const image = res.data.user;
      setMyImg(image);
    } catch (error) {
      navigate('/error');
    }
  };

  useEffect(() => {
    loadCommentList();
    if (shouldFetchFeedInfo) {
      fetchFeedInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchFeedInfo, comment]);

  useEffect(() => {
    getUserInfo();
    fetchFeedInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 댓글 무한 스크롤
  useEffect(() => {
    const onIntersect = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setPage((p) => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer]);

  useEffect(() => {
    if (page === 0) return;
    loadCommentList({ id, token, limit: 14, skip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const modalOpen = (type, id, name) => {
    setModal({
      show: true,
      type,
      feedId: id,
      accountname: name,
    });
  };

  const moveUpload = async (item) => {
    const res = await feedInfoApi(item.id, token);
    setFeed({
      type: 'edit',
      id: res.data.post.id,
      images: res.data.post.image === '' ? [] : res.data.post.image.split(','),
      text: res.data.post.content,
    });
    navigate('/feedupload');
    setModal({ show: false });
  };

  // 댓글 삭제
  const handleCommentDelete = (deletedCommentId) => {
    const updatedCommentList = commentList.filter(
      (comment) => comment.id !== deletedCommentId,
    );
    setCommentList(updatedCommentList);
    setCommentCnt((prev) => prev - 1);
  };

  function moveProfile(accountname) {
    const where = sessionStorage.getItem('accountname');
    if (accountname === where) {
      navigate('/myprofile', {
        state: {
          accountname: accountname,
        },
      });
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }

  return (
    <>
      <DetailFeedWrapper>
        <FeedItemSection>
          <FeedItem
            modalOpen={() =>
              modalOpen(
                where === infoToIterate.author.accountname
                  ? 'myFeed'
                  : 'yourFeed',
                myFeedInfo.id,
                infoToIterate.author.accountname,
              )
            }
            feedInfo={myFeedInfo}
            getUserInfo={fetchFeedInfo}
            setCommentCnt={setCommentCnt}
            commentCnt={commentCnt}
            detail={true}
          />
        </FeedItemSection>
        <CommentSection>
          <CommentWrapper>
            <Comment
              commentList={commentList}
              feedId={id}
              loadCommentList={loadCommentList}
              moveProfile={moveProfile}
            />
          </CommentWrapper>
          <div ref={observer} />
        </CommentSection>
        <WriteCommentSection>
          <FeedUserImg src={myImg.image || BasicProfile} alt='사용자 이미지' />
          <WriteComment
            type='text'
            placeholder='댓글 입력하기'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim().length > 0) {
                e.preventDefault();
                uploadComment();
              }
            }}
          />
          <BtnDisplay
            type='submit'
            onClick={uploadComment}
            $hastext={inputValue.trim().length > 0}
          >
            게시
          </BtnDisplay>
        </WriteCommentSection>
      </DetailFeedWrapper>
      {modal.show && (
        <Suspense>
          <Modal
            type={modal.type}
            handlerFeedEdit={() => moveUpload(infoToIterate)}
            handlerProfile={() => moveProfile(modal.accountname)}
            handleCommentDelete={handleCommentDelete}
            detail={true}
          />
        </Suspense>
      )}
    </>
  );
}
