import React, { useState, useEffect } from 'react';
//import { StyledError } from '../../components/common/Input/StyledInput';
import Input from '../../components/common/Input/Input';
import {
  StyledLabel,
  StyledInput,
} from '../../components/common/Input/StyledInput';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailValid } from '../../api/signUp';
import {
  StyledSignUpWrap,
  StyledTitle,
  StyledFormWrap,
  StyledButton,
  StyledError,
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldChange = () => {
    setErrors({});
  };

  return (
    <StyledSignUpWrap>
      <StyledTitle>회원가입을 도와드릴게요!</StyledTitle>
      <StyledFormWrap
        onSubmit={handleSubmit((data) => {
          setHasError(false);
          handleSubmitData(data);
        })}
      >
        <Input
          label='이메일'
          padding='signup'
          id='email'
          type='email'
          placeholder='이메일을 입력해주세요.'
          onChange={handleFieldChange}
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
        {errors.email && (
          <StyledError bottom='email'>{errors.email?.message}</StyledError>
        )}
        <Input
          label='비밀번호'
          padding='signup'
          id='password'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          onChange={handleFieldChange}
          hasError={hasError}
          registerOptions={{
            ...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 6,
                message: '비밀번호는 6자 이상이여야해요 :(',
              },
            }),
          }}
        />
        {errors.password && (
          <StyledError bottom='pw'>{errors.password?.message}</StyledError>
        )}
        <StyledButton
          type='submit'
          className='btn-signup'
          $bgcolor={isValid ? 'active' : 'inactive'}
          disabled={!isValid}
        >
          다음
        </StyledButton>
      </StyledFormWrap>
    </StyledSignUpWrap>
  );
};

export default SignUpForm;
