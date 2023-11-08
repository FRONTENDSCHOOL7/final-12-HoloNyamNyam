/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header/Header';
import ChatNav from '../../components/common/Nav/ChatNav';
import SendMessage from '../../components/Chat/SendMessage';
import ReceiveMessage from '../../components/Chat/ReceiveMessage';
import { MessageWrap } from '../../components/Chat/SendMessage';
import { MessageText } from '../../components/Chat/SendMessage';
import { TimeStamp } from '../../components/Chat/SendMessage';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/modalAtom';
import { chatState } from '../../recoil/chatAtom';
import { Suspense } from 'react';

const Modal = lazy(() => import('../../components/Modal/Modal/Modal'));

const List = styled.section`
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg, #ffffff 0%, #ffe9e7 30%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 390px;
  height: 100vh;
  padding: 48px 0 70px 0;
`;

export default function ChatRoom() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

  const chat = useRecoilValue(chatState);
  const modal = useRecoilValue(modalState);
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClicked = () => {
    const newChatValue = [...chatValue];
    if (inputValue.trim().length !== 0) {
      newChatValue.push(inputValue);
      setChatValue(newChatValue);
      setInputValue('');
    }
  };

  function formatTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // 0~23 시간을 2자리로 표시
    const minutes = now.getMinutes().toString().padStart(2, '0'); // 0~59 분을 2자리로 표시
    return `${hours}:${minutes}`;
  }

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }

  return (
    <>
      <h1 className='a11y-hidden'>채팅방 페이지</h1>
      <Header type='chat' yourAccountname={chat.id} />

      <List>
        <ReceiveMessage />
        {chat.reply && <SendMessage />}
        {chatValue.map((item, index) => (
          <MessageWrap key={index}>
            <MessageText>
              {chatValue[index]}
              <TimeStamp>{formatTime()}</TimeStamp>
            </MessageText>
          </MessageWrap>
        ))}
      </List>
      {modal.show && (
        <Suspense>
          <Modal type='chat' />
        </Suspense>
      )}
      <ChatNav
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleButtonClicked={handleButtonClicked}
        handleEnterPress={handleButtonClicked}
      />
    </>
  );
}
