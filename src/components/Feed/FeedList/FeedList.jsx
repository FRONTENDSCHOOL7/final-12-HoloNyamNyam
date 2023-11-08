import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import sprite from '../../../images/SpriteIcon.svg';
import Stack from '../../../images/stack.svg';
import feedListSvg from '../../../images/feedList-logo.svg';
import {
  FeedListBtnWrap,
  ImgInfo,
  ImgBtn,
  FeedItemList,
  FeedListItem,
  GridItemWrap,
  GridItemContainer,
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

const Modal = lazy(() => import('../../Modal/Modal/Modal'));

export default function FeedList({ feedRef }) {
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
  const [modal, setModal] = useRecoilState(modalState);
  const setFeed = useSetRecoilState(feedState);
  const observer = useRef();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const [prevInfo, setPrevInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const where = sessionStorage.getItem('accountname');
  const { accountname } = location.state || {};
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  let limit = viewMode === 'album' ? '*' : 4;

  const getUserInfo = async ({ limit, skip }) => {
    setPrevInfo(prevInfo);
    const token = sessionStorage.getItem('token');
    // setLoading(true);
    try {
      let res = await userFeedListApi(
        accountname || sessionStorage.getItem('accountname'),
        token,
        limit,
        skip,
      );

      const posts = res.data.post;

      if (posts.length > 0) {
        setFeedInfo((prev) => {
          const filteredPosts = posts.filter(
            (post) => !prev.some((prevPost) => prevPost.id === post.id),
          );
          if (prevInfo.length === 0 || prevInfo[0].id !== feedInfo[0].id) {
            setSkip((prevSkip) => prevSkip + filteredPosts.length);
          }
          return [...prev, ...filteredPosts];
        });
        setHasFeeds(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('error');
      navigate('/error');
    }
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
  }, [observer, loading, viewMode]);

  useEffect(() => {
    getUserInfo({ limit, skip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      images: item.image === '' ? [] : item.image.split(','),
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
    // setHasFeeds(false);
    setSkip(0);
    setPage(0);
    setFeedInfo([]);
  }, [location.state]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : hasFeeds ? (
        <>
          <FeedListBtnWrap>
            <button
              type='button'
              onClick={() => handleViewModeChange('list')}
              title='게시물을 자세히 볼 수 있어요.'
            >
              <ViewSVG
                id={
                  viewMode === 'list'
                    ? 'icon-post-list-on'
                    : 'icon-post-list-off'
                }
              />
              <h2 className='a11y-hidden'>게시물 리스트 타입으로 보기 버튼</h2>
            </button>
            <button
              type='button'
              onClick={() => handleViewModeChange('album')}
              title='게시물을 앨범 형식으로 볼 수 있어요.'
            >
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
            <FeedItemList ref={feedRef}>
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
              <div ref={observer} />
            </FeedItemList>
          ) : (
            <GridItemContainer>
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
              <div ref={observer} />
            </GridItemContainer>
          )}
        </>
      ) : (
        <NoFeedWrap>
          <NoFeedImg src={feedListSvg} />
          <NoFeedP>등록된 게시글이 없어요</NoFeedP>
        </NoFeedWrap>
      )}
      {modal.show && (
        <Suspense>
          <Modal
            type={modal.type}
            handlerFeedDetail={() => moveDetail(modal.item)}
            handlerFeedEdit={() => moveUpload(modal.item)}
          />
        </Suspense>
      )}
    </>
  );
}
