import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../../components/common/Nav/Nav';
import ChatListItem from '../../components/Chat/ChatListItem';
import Header from '../../components/common/Header/Header';

const List = styled.section`
  padding: 48px 0 60px 0;
  background-color: white;
  height: calc(100vh - 108px);
`;
export default function ChatList() {
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

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }

  return (
    <>
      <Header type='chat' name />
      <List>
        <ChatListItem />
      </List>
      <Nav />
    </>
  );
}
