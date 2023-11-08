import React, { useEffect } from 'react';
import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signUpState } from '../../recoil/signUpAtom';

export default function ProfileSetting() {
  const navigate = useNavigate();
  const [signUp] = useRecoilState(signUpState);

  useEffect(() => {
    if (
      sessionStorage.getItem('_id') ||
      sessionStorage.getItem('accountname') ||
      sessionStorage.getItem('token')
    ) {
      navigate('/home');
    } else if (signUp.oneCheck === false) {
      navigate('/signup');
    }
  }, [navigate, signUp]);
  return <ProfileSettingForm />;
}
