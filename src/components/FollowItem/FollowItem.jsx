import React, { useState } from 'react';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { followApi, unfollowApi } from '../../api/follow';
import {
  Container,
  FollowerImg,
  FollowerInfo,
  FollowerName,
  FollowerIntro,
} from './FollowItemStyle';

export default function FollowItem({
  username,
  intro,
  image,
  accountname,
  isfollow,
}) {
  const [follow, setFollow] = useState(isfollow);
  const myaccountname = sessionStorage.getItem('accountname');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  function moveProfile(accountname) {
    if (accountname === myaccountname) {
      navigate('/myprofile');
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
  }

  const toggleFollow = async () => {
    try {
      if (!follow) {
        await followApi(accountname, token);
      } else {
        await unfollowApi(accountname, token);
      }
      setFollow(!follow);
    } catch (err) {
      navigate('/error');
    }
  };

  return (
    <Container>
      <FollowerImg
        src={image}
        alt='프로필 이미지'
        onClick={() => moveProfile(accountname)}
      />
      <FollowerInfo onClick={() => moveProfile(accountname)}>
        <FollowerName>{username}</FollowerName>
        <FollowerIntro>{intro}</FollowerIntro>
      </FollowerInfo>
      {accountname !== myaccountname && (
        <Button
          type='button'
          content={follow ? '팔로잉' : '팔로우'}
          width='s'
          size='s'
          $bgcolor={!follow ? 'active' : '#FF644B'}
          $border={follow ? 'active' : ''}
          color={follow ? 'active' : '#fff'}
          onClick={toggleFollow}
        />
      )}
    </Container>
  );
}
