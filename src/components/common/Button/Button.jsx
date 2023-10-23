import React from 'react';
import styled from 'styled-components';
import buttonLogo from '../../../images/button-logo.png';

export const ButtonStyle = styled.button`
  display: block;
  border-radius: 20px;
  width: ${(props) =>
    props.width === 's'
      ? '56px'
      : props.width === 'ms'
      ? '90px'
      : props.width === 'm'
      ? '120px'
      : '322px'};
  padding: ${(props) =>
    props.size === 's'
      ? '7px 0px'
      : props.size === 'ms'
      ? '8px 0px'
      : props.size === 'm'
      ? '9px 0px'
      : '13px 0px'};
  background-color: ${(props) =>
    props.bgColor === 'active'
      ? '#FF644B'
      : props.bgColor === 'inactive'
      ? '#FFAD9F'
      : '#fffff'};
  border: ${(props) =>
    props.border === 'active' ? '1px solid #DBDBDB' : null};
  color: ${(props) => (props.color === 'active' ? '#767676' : '#ffffff')};
`;

export const Content = styled.p`
  ${(props) =>
    props.logo === true
      ? `
        position: relative;
        &::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 60px;
          background: no-repeat center / 18px 19px url(${buttonLogo});
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translate(-50%, -50%);
        }
      `
      : null}
`;

export default function Button({
  type,
  content,
  size,
  width,
  bgColor,
  color,
  border,
  disabled,
  onClick,
  logo,
}) {
  return (
    <ButtonStyle
      type={type ? 'button' : 'submit'}
      size={size}
      width={width}
      bgColor={bgColor}
      color={color}
      border={border}
      disabled={disabled}
      onClick={onClick}
      logo={logo}
    >
      <Content>{content}</Content>
    </ButtonStyle>
  );
}
