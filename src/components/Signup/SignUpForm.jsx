import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../common/StyledButton';

import {
  LoginModalContainer,
  TitleText,
  FormContainer,
  LabelText,
  InputText,
  ErrorStyle,
} from './SignUpStyle';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const [abledBtn, setAbledBtn] = useState(true);
  const clickedToggle = () => {
    setAbledBtn((prev) => {
      return !prev;
    });
  };

  return (
    <LoginModalContainer>
      <TitleText>회원가입을 도와드릴게요!</TitleText>
      <FormContainer
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <LabelText>이메일</LabelText>
        <InputText
          {...register('email', {
            required: '이메일은 필수 입력입니다',
            //api통신을 통해 데이터베이스에 있는 이메일과 비교하기
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '유효하지 않은 이메일 포맷이에요 :(',
            },
          })}
          placeholder='이메일을 입력해주세요'
        />
        <ErrorStyle>{errors.email?.message}</ErrorStyle>
        <LabelText>비밀번호</LabelText>
        <InputText
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',

            minLength: {
              value: 4,
              message: '비밀번호는 6자 이상이여야해요 :(',
            },
          })}
          placeholder='비밀번호를 입력해주세요'
        />
        <ErrorStyle>{errors.password?.message}</ErrorStyle>
        <StyledButton
          type='submit'
          className='btn-login'
          bgColor={abledBtn ? 'active' : 'inactive'}
          // disabled={!abledBtn}
          onClick={clickedToggle}
        >
          다음
        </StyledButton>
      </FormContainer>
    </LoginModalContainer>
  );
};

export default SignUpForm;
