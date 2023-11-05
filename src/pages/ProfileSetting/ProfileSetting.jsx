import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';

export default function ProfileSetting() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('_id')) {
      navigate('/');
    }
  }, [navigate]);

  if (!sessionStorage.getItem('_id')) {
    return null;
  }
  return <ProfileSettingForm />;
}
