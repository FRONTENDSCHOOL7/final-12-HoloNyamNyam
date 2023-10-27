import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import Comment from '../../Comment/Comment';
import Modal from '../../Modal/Modal/Modal';
import FeedEdit from '../FeedEdit/FeedEdit';
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
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';

export default function DetailFeed() {
  const [inputValue, setInputValue] = useState('');
  // const [selectedId, setSelectedId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [feedEditModalOpen, setFeedEditModalOpen] = useState(false);
  const location = useLocation();
  const [comment, setComment] = useState([]);
  const data = location.state;
  const token = localStorage.getItem('token');
  const where = localStorage.getItem('accountname');
  const { id, infoToIterate } = data;
  const [commentCnt, setCommentCnt] = useState(infoToIterate.commentCount);
  const [myFeedInfo, setMyFeedInfo] = useState(infoToIterate);
  const [shouldFetchFeedInfo, setShouldFetchFeedInfo] = useState(false);
  const [myImg, setMyImg] = useState('');
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const observer = useRef();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = (type, id) => {
    setModal({
      show: true,
      type,
      feedId: id,
    });
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
      setCommentList((prev) => [...prev, res.data.comment]);
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
  const openFeedEditModal = () => {
    setFeedEditModalOpen(true);
  };

  const closeFeedEditModal = () => {
    setFeedEditModalOpen(false);
    setShouldFetchFeedInfo(true);
    setModal((prevModal) => ({ ...prevModal, show: false }));
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

  // 댓글 삭제
  const handleCommentDelete = (deletedCommentId) => {
    const updatedCommentList = commentList.filter(
      (comment) => comment.id !== deletedCommentId,
    );
    setCommentList(updatedCommentList);
    setCommentCnt((prev) => prev - 1);
  };

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
              )
            }
            feedInfo={myFeedInfo}
            getUserInfo={fetchFeedInfo}
            setCommentCnt={setCommentCnt}
            commentCnt={commentCnt}
          />
        </FeedItemSection>
        <CommentSection>
          <CommentWrapper>
            <Comment
              commentList={commentList}
              feedId={id}
              loadCommentList={loadCommentList}
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
        <Modal
          type={modal.type}
          handlerFeedEdit={openFeedEditModal}
          handleCommentDelete={handleCommentDelete}
          handlerMyProfile={() => navigate(`/myprofile`)}
        />
      )}
      {feedEditModalOpen && (
        <FeedEdit closeModal={closeFeedEditModal} feedId={modal.feedId} />
      )}
    </>
  );
}
