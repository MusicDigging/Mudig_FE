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
      <InputStyle
        {...register(name, validation)}
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        id={name}
        name={name}
        marginBottom={marginBottom}
      />
      {type === 'password' && (
        <EyeIcon onClick={toggleShowPassword}>
          <img src={showPassword ? showEye : hideEye} alt='눈 모양 아이콘' />
        </EyeIcon>
      )}
    </>
  );
};

const InputStyle = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding-left: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? '8px' : '0')};
  /* box-shadow: 0 0 10px red inset; */
`;

const EyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 65px;
  right: 19px;
`;