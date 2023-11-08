import React, { useEffect } from 'react';
import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetting() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem('_id') ||
      sessionStorage.getItem('accountname') ||
      sessionStorage.getItem('token')
    ) {
      navigate('/home');
    }
  }, [navigate]);
  return <ProfileSettingForm />;
}
