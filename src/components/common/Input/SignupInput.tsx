import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import hideEye from '../../../img/hidePw-icon.svg';
import showEye from '../../../img/showPw-Icon.svg';
import { IInputProps } from '../../../types/input';
export const SignupInput = (props: IInputProps) => {
  const {
    placeholder,
    type,
    name,
    validation,
    showPassword,
    toggleShowPassword,
    btnWidth,

    // onValidationSuccess,
  } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // 1. errors 객체 가져오기
  const error = errors[name];

  return (
    <>
      <Label htmlFor={name}></Label>
      <InputBox>
        <InputStyle
          {...register(name, validation)}
          placeholder={placeholder}
          type={showPassword ? 'text' : type}
          autoComplete='off'
          id={name}
          name={name}
          style={{
            width: btnWidth || '100%',
          }}
        />

        <EyeIcon onClick={toggleShowPassword}>
          {type === 'password' && name !== 'confirmPassword' && (
            <EyeImg
              src={showPassword ? showEye : hideEye}
              alt={showPassword ? '비밀번호 표시' : '비밀번호 숨기기'}
            />
          )}
        </EyeIcon>
      </InputBox>
      <ErrorMsg>{error && error?.message?.toString()}</ErrorMsg>
    </>
  );
};

const Label = styled.label``;
const InputBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const InputStyle = styled.input`
  /* flex: 1; */
  height: 44px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding-left: 16px;
  position: relative;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 32%;
  left: 91%;
`;

const EyeImg = styled.img`
  width: 18px;
  height: 18px;
`;

const ErrorMsg = styled.span`
  color: var(--error-color);
  font-size: 12px;
  text-align: left;
  display: block;
  line-height: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
