import React, { useRef, useState, useEffect } from 'react';
import FollowItem from '../../components/FollowItem/FollowItem';
import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FollowList,
  FollowListItem,
  NoFollowCryImg,
  ImgWrap,
  NoFollowP,
} from './FollowerListStyle';
import { followerListApi, followingListApi } from '../../api/follow';
import FeedlistImg from '../../images/feedList-logo.svg';

export default function FollowerList({ type, followType }) {
  const token = sessionStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const accountname = location.state.accountname;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [page, setPage] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 15;
  const observer = useRef();

  const getFollowerList = async (limit, skip) => {
    try {
      const res = await followerListApi(accountname, token, limit, skip);
      setFollowerList((prev) => [...prev, ...res.data]);
      setSkip((prev) => prev + res.data.length);
    } catch (err) {
      navigate('/error');
    }
  };

  const getFollowingList = async (limit, skip) => {
    try {
      const res = await followingListApi(accountname, token, limit, skip);
      setFollowingList((prev) => [...prev, ...res.data]);
      setSkip((prev) => prev + res.data.length);
    } catch (err) {
      navigate('/error');
    }
  };
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

    type === 'followers'
      ? getFollowerList(limit, skip)
      : getFollowingList(limit, skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const followTypeUI = {
    followerList: (
      <>
        <Header type={type} />
        <FollowList>
          {followerList.map((follower, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem
                  username={follower.username}
                  intro={follower.intro}
                  image={follower.image}
                  accountname={follower.accountname}
                  isfollow={follower.isfollow}
                />
              </FollowListItem>
            );
          })}
          {followerList.length === 0 && (
            <ImgWrap>
              <NoFollowCryImg src={FeedlistImg} alt='이미지 설명' />
              <NoFollowP>아무도 없어요</NoFollowP>
            </ImgWrap>
          )}
          <div ref={observer} />
        </FollowList>
        <Nav />
      </>
    ),

    followingList: (
      <>
        <Header type={type} />
        <FollowList>
          {followingList.map((following, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem
                  username={following.username}
                  intro={following.intro}
                  image={following.image}
                  accountname={following.accountname}
                  isfollow={following.isfollow}
                  getFollowerList={getFollowerList}
                  getFollowingList={getFollowingList}
                />
              </FollowListItem>
            );
          })}
          {followingList.length === 0 && (
            <ImgWrap>
              <NoFollowCryImg src={FeedlistImg} alt='이미지 설명' />
              <NoFollowP>아무도 없어요</NoFollowP>
            </ImgWrap>
          )}
          <div ref={observer} />
        </FollowList>
        <Nav />
      </>
    ),
  };
  return <>{followTypeUI[followType]}</>;
}
