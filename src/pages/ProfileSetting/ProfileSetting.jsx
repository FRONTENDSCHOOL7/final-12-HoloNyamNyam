import React from 'react';
import ProfileSettingForm from '../../components/ProfileSetting/ProfileSettingForm';
import {
  StyledFormTitle,
  StyledSubText,
  StyledProfileWrap,
} from '../../components/ProfileSetting/ProfileSettingStyle';

export default function ProfileSetting() {
  return (
    <StyledProfileWrap>
      <div>
        <StyledFormTitle>
          입력한 개인정보가 맞다면
          <br />
          아래의 확인버튼을 눌러주세요.
        </StyledFormTitle>
        <StyledSubText>언제라도 변경할 수 있습니다 :)</StyledSubText>
      </div>
      <ProfileSettingForm />
    </StyledProfileWrap>
  );
}
