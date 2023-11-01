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
import userProfile from '../../images/basic-profile-img.svg';

export default function ChatListItem() {
  const chatListData = [
    {
      id: 1,
      profileImg: userProfile,
      username: '혼밥러',
      chatContent: '혼밥하기 좋은 곳을 찾았어요!',
      date: '2023.10.28',
    },
    {
      id: 2,
      profileImg: userProfile,
      username: '밥먹언',
      chatContent: '혼자 밥 먹는걸 좋아해요',
      date: '2023.10.30',
    },
    {
      id: 3,
      profileImg: userProfile,
      username: '맘마미아',
      chatContent: '식당 추천해 주세요!',
      date: '2023.11.3',
    },
  ];
  const navigate = useNavigate();
  function handleClick() {
    navigate('/chatroom/example');
  }
  return (
    <ChatWrapper>
      {chatListData.map((chatItem) => (
        <List key={chatItem.id} onClick={handleClick}>
          <ProfileImg src={chatItem.profileImg} alt='프로필 이미지' />
          <ProfileDot />
          <TextWrap>
            <UserName>{chatItem.username}</UserName>
            <ChatContent>{chatItem.chatContent}</ChatContent>
          </TextWrap>
          <Date>{chatItem.date}</Date>
        </List>
      ))}
    </ChatWrapper>
  );
}
