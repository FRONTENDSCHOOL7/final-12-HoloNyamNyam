import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { ButtonStyle } from '../../components/common/Button/Button';
import Header from '../../components/common/Header/Header';
import spriteIcon from '../../images/SpriteIcon.svg';

const StyledButton = styled(ButtonStyle)`
  margin: 50px auto 20px;
`;

export default function Home() {
  const [abledBtn, setAbledBtn] = useState(true);
  const clickedToggle = () => {
    setAbledBtn((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <Header type='home' />

      <StyledButton
        type='submit'
        className='btn-login'
        bgcolor={abledBtn ? 'active' : 'inactive'}
        // disabled={!abledBtn}
        onClick={clickedToggle}
      >
        다음
      </StyledButton>

      <StyledButton
        type='submit'
        className='btn-login'
        // bgcolor={abledBtn ? 'active' : 'inactive'}
        color='active'
        border='active'
        // disabled={!abledBtn}
        onClick={clickedToggle}
        logo={true}
      >
        회원가입 할래요
      </StyledButton>

      <Button
        type='button'
        content='업로드'
        size='ms'
        width='ms'
        bgcolor={abledBtn ? 'active' : 'inactive'}
        onClick={clickedToggle}
      />

      <img src={spriteIcon} alt='SpriteIcon' />
    </>
  );
}
