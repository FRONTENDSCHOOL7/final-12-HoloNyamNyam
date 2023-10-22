import React from 'react';
import { StyledButton } from './StyledButton';
import { useState } from 'react';

export default function SignUpForm() {
  const [abledBtn, setAbledBtn] = useState(true);
  const clickedToggle = () => {
    setAbledBtn((prev) => {
      return !prev;
    });
  };

  return (
    <StyledButton
      type='submit'
      className='btn-login'
      bgColor={abledBtn ? 'active' : 'inactive'}
      // disabled={!abledBtn}
      onClick={clickedToggle}
    >
      계속하기
    </StyledButton>
  );
}
