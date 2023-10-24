import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledError,
  StyledInputWrap,
} from './StyledLoginForm';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onSubmit' });

  const [hasError, setHasError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const LoginFormSubmit = () => {
    // setHasError(true);
    setLoginSuccess(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (loginSuccess) {
      navigate('/home');
    }
  }, [loginSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit(LoginFormSubmit)}>
      <StyledInputWrap>
        <StyledLabel>이메일</StyledLabel>
        <StyledInput
          id='email'
          type='email'
          autoComplete='off'
          placeholder='이메일 주소를 입력해 주세요.'
          $haserror={hasError}
          {...register('email', {
            required: ' ',
            pattern: {
              value:
                // eslint-disable-next-line no-useless-escape
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: '올바른 이메일을 입력해 주세요.',
            },
          })}
        />
        {errors.email && <StyledError>{errors.email.message}</StyledError>}
      </StyledInputWrap>
      <StyledInputWrap>
        <StyledLabel>비밀번호</StyledLabel>
        <StyledInput
          id='password'
          type='password'
          autoComplete='off'
          placeholder='비밀번호를 입력해 주세요.'
          $haserror={hasError}
          {...register('password', {
            required: ' ',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상 입력해야 해요.',
            },
          })}
        />
        {errors.password && (
          <StyledError>{errors.password.message}</StyledError>
        )}
      </StyledInputWrap>
      <StyledButton type='submit' $bgcolor={isValid ? 'active' : 'inactive'}>
        로그인을 위해 눌러주세요.
      </StyledButton>
    </form>
  );
}
