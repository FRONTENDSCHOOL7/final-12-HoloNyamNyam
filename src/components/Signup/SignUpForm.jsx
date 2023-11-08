/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Input from '../../components/common/Input/Input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailValid } from '../../api/signUp';
import { useSetRecoilState } from 'recoil';
import { signUpState } from '../../recoil/signUpAtom';
import {
  StyledSignUpWrap,
  StyledInputWrap,
  StyledTitle,
  StyledButton,
} from './StyledSignUp';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [error, setErrors] = useState({});
  const setSignUp = useSetRecoilState(signUpState);

  const checkEmailValid = async (email) => {
    try {
      const res = await EmailValid(email);
      const reqMsg = res.data.message;
      clearErrors('email');
      if (reqMsg === '이미 가입된 이메일 주소 입니다.') {
        setError('email', {
          message: '*이미 사용 중인 이메일 주소예요. ',
        });
        setHasError(true);
        return false;
      } else {
        setHasError(false);
        clearErrors('email');
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSubmitData = async (data) => {
    try {
      const isValidEmail = await checkEmailValid(data.email);
      if (isValidEmail) {
        navigate('./profile', {
          state: {
            email: data.email,
            password: data.password,
          },
        });
      }
      setSignUp({
        oneCheck: true,
        twoCheck: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = () => {
    setErrors({});
  };

  return (
    <StyledSignUpWrap>
      <StyledTitle>회원가입을 도와드릴게요!</StyledTitle>
      <form
        onSubmit={handleSubmit((data) => {
          setHasError(false);
          handleSubmitData(data);
        })}
      >
        <StyledInputWrap>
          <Input
            label='이메일'
            id='email'
            type='email'
            placeholder='id@example.com'
            onChange={handleFieldChange}
            hasError={hasError}
            registerOptions={{
              ...register('email', {
                required: '*이메일은 필수 입력 값이에요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '*유효하지 않은 이메일 포맷이에요.',
                },
              }),
              errors: errors.email ? { email: errors.email } : error,
            }}
          />
        </StyledInputWrap>
        <StyledInputWrap>
          <Input
            label='비밀번호'
            id='password'
            type='password'
            placeholder='6자 이상, 문자/숫자/기호사용 가능해요.'
            onChange={handleFieldChange}
            hasError={hasError}
            registerOptions={{
              ...register('password', {
                required: '*비밀번호는 필수 입력 값이에요.',
                minLength: {
                  value: 6,
                  message: '*비밀번호는 최소 6자 이상 입력해야 해요.',
                },
              }),
              errors,
            }}
          />
        </StyledInputWrap>
        <StyledButton
          type='submit'
          $bgcolor={isValid ? 'active' : 'inactive'}
          disabled={!isValid}
        >
          계속하기
        </StyledButton>
      </form>
    </StyledSignUpWrap>
  );
};

export default SignUpForm;
