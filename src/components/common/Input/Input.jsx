import React from 'react';
import { StyledLabel, StyledInput } from './StyledInput';

const Input = ({ label, id, type, placeholder, onSubmit, hasError }) => {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        onSubmit={onSubmit}
        hasError={hasError}
      />
    </>
  );
};

export default Input;
