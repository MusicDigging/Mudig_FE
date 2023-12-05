import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Chip from '../Chip';
export default function ProfileInput(props) {
  const { btnText } = props;
  const [nickNameCount, setNickNameCount] = useState(0);

  //React-Hook-Form 사용법
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('폼 제출', data);
  };

  const handleNickNameLengthChange = (event) => {
    let value = event.target.value;

    value = value.slice(0, 8);

    setNickNameCount(value.length);

    setValue('nickName', value, { shouldValidate: true });
  };

  return (
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor='nickName'>닉네임</Label>
      <InputBox>
        <InputStyle
          {...register('nickName', {
            required: true,

            maxLength: {
              value: 8,
              message: '닉네임은 8글자 이내로 작성해주세요',
            },
          })}
          onChange={handleNickNameLengthChange}
          placeholder='8글자 내로 작성해주세요'
          type='text'
          id='nickName'
        />
        <CharacterCount>{`${nickNameCount}/8`}</CharacterCount>
      </InputBox>

      <Label htmlFor='intro'>소개글</Label>
      <InputStyle
        {...register('intro')}
        placeholder='소개글을 작성해주세요'
        type='text'
        id='intro'
      />
      <Chip />
      <ButtonBox>
        <Button text={btnText} type='submit' disabled={!isValid}></Button>
      </ButtonBox>
      <DevTool control={control} />
    </FormWrap>
  );
}

const FormWrap = styled.form`
  position: relative;
  padding: 0 16px;
  font-size: var(--font-md);
  height: 100%;
`;

const Label = styled.label``;

const InputBox = styled.div`
  position: relative;
`;

const InputStyle = styled.input`
  width: 328px;
  height: 44px;
  margin: 8px 0 16px 0;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding-left: 16px;
  position: relative;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 0;
`;

const CharacterCount = styled.div`
  position: absolute;
  top: 44%;
  right: 12px;
  color: var(--extra-font-color);
  text-align: center;
  transform: translate(0, -50%);
`;
