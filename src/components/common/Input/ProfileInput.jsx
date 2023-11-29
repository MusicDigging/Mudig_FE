import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Chip from '../Chip';
export default function ProfileInput() {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrap>
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
          <ButtonBox>
            <Button text='다음' type='submit' disabled={!isValid}></Button>
          </ButtonBox>
        </InputBox>

        <Label htmlFor='intro'>소개글</Label>
        <InputStyle
          {...register('intro')}
          placeholder='소개글을 작성해주세요'
          type='text'
          id='intro'
        />
        <Chip />

        <DevTool control={control} />
      </InputWrap>
    </form>
  );
}

const InputWrap = styled.div`
  padding: 16px;
  font-size: var(--font-md);
  height: 100%;
  position: absolute;
  top: 308px;
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
  top: 397px;
`;

const CharacterCount = styled.div`
  position: absolute;
  top: 48%;
  right: 12px;
  color: var(--extra-font-color);
  text-align: center;
  transform: translate(0, -50%);
`;
