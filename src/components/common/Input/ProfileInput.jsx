import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ChipButton } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
export default function ProfileInput(props) {
  const { btnText, onSubmit, onChipSelect } = props;

  const [nickNameCount, setNickNameCount] = useState(0);
  const [nickNameValid, setNickNameValid] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      about: '',
    },
    mode: 'onBlur',
    // react-hook-form의 reslover란? 저도 처음 사용해 보는 것이라 찾아보니 아래와 같다고 합니다
    // /resolver를 사용하면 비동기적인 검증이 필요한 경우에도 쉽게 처리할 수 있다.
    // resolver 함수 내에서 async/await를 사용하여 비동기 작업을 수행하고, 검증 결과에 따라 폼을 유효하거나 유효하지 않은 상태로 설정할 수 있다.
    resolver: async (data) => {
      const errors = {};
      try {
        //닉네임 값이 없을 시
        if (!data.nickName) {
          errors.nickName = {
            type: 'custom',
            message: '닉네임을 입력해주세요.',
          };
        } else {
          //닉네임 중복검사 post 요청
          const response = await axios.post(
            'https://api.mudig.co.kr/user/checkname/',
            { name: data.nickName },
          );

          if (response.status === 200) setNickNameValid(response.data.message); //중복검사 통과시 성공 메시지
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error;
        errors.nickName = { type: 'custom', message: errorMessage }; //중복검사 실패시 실패 메시지
      }

      return { values: data, errors };
    },
  });

  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipSelect = (newSelectedChips) => {
    setSelectedChips(newSelectedChips);

    //콜백함수로 onChipSelect props (관심사) 값 업데이트
    if (onChipSelect) {
      onChipSelect(newSelectedChips);
    }
  };

  // const selectedChipsString = selectedChips.join(', ');

  const handleNickNameLengthChange = async (event) => {
    let value = event.target.value;
    value = value.slice(0, 8);
    setNickNameCount(value.length);

    setValue('nickName', value, { shouldValidate: true });
  };

  return (
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor='nickName'>닉네임</Label>
      <InputWrap>
        <InputBox>
          <InputStyle
            {...register('nickName', {
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 8,
              },
            })}
            placeholder='8글자 내로 작성해주세요'
            type='text'
            id='nickName'
            onChange={handleNickNameLengthChange}
          />
          <CharacterCount>{`${nickNameCount}/8`}</CharacterCount>
        </InputBox>
        {/* 닉네임 중복이면 중복 에러 메시지 보여주고 아니라면 '사용 가능한 닉네임입니다' 보여주는 삼항연산자 */}
        {errors.nickName ? (
          <ErrorMsg>{errors.nickName.message}</ErrorMsg>
        ) : (
          <ErrorMsg>{nickNameValid}</ErrorMsg>
        )}
      </InputWrap>

      <Label htmlFor='about'>소개글</Label>
      <InputWrap>
        <InputStyle
          {...register('about', { required: false })}
          placeholder='소개글을 작성해주세요'
          type='text'
          id='about'
        />
      </InputWrap>
      <>
        <Chipwrap>
          <Title>관심사</Title>
          <ChipBox>
            {[
              'POP',
              'K-POP',
              'J-POP',
              '힙합',
              'R&B',
              '발라드',
              '댄스',
              '인디',
              'OST',
            ].map((chipName, index) => (
              <ChipButton
                key={index}
                name={chipName}
                onSelect={handleChipSelect}
                selectedChips={selectedChips}
              />
            ))}
          </ChipBox>
        </Chipwrap>
      </>
      <ButtonBox>
        <Button
          text={btnText}
          type='submit'
          disabled={!isValid || selectedChips.length === 0}
        />
      </ButtonBox>
      <DevTool control={control} />
    </FormWrap>
  );
}

const FormWrap = styled.form`
  padding-top: 16px;
  font-size: var(--font-md);

  height: 100%;
`;

const Label = styled.label``;

const InputWrap = styled.div`
  padding: 8px 0 16px 0;
`;

const InputBox = styled.div`
  position: relative;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  display: block;
  padding-top: 8px;
`;

const InputStyle = styled.input`
  width: 328px;
  height: 44px;
  /* margin: 8px 0 16px 0; */
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding-left: 16px;
  position: relative;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 24px;
`;

const CharacterCount = styled.div`
  position: absolute;
  top: 44%;
  right: 12px;
  color: var(--extra-font-color);
  text-align: center;
  transform: translate(0, -50%);
`;

const Chipwrap = styled.div`
  font-weight: var(--font-regular);
  font-size: var(--font-md);
`;

const ChipBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;
