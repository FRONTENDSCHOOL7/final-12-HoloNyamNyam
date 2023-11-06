import React, { useState, useEffect } from 'react';
import Input from '../common/Input/Input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { StyledButton, StyledInputWrap } from './StyledLoginForm';
import { login } from '../../api/login';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [hasError, setHasError] = useState(false);
  const [error, setErrors] = useState({});

  const [loginSuccess, setLoginSuccess] = useState(false);

  const LoginFormSubmit = async (formData) => {
    const loginData = await login(formData);
    try {
      const token = loginData.data.user.token;
      const accountname = loginData.data.user.accountname;
      const _id = loginData.data.user._id;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('_id', _id);
      sessionStorage.setItem('accountname', accountname);

      setLoginSuccess(true);
    } catch (err) {
      if (loginData.data.status === 422) {
        setError('password', {
          message: '*이메일 또는 비밀번호를 확인해주세요. ',
        });
      }
      setHasError(true);
      setLoginSuccess(false);
    }
  };

  const handleFieldChange = () => {
    setErrors({});
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      navigate('/home');
    }
  }, [loginSuccess, navigate]);

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        setHasError(false);
        LoginFormSubmit(formData);
      })}
    >
      <StyledInputWrap>
        <Input
          label='이메일'
          id='email'
          type='email'
          onChange={handleFieldChange}
          placeholder='id@example.com'
          hasError={hasError}
          registerOptions={{
            ...register('email', {
              required: '*이메일은 필수 입력 값이에요.',
              pattern: {
                // eslint-disable-next-line
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: '*올바른 이메일을 입력해 주세요.',
              },
            }),
            errors,
          }}
        />
      </StyledInputWrap>
      <StyledInputWrap>
        <Input
          label='비밀번호'
          id='password'
          type='password'
          onChange={handleFieldChange}
          placeholder='비밀번호를 입력해 주세요.'
          hasError={hasError}
          registerOptions={{
            ...register('password', {
              required: '*비밀번호는 필수 입력 값이에요.',
              minLength: {
                value: 6,
                message: '*비밀번호는 최소 6자 이상 입력해야 해요.',
              },
            }),
            errors: errors.password ? { password: errors.password } : error,
          }}
        />
      </StyledInputWrap>

      <StyledButton type='submit' $bgcolor={isValid ? 'active' : 'inactive'}>
        로그인을 위해 눌러주세요
      </StyledButton>
    </form>
  );
}
