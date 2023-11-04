import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import sprite from '../../../images/SpriteIcon.svg';
import Stack from '../../../images/stack.svg';
import feedListSvg from '../../../images/feedList-logo.svg';
import Modal from '../../Modal/Modal/Modal';
import FeedEdit from '../FeedEdit/FeedEdit';
import {
  FeedListBtnWrap,
  ImgInfo,
  ImgBtn,
  FeedItemList,
  FeedListItem,
  GridItemWrap,
  GridItemList,
  IconContainer,
  Icon,
  Likes,
  Comments,
  NoFeedImg,
  NoFeedWrap,
  NoFeedP,
} from './StyledFeedList';
import { userFeedListApi } from '../../../api/feed';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import { feedState } from '../../../recoil/feedEditAtom';
import { useRef } from 'react';
import Loading from '../../Loading/Loading';

export default function FeedList() {
  const ViewSVG = ({ id, color = 'white', size = 26 }) => (
    <svg fill={color} width={size} height={size} stroke={color}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  const [viewMode, setViewMode] = useState('list');
  const location = useLocation();
  const navigate = useNavigate();
  const [feedInfo, setFeedInfo] = useState([]);
  const [hasFeeds, setHasFeeds] = useState(false);
  const [feedEditModalOpen, setFeedEditModalOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const setFeed = useSetRecoilState(feedState);
  const observer = useRef();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const where = localStorage.getItem('accountname');

  const { accountname } = location.state || {};
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getUserInfo = useCallback(async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await userFeedListApi(
        accountname || localStorage.getItem('accountname'),
        token,
        limit,
        skip,
      );
      const posts = res.data.post;
      if (posts.length > 0) {
        setHasFeeds(true);
        setFeedInfo((prev) => [...prev, ...posts]);
      }
      setSkip((prev) => prev + posts.length);
      setLoading(false);
    } catch (error) {
      console.error('error');
      navigate('/error');
    }
  }, [accountname, limit, skip, navigate]);

  useEffect(() => {
    if (page === 1) getUserInfo();
  }, [page, getUserInfo]);

  useEffect(() => {
    setPage(1);
  }, []);

  function moveDetail(item) {
    navigate('/feeddetail', {
      state: {
        id: item.id,
        infoToIterate: item,
      },
    });
    setModal({ show: false });
  }

  function moveUpload(item) {
    navigate('/feedUpload');
    setModal({ show: false });
    setFeed({
      type: 'edit',
      id: item.id,
      images: item.image.split(','),
      text: item.content,
    });
  }

  const modalOpen = (type, item) => {
    setModal({
      show: true,
      type: type,
      feedId: item.id,
      accountname: item.author.accountname,
      item: item,
    });
  };

  useEffect(() => {
    const onIntersect = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setPage((p) => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 1 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, []);

  useEffect(() => {
    setHasFeeds(false);
    setSkip(0);
    setPage(0);
    setFeedInfo([]);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : hasFeeds ? (
        <>
          <FeedListBtnWrap>
            <button type='button' onClick={() => handleViewModeChange('list')}>
              <ViewSVG
                id={
                  viewMode === 'list'
                    ? 'icon-post-list-on'
                    : 'icon-post-list-off'
                }
              />
              <h2 className='a11y-hidden'>게시물 리스트 타입으로 보기 버튼</h2>
            </button>
            <button type='button' onClick={() => handleViewModeChange('album')}>
              <ViewSVG
                id={
                  viewMode === 'album'
                    ? 'icon-post-album-on'
                    : 'icon-post-album-off'
                }
              />
              <h2 className='a11y-hidden'>게시물 앨범 형태로 보기 버튼</h2>
            </button>
          </FeedListBtnWrap>
          {viewMode === 'list' ? (
            <FeedItemList>
              {feedInfo.map((item) => (
                <FeedListItem key={item.id}>
                  <FeedItem
                    modalOpen={() =>
                      modalOpen(
                        where === item.author.accountname
                          ? 'myFeed'
                          : 'yourFeed',
                        item,
                      )
                    }
                    feedInfo={item}
                    getUserInfo={getUserInfo}
                    commentCnt={item.commentCount}
                  />
                </FeedListItem>
              ))}
            </FeedItemList>
          ) : (
            <GridItemWrap>
              {feedInfo.map((item) => (
                <GridItemList $hasimage={item.image === ''} key={item.id}>
                  <ImgBtn
                    onClick={() => {
                      moveDetail(item);
                    }}
                  >
                    {item.image !== '' && (
                      <img
                        src={
                          item.image.startsWith('https://')
                            ? item.image.split(',')[0].trim()
                            : `https://api.mandarin.weniv.co.kr/${item.image
                                .split(',')[0]
                                .trim()}`
                        }
                        alt='grid 이미지'
                      />
                    )}
                    {item.image.includes(',') && (
                      <IconContainer>
                        <Icon src={Stack} />
                      </IconContainer>
                    )}
                    <ImgInfo>
                      <Likes>
                        <ViewSVG id='icon-heart' size={19} />
                        {item.heartCount}
                      </Likes>
                      <Comments>
                        <ViewSVG id='icon-message-circle' size={19} />
                        {item.commentCount}
                      </Comments>
                    </ImgInfo>
                  </ImgBtn>
                </GridItemList>
              ))}
            </GridItemWrap>
          )}
        </>
      ) : (
        <NoFeedWrap>
          <NoFeedImg src={feedListSvg} />
          <NoFeedP>등록된 게시글이 없어요</NoFeedP>
        </NoFeedWrap>
      )}
      <div ref={observer} />
      {modal.show && (
        <Modal
          type={modal.type}
          handlerFeedDetail={() => moveDetail(modal.item)}
          handlerFeedEdit={() => moveUpload(modal.item)}
        />
      )}
    </>
  );
}
