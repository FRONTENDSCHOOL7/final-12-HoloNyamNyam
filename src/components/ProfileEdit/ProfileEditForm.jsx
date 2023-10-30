import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UserIdValid } from '../../api/signUp';
import { imgUpload } from '../../api/imgUpload';
import { BASE_URL } from '../../api/baseUrl';
import { profileEdit } from '../../api/profile';
import DefaultProfileInput from '../../images/basic-profile-img.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header/Header';
//import Input from '../../components/common/Input/Input';
import {
  StyledProfileWrap,
  ImageFormContainer,
  ProfileFormContainer,
  InputImage,
  StyledError,
  StyledLabel,
  StyledInput,
  ProfileInputImgButton,
  StyledProfileImg,
  StyledSaveButton
} from './ProfileEditFormStyle';

const ProfileEditForm = ({ userInfo, setUserInfo }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const token = localStorage.getItem("token");
  const [profileImg, setProfileImg] = useState(null);
  const [abledBtn, setAbledBtn] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (location.pathname === '/myprofile/edit') {
      setValue("image", userInfo?.image || DefaultProfileInput);
      setValue("username", userInfo?.username || null);
      setValue("accountname", userInfo?.accountname || null);
      setValue("intro", userInfo?.intro || null);
    }
  }, [location.pathname, userInfo]);

  const checkUserIdValid = async (accountname) => {
    try {
      const res = await UserIdValid(accountname);
      const reqMsg = res.data.message;
      clearErrors('accountname');
      if (reqMsg === '이미 가입된 계정ID 입니다.') {
        setError('accountname', {
          type: 'manual',
          message: '*이미 사용 중인 ID예요 :(',
        });
        return false;
      } else {
        clearErrors('userid');
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
      const imgUrl = `${BASE_URL}/` + res.data.filename;
      setProfileImg(imgUrl);
    });
  };

  const handleSubmitData = async (formData) => {
    try {
      const isValidUserId = await checkUserIdValid(formData.accountname);
      if (isValidUserId) {
        setProfileImg(userInfo?.image || DefaultProfileInput);
        const image = profileImg || userInfo?.image;
        const res = await profileEdit(formData, image, token);
        localStorage.setItem("_id", res.data.user._id);
        localStorage.setItem("accountname", formData.accountname);
        navigate("/myprofile");
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

  return (
    <StyledProfileWrap>
      <Header 
      type='editprofile'
      handleUpdateProfileBtn={isValid}
      uploadHandler={handleSubmit(handleSubmitData)}
       />
      <ProfileFormContainer>
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
            type='button'
            onClick={() => inputRef.current.click()}
          >
            <StyledProfileImg
              src={profileImg || userInfo?.image || DefaultProfileInput}
              alt='기본 프로필'
            />
          </ProfileInputImgButton>
        </ImageFormContainer>
        <StyledLabel>사용자 이름</StyledLabel>
        <StyledInput
          id='username'
          type='text'
          autoComplete='off'
          defaultValue={userInfo?.username || ""}
          {...register('username', {
            required: '계정이름은 필수 입력입니다',
            minLength: {
              value: 2,
              message: '사용자 이름은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 10,
              message: '사용자 이름은 최대 10자까지 허용됩니다.',
            },
          })}
          placeholder='2~10자 이내로 작성 부탁드릴게요.'
        />
        {errors.username && (
          <StyledError>{errors.username?.message}</StyledError>
        )}
        <StyledLabel>계정 ID</StyledLabel>
        <StyledInput
          id='accountname'
          type='text'
          autoComplete='off'
          defaultValue={userInfo?.accountname || ""}
          {...register('accountname', {
            required: '계정ID는 필수 입력입니다',
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있답니다  :(',
            },
          })}
          placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능해요.'
        />
        {errors.userid && <StyledError>{errors.userid?.message}</StyledError>}
        <StyledLabel>소개</StyledLabel>
        <StyledInput
          id='intro'
          type='text'
          defaultValue={userInfo?.intro || ""}
          autoComplete='off'
          {...register('intro', {
            required: '간단한 소개 부탁드릴게요!',
          })}
          placeholder='자신을 나타낼 수 있는 소개 부탁드릴게요.'
        />
        {errors.userintro && (
          <StyledError>{errors.intro?.message}</StyledError>
        )}
{/*         <StyledSaveButton
          className='btn-profile-edit'
          $bgcolor={abledBtn ? 'active' : 'inactive'}
          disabled={!abledBtn}
        >
          저장
        </StyledSaveButton> */}

        {/*   <Input
          label='사용자 이름'
          id='username'
          type='text'
          placeholder='2~10자 이내로 작성 부탁드릴게요.'
          onChange={handleFieldChange}
          hasError={hasError}
          registerOptions={{
            ...register('username', {
              requried: '사용자 이름은 필수입니다',
            }),
          }}
        />
        <ErrorStyle>{errors.userName?.message}</ErrorStyle>
        <Input
          label='계정 ID'
          id='user-id'
          type='text'
          placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능해요.'
          hasError='true'
        />
        <ErrorStyle>{errors.userID?.message}</ErrorStyle>
        <Input
          label='소개'
          id='user-desc'
          type='text'
          placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
          h */}
      </ProfileFormContainer>
    </StyledProfileWrap>
  );
};

export default ProfileEditForm;
