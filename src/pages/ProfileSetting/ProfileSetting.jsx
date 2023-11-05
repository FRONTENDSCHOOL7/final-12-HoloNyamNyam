import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';

export default function ProfileSetting() {
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

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }
  return <ProfileSettingForm />;
}
