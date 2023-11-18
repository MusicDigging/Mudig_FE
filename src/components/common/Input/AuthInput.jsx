import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
export const AuthInput = (props) => {
  const { placeholder, type, name, validation, marginBottom } = props;
  const { register } = useFormContext();

  return (
    <>
      <InputStyle
        {...register(name, validation)}
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        marginBottom={marginBottom}
      />
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
`;
