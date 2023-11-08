import React from 'react';
import imageIcon from '../../../images/img-button.png';
import { ChatNavBar, ImageIcon, Input, SendBtn } from './ChatNavStyle';

export default function ChatNav({
  inputValue,
  handleInputChange,
  handleButtonClicked,
}) {
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClicked();
    }
  };
  return (
    <ChatNavBar>
      <ImageIcon
        src={imageIcon}
        alt='사진 선택하기'
        title='이미지 파일 불러오기'
      />
      <Input
        type='text'
        placeholder='메시지 입력하기..'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleEnterPress}
      />
      <SendBtn $hastext={inputValue.toString()} onClick={handleButtonClicked}>
        전송
      </SendBtn>
    </ChatNavBar>
  );
}
