import styled from 'styled-components';

const InfoTopWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  position: absolute;
  top: 110px;
  margin-left: 25px;
`;

const CntWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  /* margin: 0 40px; */
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  object-fit: cover;
  background-color: #fff;
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
  margin-top: 10px;
`;

const InfoBottomSection = styled.section`
  margin: 70px 33px 23px 33px;
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

const GradientBg = styled.div`
  background: linear-gradient(-45deg, #ff3945 0%, #ff9052 100%);
  position: relative;
  width: 100%;
  height: 170px;
`;

const CtnTap = styled.div`
  cursor: pointer;
  background-color: #fff;
  width: 60px;
  height: 40px;
  border-radius: 10px;
  padding: 10px 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
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
  GradientBg,
  CtnTap,
};
