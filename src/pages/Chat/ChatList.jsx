import React from 'react';
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
  return (
    <>
      <Header type='default' />
      <List>
        <ChatListItem />
      </List>
      <Nav />
    </>
  );
}
