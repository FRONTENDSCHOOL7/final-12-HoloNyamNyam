import styled from 'styled-components';

const InfoTopWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 78px;
  gap: 37px;
`;

const CntWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 35px;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  /* margin: 0 40px; */
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  object-fit: cover;
`;

const CntSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const CntP = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #767676;
  margin-top: 6px;
`;

const InfoBottomSection = styled.section`
  margin: 23px 33px 23px 33px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const UserId = styled.p`
  font-size: 12px;
  color: #767676;
  margin: 8px 0 8px;
`;

const UserText = styled.p`
  font-size: 14px;
  color: #767676;
`;

export {
  InfoTopWrap,
  ProfileImg,
  CntSpan,
  CntP,
  CntWrap,
  InfoBottomSection,
  UserName,
  UserId,
  UserText,
};
