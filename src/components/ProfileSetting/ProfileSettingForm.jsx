import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input/Input";
import {
  ProfileContainerStyle,
  TextWrapper,
  FormTitleStyle,
  StyledButton,
  SubTitleStyle,
  ImageFormContainer,
  ProfileFormContainer,
  InputImage,
  ErrorStyle
} from "./ProfileSettingStyle";

const ProfileSettingForm = () => {
    const {
      register,
      formState: { errors, isValid },
    } = useForm({
      mode: "onSubmit",
      defaultValues: {
        userID: null,
        userName: null,
        userDesc: null
      },
    });

  const [abledBtn, setAbledBtn] = useState(true);

  //isValid와 setAbledBtn에 변화가 있을때만 리렌더링
  useEffect(() => {
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

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
            <Input
                label = "사용자 이름"
                id = "user-name"
                type = "text"
                placeholder = "2~10자 이내로 작성 부탁드릴게요."
                hasError = "true"
                {...register("userName", {
                  required: "사용자 이름은 필수 입력입니다."
                })}
             />
             <ErrorStyle>{errors.userName?.message}</ErrorStyle>
             <Input
                label = "계정 ID"
                id = "user-id"
                type = "text"
                placeholder = "영문, 숫자, 특수문자(.),(_)만 사용 가능해요."
                hasError = "true"
             />
             <ErrorStyle>{errors.userID?.message}</ErrorStyle>
             <Input
                label = "소개"
                id = "user-desc"
                type = "text"
                placeholder = "자신과 판매할 상품에 대해 소개해 주세요!"
                hasError = "true"
             />
             <ErrorStyle>{errors.userDesc?.message}</ErrorStyle>
        <StyledButton
          className='btn-signup'
          $bgcolor={abledBtn ? 'active' : 'inactive'}
          disabled={!abledBtn}>
            다음
          </StyledButton>
        </ProfileFormContainer>
      </ProfileContainerStyle>
  )
} 


export default ProfileSettingForm;