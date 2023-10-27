import React from 'react';
import UserProfile from '../../images/user_profile.png';
import {
  MessageWrap,
  ProfileImg,
  MessageText,
  TimeStamp,
} from './ReceiveMessageStyle';

export default function ReceiveMessage() {
  const messageList = [
    {
      id: 1,
      messageText: '전 홀로 밥 먹는걸 좋아한다구요',
      time: '10:27',
    },
    {
      id: 2,
      messageText: '검색중이에요',
      time: '11:40',
    },
    {
      id: 3,
      messageText: '혼밥하기 좋은 곳을 찾았어요!',
      time: '12:55',
    },
  ];

  return (
    <ul>
      {messageList.map((messageItem) => (
        <MessageWrap key={messageItem.id}>
          <ProfileImg src={UserProfile} alt='사용자 프로필 사진' />
          <MessageText>
            {messageItem.messageText}
            <TimeStamp>{messageItem.time}</TimeStamp>
          </MessageText>
        </MessageWrap>
      ))}
    </ul>
  );
}
