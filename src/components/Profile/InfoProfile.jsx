import React, { useEffect, useState } from 'react';
import BtnProfile from '../../components/Profile/BtnProfile';
import { Link, useLocation } from 'react-router-dom';
import {
  InfoTopWrap,
  ProfileImg,
  CntWrap,
  CntSpan,
  CntP,
  InfoBottomSection,
  UserName,
  UserId,
  UserText,
  GradientBg,
  CtnTap,
} from './StyledInfoProfile';
import { userInfoApi } from '../../api/user';
import { ProfileApi } from '../../api/profile';
import { userFeedCntApi } from '../../api/feed';
import Loading from '../Loading/Loading';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoAtom';

export default function InfoProfile({ type }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [postCnt, setPostCnt] = useState(0);
  const [follow, setFollow] = useState(true);
  const [followerInfo, setFollowerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const myId = sessionStorage.getItem('_id');

  useEffect(() => {
    const getUserInfo = async () => {
      const yourAccountname = location.state;
      setLoading(true);

      if (type === 'my') {
        const res = await userInfoApi(token);
        setFollowerInfo(res.data.user.follower);
        const {
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        } = res.data.user;

        setUserInfo({
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        });
        if (accountname) {
          const res = await userFeedCntApi(accountname, token);
          const cnt = res.data.post.length;
          setPostCnt(cnt);
        }
      } else if (type === 'your' && yourAccountname) {
        const res = await ProfileApi(yourAccountname.accountname, token);
        setFollowerInfo(res.data.profile.follower);
        const {
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        } = res.data.profile;

        setUserInfo({
          accountname,
          username,
          followingCount,
          followerCount,
          image,
          isfollow,
          intro,
        });
        if (accountname) {
          const res = await userFeedCntApi(accountname, token);
          const cnt = res.data.post.length;
          setPostCnt(cnt);
        }
      }
      setLoading(false);
    };
    getUserInfo();
  }, [type, token, location.state, setUserInfo]);

  useEffect(() => {
    const following = followerInfo.some((x) => x === myId);
    setFollow(!following);
    sessionStorage.setItem('follow', !following ? 'false' : 'true');
  }, [followerInfo, myId]);

  useEffect(() => {
    const savedFollow = sessionStorage.getItem('follow');
    setFollow(savedFollow === 'false');
  }, []);

  const scrollToBottom = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: 0.7 * windowHeight,
      behavior: 'smooth',
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <GradientBg />
      <InfoTopWrap>
        <ProfileImg src={userInfo.image} alt='프로필 이미지' />
        <CntWrap>
          <CtnTap onClick={scrollToBottom}>
            <CntSpan>{postCnt}</CntSpan>
            <CntP>posts</CntP>
          </CtnTap>
          <Link
            to='/followerlist'
            state={{
              accountname: userInfo.accountname,
            }}
          >
            <CtnTap>
              <CntSpan>{userInfo.followerCount}</CntSpan>
              <CntP>followers</CntP>
            </CtnTap>
          </Link>
          <Link
            to='/followinglist'
            state={{
              accountname: userInfo.accountname,
            }}
          >
            <CtnTap>
              <CntSpan>{userInfo.followingCount}</CntSpan>
              <CntP>followings</CntP>
            </CtnTap>
          </Link>
        </CntWrap>
      </InfoTopWrap>
      <InfoBottomSection>
        <UserName>{userInfo.username}</UserName>
        <UserId>@ {userInfo.accountname}</UserId>
        <UserText>{userInfo.intro}</UserText>
      </InfoBottomSection>
      <BtnProfile
        type={type}
        id={userInfo.accountname}
        setFollow={setFollow}
        follow={follow}
      />
    </>
  );
}
