import styled from 'styled-components';

export const MessageWrap = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 9px;
  align-items: flex-start;
`;

export const MessageText = styled.article`
  max-width: 240px;
  padding: 12px;
  border-radius: 10px 0 10px 10px;
  background-color: #ff644b;
  color: white;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  margin: 0 0 0 auto;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const TimeStamp = styled.span`
  font-size: 10px;
  color: #767676;
  position: absolute;
  bottom: 0px;
  left: -35px;
`;

export default function SendMessage() {
  return (
    <MessageWrap>
      <MessageText>
        돈까스 맛집 알려드릴게요
        <TimeStamp>13:58</TimeStamp>
      </MessageText>
    </MessageWrap>
  );
}
