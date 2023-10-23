import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../components/common/Button/Button';

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
      <StyledButton
        type='submit'
        className='btn-login'
        bgColor={abledBtn ? 'active' : 'inactive'}
        // disabled={!abledBtn}
        onClick={clickedToggle}
        // logo={true}
      >
        다음
      </StyledButton>
      <StyledButton
        type='submit'
        className='btn-login'
        // bgColor={abledBtn ? 'active' : 'inactive'}
        color='active'
        border='active'
        // disabled={!abledBtn}
        onClick={clickedToggle}
        logo={true}
      >
        다음
      </StyledButton>
    </>
  );
}
