import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import hideEye from '../../../img/hidePw-icon.svg';
import showEye from '../../../img/showPw-Icon.svg';
import { IInputProps, IStyledInputProps } from '../../../types/input';

export const AuthInput = (props: IInputProps) => {
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
        autoComplete='off'
        marginBottom={marginBottom}
      />
      {type === 'password' && (
        <EyeIcon onClick={toggleShowPassword}>
          <EyeImg src={showPassword ? showEye : hideEye} alt='눈 모양 아이콘' />
        </EyeIcon>
      )}
    </>
  );
};

const InputStyle = styled.input<IStyledInputProps>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? '8px' : '0')};
`;

const Label = styled.label``;

const EyeImg = styled.img`
  width: 18px;
  height: 18px;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 65px;
  right: 19px;
`;
