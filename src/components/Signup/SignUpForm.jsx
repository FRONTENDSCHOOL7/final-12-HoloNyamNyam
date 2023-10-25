import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailValid } from '../../api/signUp';
//import Input from '../common/Input/Input';
import {
  SignUpContainerStyle,
  TitleStyle,
  FormContainerStyle,
  InputStyle,
  LabelStyle,
  ErrorStyle,
  StyledButton,
} from './SignUpStyle';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const navigate = useNavigate();
  const [abledBtn, setAbledBtn] = useState(true);

  //isValid와 setAbledBtn에 변화가 있을때만 리렌더링

  const checkEmailValid = async (email) => {
    try {
      const res = await EmailValid(email);
      const reqMsg = res.data.message;
      clearErrors('email');
      if (reqMsg === '이미 가입된 이메일 주소 입니다.') {
        setError('email', {
          type: 'manual',
          message: '이미 가입된 이메일 주소 입니다.',
        });
        return false;
      } else {
        clearErrors('email');
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSubmitData = async (data) => {
    const isValidEmail = await checkEmailValid(data.email);
    if (isValidEmail) {
      navigate('./profile', {
        state: {
          email: data.email,
          password: data.password,
        },
      });
    }
  };

  useEffect(() => {
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

  return (
    <SignUpContainerStyle>
      <TitleStyle>회원가입을 도와드릴게요!</TitleStyle>
      <FormContainerStyle onSubmit={handleSubmit(handleSubmitData)}>
        {/* <Input
          label='이메일'
          id='email'
          type='email'
          placeholder='이메일을 입력해주세요.'
          hasError={hasError}
          registerOptions={{
            ...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효하지 않은 이메일 포맷이에요 :(',
              },
            }),
          }}
        />
        {errors.email && <ErrorStyle>{errors.email?.message}</ErrorStyle>}

        <Input
          label='비밀번호'
          type='passwordID'
          placeholder='비밀번호를 입력해주세요'
          hasError={hasError}
          registerOptions={{
            ...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              pattern: {
                value: 6,
                message: '비밀번호는 6자 이상이여야해요 :(',
              },
            }),
          }}
        />
        <ErrorStyle>{errors.password?.message}</ErrorStyle> */}
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
        {errors.email && <ErrorStyle>{errors.email?.message}</ErrorStyle>}
        <LabelStyle>비밀번호</LabelStyle>
        <InputStyle
          type='password'
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
        <StyledButton
          type='submit'
          className='btn-signup'
          $bgcolor={abledBtn ? 'active' : 'inactive'}
          disabled={!abledBtn}
        >
          다음
        </StyledButton>
      </FormContainerStyle>
    </SignUpContainerStyle>
  );
};

export default SignUpForm;
