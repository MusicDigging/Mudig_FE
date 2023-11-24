import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import hideEye from '../../../img/hidePw-icon.svg';
import showEye from '../../../img/showPw-Icon.svg';
export const AuthInput = (props) => {
  const {
    placeholder,
    type,
    name,
    validation,
    showPassword,
    toggleShowPassword,
    marginBottom,
  } = props;
  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor={name}></Label>
      <InputStyle
        {...register(name, validation)}
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        id={name}
        name={name}
        autoComplete={name === 'email' ? 'email' : 'current-password'}
        marginBottom={marginBottom}
      />
      {type === 'password' && (
        <EyeIcon onClick={toggleShowPassword}>
          <img
            src={showPassword ? showEye : hideEye}
            alt={showPassword ? '비밀번호 표시' : '비밀번호 숨기기'}
          />
        </EyeIcon>
      )}
    </>
  );
};

const InputStyle = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding-left: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? '8px' : '0')};
`;
const Label = styled.label``;

const EyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 65px;
  right: 19px;
`;
