/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UserIdValid } from '../../api/signUp';
import { imgUpload } from '../../api/imgUpload';
import { BASE_URL } from '../../api/baseUrl';
import { profileEdit } from '../../api/profile';
import DefaultProfileInput from '../../images/basic-profile-img.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header/Header';
import Input from '../../components/common/Input/Input';
import {
  StyledSignUpWrap,
  StyledInputWrap,
  ImageFormContainer,
  InputImage,
  StyledProfileImg,
  ProfileInputImgButton,
} from './StyledProfileEditForm';

const ProfileEditForm = ({ userInfo, setUserInfo }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const [error, setErrors] = useState({});
  const [hasError, setHasError] = useState(false);
  const token = sessionStorage.getItem('token');
  const [profileImg, setProfileImg] = useState(null);

  const [abledBtn, setAbledBtn] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageChanged, setImageChanged] = useState(false);
  const data = location.state;

  useEffect(() => {
    setValue('image', userInfo?.image || DefaultProfileInput);
    setValue('username', userInfo?.username || null);
    setValue('accountname', userInfo?.accountname || null);
    setValue('intro', userInfo?.intro || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const checkUserIdValid = async (newAccount, oldAccount) => {
    if (newAccount === oldAccount) {
      return true;
    }
    try {
      const res = await UserIdValid(newAccount);
      const reqMsg = res.data.message;
      clearErrors('accountname');
      if (reqMsg === '이미 가입된 계정ID 입니다.') {
        setHasError(true);
        return '*이미 사용 중인 ID입니다.';
      } else {
        setHasError(false);
        clearErrors('accountname');
        return true;
      }
    } catch (errors) {
      return false;
    }
  };

  const handleImageChange = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);
    await imgUpload(formData).then((res) => {
      let imgUrl = `${BASE_URL}/` + res.data.filename;
      if (imgUrl === `${BASE_URL}/` + undefined) {
        imgUrl = DefaultProfileInput;
      }
      setProfileImg(imgUrl);
      setImageChanged(true);
    });
  };

  const handleSubmitData = async (formData) => {
    try {
      setProfileImg(userInfo?.image || DefaultProfileInput);
      const image = profileImg || userInfo?.image || DefaultProfileInput;
      const res = await profileEdit(formData, image, token);
      sessionStorage.setItem('_id', res.data.user._id);
      sessionStorage.setItem('accountname', formData.accountname);
      navigate('/myprofile');
    } catch (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    setAbledBtn(isValid || setImageChanged);
  }, [isValid, setAbledBtn]);

  const handleFieldChange = () => {
    setErrors({});
  };

  return (
    <StyledSignUpWrap>
      <Header
        type='editprofile'
        handleUpdateProfileBtn={isValid || isImageChanged}
        uploadHandler={handleSubmit(handleSubmitData)}
      />
      <form
        onSubmit={handleSubmit((formData) => {
          setHasError(false);
          handleSubmitData(formData);
        })}
      >
        <ImageFormContainer>
          <label>
            <InputImage
              id='profileImg'
              type='file'
              accept='image/jpg, image/jpeg, image/png'
              ref={inputRef}
              onChange={handleImageChange}
            />
          </label>
          <ProfileInputImgButton
            title='클릭하면 이미지를 불러올 수 있어요.'
            type='button'
            onClick={() => inputRef.current.click()}
          >
            <StyledProfileImg
              src={profileImg || userInfo?.image || DefaultProfileInput}
              alt='기본 프로필'
            />
          </ProfileInputImgButton>
        </ImageFormContainer>

        <StyledInputWrap>
          <Input
            label='사용자이름'
            id='username'
            type='text'
            placeholder='2~10자 이내로 작성 부탁드릴게요.'
            onChange={handleFieldChange}
            hasError={hasError}
            registerOptions={{
              ...register('username', {
                required: '*계정이름은 필수 입력입니다',
                minLength: {
                  value: 2,
                  message: '*사용자 이름은 최소 2자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 10,
                  message: '*사용자 이름은 최대 10자까지 허용됩니다.',
                },
              }),
              errors: errors.username ? { username: errors.username } : error,
            }}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <Input
            label='계정 ID'
            id='accountname'
            type='text'
            placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능해요.'
            onChange={handleFieldChange}
            hasError={hasError}
            registerOptions={{
              ...register('accountname', {
                required: '*계정ID는 필수 입력입니다',
                pattern: {
                  value: /^[0-9a-zA-Z._]+$/,
                  message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
                },
                validate: {
                  uniqueAccount: async (value) => {
                    const result = await checkUserIdValid(
                      value,
                      userInfo?.accountname,
                    );
                    return result === true || result;
                  },
                },
              }),
              errors: errors.accountname
                ? { accountname: errors.accountname }
                : error,
            }}
          />
        </StyledInputWrap>

        <Input
          label='소개'
          id='intro'
          type='text'
          placeholder='자신을 나타낼 수 있는 소개 부탁드릴게요.'
          onChange={handleFieldChange}
          hasError={hasError}
          registerOptions={{
            ...register('intro', {
              required: '*간단한 소개 부탁드릴게요!',
            }),
            errors: errors.intro ? { intro: errors.intro } : error,
          }}
        />
      </form>
    </StyledSignUpWrap>
  );
};

export default ProfileEditForm;
