import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginWrap = styled.section`
  padding-top: 170px;
  margin: auto;
  text-align: center;
  background: #fff;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  color: black;
  padding-bottom: 50px;
  font-weight: 500;
`;

const SignUpLink = styled(Link)`
  color: #767676;
  font-size: 12px;
  display: inline-block;
`;

const SimpleLoginWrap = styled.section`
  margin-top: 158px;
  position: relative;
  &::before {
    content: attr(data-content);
    width: 92px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    text-align: center;
    z-index: 10;
    color: #767676;
    font-size: 12px;
  }

  &::after {
    content: '';
    display: block;
    width: calc(100% - (34px * 2));
    position: absolute;
    top: 7px;
    height: 1px;
    left: 50%;
    background-color: #dbdbdb;
    transform: translateX(-50%);
  }
`;

const SnsButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$color === 'kakao'
      ? '#fae500'
      : props.$color === 'google'
      ? '#F8F8F8'
      : props.$color === 'github'
      ? '#3C4043'
      : props.$color === 'facebook'
      ? '#FEFEFE'
      : null};
`;

const SnsList = styled.ul`
  display: flex;
  padding: 32px 0 50px 0;
  justify-content: center;
  gap: 8px;
`;

export {
  LoginWrap,
  LoginTitle,
  SignUpLink,
  SimpleLoginWrap,
  SnsButton,
  SnsList,
};
