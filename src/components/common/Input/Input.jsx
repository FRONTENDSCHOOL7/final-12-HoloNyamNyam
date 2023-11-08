import React from 'react';
import { StyledLabel, StyledInput, StyledError } from './StyledInput';

const Input = ({
  label,
  padding,
  id,
  type,
  placeholder,
  hasError,
  onSubmit,
  onChange,
  registerOptions,
  value,
}) => {
  const {
    onChange: registerOnChange,
    errors,
    ...restRegisterOptions
  } = registerOptions;

  const handleChange = (event) => {
    registerOnChange(event);
    onChange();
  };

  return (
    <>
      <StyledLabel padding={padding}>{label}</StyledLabel>
      <StyledInput
        autoFocus={id === 'email'}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete='off'
        onSubmit={onSubmit}
        $hasError={hasError}
        {...restRegisterOptions}
        value={value}
      />
      {errors[id] && <StyledError>{errors[id].message}</StyledError>}
    </>
  );
};

export default Input;
