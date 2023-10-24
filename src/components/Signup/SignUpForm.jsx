import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button/Button';
import axios from "axios"
import {
  SignUpContainerStyle,
  TitleStyle,
  FormContainerStyle,
  LabelStyle,
  InputStyle,
  ErrorStyle,
} from './SignUpStyle';

const BASE_URL = "https://api.mandarin.weniv.co.kr";

const EmailValid = async email => {
  const res = await axios.post(
    `${BASE_URL}/user/emailvalid`,
    {
      user: {
        email: email,
      },
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  return res;
};

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

  const handleSubmitData = async data => {
    await console.log(data);
  }

  const [abledBtn, setAbledBtn] = useState(true);
  const clickedToggle = () => {
    setAbledBtn((prev) => {
      return !prev;
    });
  };

  return (
    <SignUpContainerStyle>
      <TitleStyle>회원가입을 도와드릴게요!</TitleStyle>
      <FormContainerStyle
        onSubmit={handleSubmit(handleSubmitData)}
      >
        <LabelStyle>이메일</LabelStyle>
        <InputStyle
        autoComplete='off'
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
        <LabelStyle>비밀번호</LabelStyle>
        <InputStyle 
        type = "password"
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 6,
              message: '비밀번호는 6자 이상이여야해요 :(',
            },
          })}
          placeholder='비밀번호를 입력해주세요'
        />
        <ErrorStyle>{errors.password?.message}</ErrorStyle>
        <Button
          content = "다음"
          className='btn-signup'
          $bgcolor={abledBtn ? 'active' : 'inactive'}
          // disabled={!abledBtn}
          onClick={clickedToggle}
        />
      </FormContainerStyle>
    </SignUpContainerStyle>
  );
};

export default SignUpForm;
