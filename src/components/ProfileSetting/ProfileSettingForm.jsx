import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UserIdValid, signup } from '../../api/signUp';
import { imgUpload } from '../../api/imgUpload';
import { BASE_URL } from '../../api/baseUrl';
import DefaultProfileInput from '../../images/basic-profile-img.svg';
import { useLocation, useNavigate } from 'react-router-dom';
//import Input from '../../components/common/Input/Input';
import {
  ProfileContainerStyle,
  TextWrapper,
  FormTitleStyle,
  StyledButton,
  SubTitleStyle,
  ImageFormContainer,
  ProfileFormContainer,
  InputImage,
  ErrorStyle,
  LabelStyle,
  InputStyle,
  ProfileImg,
  ProfileInputImgButton,
} from './ProfileSettingStyle';

//테스트용 유저ID = fz_stitch

const ProfileSettingForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValue: {
      username: null,
      userid: null,
      userintro: null,
    },
  });

  const [profileImg, setProfileImg] = useState(null);
  const [abledBtn, setAbledBtn] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (location.pathname === '/signup/profile') {
      setValue('image', DefaultProfileInput);
      setValue('username', null);
      setValue('userid', null);
      setValue('userintro', null);
    }
  }, [location.pathname]);

  const checkUserIdValid = async (userid) => {
    try {
      const res = await UserIdValid(userid);
      const reqMsg = res.data.message;
      clearErrors('userid');
      if (reqMsg === '이미 가입된 계정ID 입니다.') {
        setError('userid', {
          type: 'manual',
          message: '*이미 사용 중인 ID예요 :(',
        });
        return false;
      } else {
        clearErrors('userid');
        return true;
      }
    } catch (errors) {
      console.log(errors);
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
      const isValidUserId = await checkUserIdValid(formData.userid);
      if (isValidUserId) {
        await signup(formData, data, profileImg).then(
          navigate('/signup/signupsuccess', {
            state: {
              userid: formData.userid,
              username: formData.username,
              userintro: formData.userintro,
            },
          }),
        );
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  //isValid와 setAbledBtn에 변화가 있을때만 리렌더링
  useEffect(() => {
    setAbledBtn(isValid);
  }, [isValid, setAbledBtn]);

  return (
    <ProfileContainerStyle>
      <TextWrapper>
        <FormTitleStyle>
          입력한 개인정보가 맞다면
          <br />
          아래의 확인버튼을 눌러주세요.
        </FormTitleStyle>
        <SubTitleStyle>언제라도 변경할 수 있습니다 :)</SubTitleStyle>
      </TextWrapper>
      <ProfileFormContainer onSubmit={handleSubmit(handleSubmitData)}>
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
            <ProfileImg
              src={profileImg || DefaultProfileInput}
              alt='기본 프로필'
            />
          </ProfileInputImgButton>
        </ImageFormContainer>
        <LabelStyle>사용자 이름</LabelStyle>
        <InputStyle
          id='username'
          type='text'
          autoComplete='off'
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
        {errors.username && <ErrorStyle>{errors.username?.message}</ErrorStyle>}
        <LabelStyle>계정 ID</LabelStyle>
        <InputStyle
          id='userid'
          type='text'
          autoComplete='off'
          {...register('userid', {
            required: '계정ID는 필수 입력입니다',
            pattern: {
              value: /^[0-9a-zA-Z._]+$/,
              message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있답니다  :(',
            },
          })}
          placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능해요.'
        />
        {errors.userid && <ErrorStyle>{errors.userid?.message}</ErrorStyle>}
        <LabelStyle>소개</LabelStyle>
        <InputStyle
          id='userintro'
          type='text'
          autoComplete='off'
          {...register('userintro', {
            required: '간단한 소개 부탁드릴게요!',
          })}
          placeholder='자신을 나타낼 수 있는 소개 부탁드릴게요.'
        />
        {errors.userintro && (
          <ErrorStyle>{errors.userintro?.message}</ErrorStyle>
        )}
        <ErrorStyle>{errors.userDesc?.message}</ErrorStyle>
        <StyledButton
          className='btn-signup'
          $bgcolor={abledBtn ? 'active' : 'inactive'}
          disabled={!abledBtn}
        >
          확인
        </StyledButton>
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
    </ProfileContainerStyle>
  );
};

export default ProfileSettingForm;
