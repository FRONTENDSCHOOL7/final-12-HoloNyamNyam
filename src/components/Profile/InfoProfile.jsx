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
} from './StyledInfoProfile';
import { userInfoApi } from '../../api/user';
import { ProfileApi } from '../../api/profile';
import { userFeedCntApi } from '../../api/feed';
import RatePlace from '../../components/Profile/RatePlace';
import Loading from '../Loading/Loading';

export default function InfoProfile({ type }) {
  const [userInfo, setUserInfo] = useState({});
  const [postCnt, setPostCnt] = useState(0);
  const [follow, setFollow] = useState(true);
  const [followerInfo, setFollowerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateList, setRateList] = useState(false);

  const location = useLocation();
  const token = localStorage.getItem('token');
  const myId = localStorage.getItem('_id');

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
  }, [location, type, token]);

  useEffect(() => {
    const following = followerInfo.some((x) => x === myId);
    setFollow(!following);
    localStorage.setItem('follow', !following ? 'false' : 'true');
  }, [followerInfo, myId]);

  useEffect(() => {
    const savedFollow = localStorage.getItem('follow');
    setFollow(savedFollow === 'false');
  }, []);

  useEffect(() => {
    if (postCnt > 0) {
      setRateList(true);
    } else {
      setRateList(false);
    }
  }, [postCnt]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <InfoTopWrap>
        <ProfileImg src={userInfo.image} alt='프로필 이미지' />
        <CntWrap>
          <div>
            <CntSpan>{postCnt}</CntSpan>
            <CntP>posts</CntP>
          </div>
          <Link
            to='/followerlist'
            state={{
              accountname: userInfo.accountname,
            }}
          >
            <CntSpan>{userInfo.followerCount}</CntSpan>
            <CntP>followers</CntP>
          </Link>
          <Link
            to='/followinglist'
            state={{
              accountname: userInfo.accountname,
            }}
          >
            <CntSpan>{userInfo.followingCount}</CntSpan>
            <CntP>followings</CntP>
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
      {rateList && <RatePlace name={userInfo.username} />}
    </>
  );
}
