import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/common/Button/Button';

export default function CommentForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('댓글 제출', data);
  };

  return (
    <CommentFormWrap onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='comment' className='a11y-hidden'>
        댓글 입력하기
      </label>
      <InputStyle
        {...register('intro')}
        type='text'
        id='comment'
        placeholder='내용을 입력해 주세요.'
      ></InputStyle>
      <Button text='확인' type='submit' />
    </CommentFormWrap>
  );
}

const CommentFormWrap = styled.form`
  background-color: white;
  padding: 16px 16px 24px;
  display: flex;
  width: 100%;
  gap: 8px;
  position: absolute;
  bottom: 0px;

  button {
    max-width: 56px;
  }
`;

const InputStyle = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 8px;
  font-size: var(--font-md);
  background-color: var(--input-background-color);
`;
