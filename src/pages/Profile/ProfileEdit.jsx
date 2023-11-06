import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfoApi } from '../../api/user';
import ProfileEditForm from '../../components/ProfileEdit/ProfileEditForm';

export default function ProfileEdit() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

  const token = sessionStorage.getItem('token');
  const [userInfo, setUserInfo] = useState({
    image: '',
    username: '',
    accountname: '',
    intro: '',
  });

  useEffect(() => {
    prevUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }

  const prevUserInfo = async () => {
    try {
      const res = await userInfoApi(token);
      const { image, username, accountname, intro } = res.data.user;
      setUserInfo({ image, username, accountname, intro });
    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };

  return <ProfileEditForm userInfo={userInfo} setUserInfo={setUserInfo} />;
}
