/* eslint-disable no-unused-vars */
import React from 'react';
import {
  MessageWrap,
  ProfileImg,
  MessageText,
  TimeStamp,
} from './ReceiveMessageStyle';
import { useRecoilState } from 'recoil';
import { chatState } from '../../recoil/chatAtom';

export default function ReceiveMessage() {
  const [chat, setChat] = useRecoilState(chatState);

  return (
    <ul>
      {chat.text.map((v, i) => (
        <MessageWrap key={i}>
          <ProfileImg src={chat.image} alt='사용자 프로필 사진' />
          <MessageText>
            {chat.text[i]}
            <TimeStamp>{chat.time}</TimeStamp>
          </MessageText>
        </MessageWrap>
      ))}
    </ul>
  );
}
