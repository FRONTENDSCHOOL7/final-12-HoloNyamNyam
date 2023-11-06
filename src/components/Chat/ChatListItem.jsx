/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatWrapper,
  List,
  ProfileImg,
  ProfileDot,
  TextWrap,
  UserName,
  ChatContent,
  Date,
} from './ChatListItemStyle';
import holoDori from '../../images/chatMembers/holo_dori.jpg';
import holoDoggo from '../../images/chatMembers/holo_doggo.jpg';
import holoDev from '../../images/chatMembers/holo_dev.png';
import { chatState } from '../../recoil/chatAtom';
import { useRecoilState } from 'recoil';

export default function ChatListItem() {
  const chatListData = [
    {
      id: 1,
      profileImg: holoDori,
      userId: 'holo_dori',
      username: '꿈돌이',
      chatContent: [
        '안녕하세요!',
        '혼자 조용히 식사할 수 있는 곳을 찾는다고 하셨죠?',
        '딱 좋은 곳을 찾았어요!',
      ],
      time: '15:57',
      date: '2023.11.3',
      preview: '딱 좋은 곳을 찾았어요!',
      dot: true,
    },
    {
      id: 2,
      profileImg: holoDoggo,
      userId: 'holo_doggo',
      username: '홀로멍멍',
      chatContent: ['혼술도 좋지만', '혼자 밥 먹는것 만큼 좋은게 없어요'],
      time: '11:32',
      date: '2023.10.30',
      preview: '혼자 밥 먹는것 만큼 좋은게 없어요',
      dot: true,
    },
    {
      id: 3,
      profileImg: holoDev,
      userId: 'holo_dev',
      username: '개발자',
      chatContent: ['배고파 죽겠어요', '식당 추천해 주세요!'],
      time: '18:14',
      date: '2023.10.28',
      reply: true,
      preview: '돈까스 맛집 알려드릴게요',
      dot: false,
    },
  ];
  const [, setChat] = useRecoilState(chatState);
  const navigate = useNavigate();

  return (
    <ChatWrapper>
      {chatListData.map((chatItem) => (
        <List
          key={chatItem.id}
          onClick={() => {
            navigate(`/chatroom/${chatItem.userId}`);
            setChat({
              id: chatItem.userId,
              name: chatItem.username,
              image: chatItem.profileImg,
              text: chatItem.chatContent,
              time: chatItem.time,
              date: chatItem.date,
              reply: chatItem.reply,
              preview: chatItem.preview,
            });
          }}
        >
          <ProfileImg src={chatItem.profileImg} alt='프로필 이미지' />
          {chatItem.dot && <ProfileDot />}
          <TextWrap>
            <UserName>{chatItem.username}</UserName>
            <ChatContent>{chatItem.preview}</ChatContent>
          </TextWrap>
          <Date>{chatItem.date}</Date>
        </List>
      ))}
    </ChatWrapper>
  );
}
