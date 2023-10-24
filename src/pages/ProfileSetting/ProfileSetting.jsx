import React, { useState } from 'react'
import Button from '../../components/common/Button/Button';
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { LabelStyle, InputStyle } from '../../components/Signup/SignUpStyle';

//GlobalStyle 적용이 왜 안되지..?
const ProfileContainerStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FormTitleStyle = styled.h1`
  color: #000;

  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  `
const SubTitleStyle = styled.p`
  margin-top: 12px;
  color: var(--767676, #767676);
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
`

const ImageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileFormContainer =  styled.form`
  display: flex;
  flex-direction:column;
  align-items: flex-start;

  gap: 12px;
`

const InputImage = styled.input`
  width: 36px;
  height: 36px;
  background-image: url("../../images/upload-file.svg") no-repeat;
`

export default function ProfileSettingStyle() {
  const [abledBtn, setAbledBtn] = useState(true);
  const clickedToggle = () => {
    setAbledBtn((prev) => {
      return !prev;
    });
  };

  return (
      <ProfileContainerStyle>
        <TextWrapper>
          <FormTitleStyle>입력한 개인정보가 맞다면<br />아래의 확인버튼을 눌러주세요.</FormTitleStyle>
          <SubTitleStyle>언제라도 변경할 수 있습니다 :)</SubTitleStyle>
        </TextWrapper>
        <ImageFormContainer>
          <label>프로필 이미지</label>
          <InputImage type = "file" accept="image/jpg, image/jpeg, image/png" />
        </ImageFormContainer>
        <ProfileFormContainer>
            <LabelStyle>사용자 이름</LabelStyle>
            <InputStyle type = "text" placeholder = "2-10자 이내로 작성 부탁드릴게요" />
            <LabelStyle>계정 ID</LabelStyle>
            <InputStyle type = "text" placeholder = "영문, 숫자, 특수문자(.),(_)만 사용 가능해요." />
            <LabelStyle>소개</LabelStyle>
            <InputStyle type = "text" placeholder = "자신과 판매할 상품에 대해 소개해 주세요!" />
            <Button content = "확인" className = "btn-user-info" $bgcolor = {abledBtn ? 'active' : 'inactive'}
            onClick = {clickedToggle}/>
        </ProfileFormContainer>
      </ProfileContainerStyle>
  )
} 