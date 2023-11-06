import React from 'react';
import styled from 'styled-components';
import buttonLogo from '../../../images/button-logo.svg';

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
    props.$bgcolor === 'active'
      ? '#FF644B'
      : props.$bgcolor === 'inactive'
      ? '#FFAD9F'
      : '#fffff'};
  border: ${(props) =>
    props.$border === 'active' ? '1px solid #DBDBDB' : null};
  color: ${(props) => (props.color === 'active' ? '#767676' : '#ffffff')};
  ${(props) =>
    props.logo === true
      ? `
        position: relative;
        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          width: 20px;
          height: 20px;
          background: no-repeat center / 18px 19px url(${buttonLogo});
          top: 50%;
          left: 10%;
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
  $bgcolor,
  color,
  $border,
  disabled,
  onClick,
  logo,
}) {
  return (
    <ButtonStyle
      type={type ? 'button' : 'submit'}
      size={size}
      width={width}
      $bgcolor={$bgcolor}
      color={color}
      $border={$border}
      disabled={disabled}
      onClick={onClick}
      logo={logo}
    >
      {content}
      {/* <ButtonContent logo={logo}>{content}</ButtonContent> */}
    </ButtonStyle>
  );
}
