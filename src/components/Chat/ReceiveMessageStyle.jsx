import styled from 'styled-components';

const MessageWrap = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 9px;
  align-items: flex-start;
`;

const ProfileImg = styled.img`
  width: 42px;
  border-radius: 50%;
  background-color: #fff;
`;

const MessageText = styled.article`
  max-width: 240px;
  padding: 12px;
  border-radius: 0 10px 10px 10px;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  background-color: white;
`;

const TimeStamp = styled.span`
  font-size: 10px;
  color: #767676;
  position: absolute;
  bottom: 0px;
  right: -35px;
`;
export { MessageWrap, ProfileImg, MessageText, TimeStamp };
