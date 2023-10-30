import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfoApi } from "../../api/user";
import Header from '../../components/common/Header/Header';
import ProfileEditForm from '../../components/ProfileEdit/ProfileEditForm';
//import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';
import { StyledProfileEditWrap } from '../../components/ProfileEdit/ProfileEditFormStyle';

//일단 구현 후 리팩토링
/* 
- 새로운 header type을 만들어서 작업
1. Header.jsx 컴포넌트에 editprofile 타입을 새로 만들어서 작업
2. ProfileEditForm.jsx 컴포넌트를 새로 만들어서 ProfileSettingForm의 
유효성 검사를 가져와서 작업하되 "프로필 수정" api만 가져와서 새롭게 작업
3. 근데 button의 background 색깔은 왜 저따구...

단점: - 많아지는 코드, 줄어드는 재사용성, 복잡해지는 구조
 */

/* 
- header는  button만 어떻게 position으로 위치를 조정 

문제: - position을 씀으로써 늘어나는 렌더링 시간, header의 position: static 요소땜에
z-index가 먹히지 않음 (position을 바꾸면 header 아래의 줄이 사라짐)
*/

/* - ui 수정 안하면 안될까여.... */

export default function ProfileEdit() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
    accountname: "",
    intro: "",
  });

  
  useEffect(() => {
    prevUserInfo();
  }, []);

  const prevUserInfo = async () => {
    try {
      const res = await userInfoApi(token);
      const { image, username, accountname, intro } = res.data.user;
      setUserInfo({ image, username, accountname, intro });
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <>
      <ProfileEditForm userInfo={userInfo} setUserInfo={setUserInfo}/>
      {/* <ProfileSettingForm /> */}
    </>
  );
}
