import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import hideEye from '../../../img/hidePw-icon.svg';
import showEye from '../../../img/showPw-Icon.svg';
export const SignupInput = (props) => {
  const {
    placeholder,
    type,
    name,
    validation,
    showPassword,
    toggleShowPassword,
    btnWidth,
    marginBottom,
    showTimeText,
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
          id={name}
          name={name}
          marginBottom={marginBottom}
          style={{
            width: btnWidth || '328px',
          }}
        />
        {showTimeText && <TimeText>05:00</TimeText>}

        <EyeIcon onClick={toggleShowPassword}>
          {type === 'password' && name !== 'confirmPassword' && (
            <img
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
  position: relative;
  display: flex;
  align-items: center;
`;

const InputStyle = styled.input`
  flex: 1;
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding-left: 16px;
  position: relative;
`;

const TimeText = styled.span`
  color: var(--error-color);
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 32%;
  left: 91%;
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
