import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
export default function ProfileInput() {
  const [nickNameCount, setNickNameCount] = useState(0);

  //React-Hook-Form 사용법
  const {
    register, // register - HTML의 form 요소인 input과 button 등을 연결 시켜주는 함수
    setValue, //setValue - input 필드위에 입력되는 value를 동적으로 설정할 수 있는 함수
    handleSubmit, // 입력한 폼을 제출하는 함수 단 사용자가 작성한 함수를 인자로 넣어줘야  합니다.
    control,
    formState: { isValid }, //isValid, errors 등 유효성 검사에 필요한 도구들을 담은 객체
  } = useForm({
    mode: 'onChange', // mode- 유효성검사를 언제 진행할것인지 설정할 수 있음 onChange, onBlur, onSubmit이 있으며 따로 설정하지 않을시 기본설정은 onSubmit으로 적용
  });

  //사용자가 작성한 함수
  const onSubmit = (data) => {
    console.log('폼 제출', data);
  };

  //닉네임 글자수 감지 함수
  const handleNickNameLengthChange = (event) => {
    let value = event.target.value;

    //8글자 이상 입력 방지 슬라이싱
    value = value.slice(0, 8);

    setNickNameCount(value.length);

    //8글자로 슬라이싱한 value를 register:nickNamed을 가진 input의 setValue로 업데이트
    setValue('nickName', value, { shouldValidate: true });
  };

  return (
    //handleSubmit안에 위애서 제가 작성한 onSubmit 함수 감싸서 전달
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrap>
        <Label htmlFor='nickName'>닉네임</Label>
        <InputBox>
          <InputStyle
            {...register('nickName', {
              required: true, //꼭 입력값을 받아야 되는지를 설정하는 유효성 검사, 소개글은 작성 안해도 되지만 닉네임은 입력값이 필요함으로 required true로 설정
              //required: '닉네임 작성은 필수입니다!' 식의 문자열 메시지도 가능 - 꼭 true일 필요 없음
              maxLength: {
                value: 8, //최대 글자수
                message: '닉네임은 8글자 이내로 작성해주세요', //최대 글자수 초과시 에러 메시지 출력, (단 현재 입력폼에는 에러메시지를 따로 설정해 두진 않았습니다.)
              }, // React-hook-form에서 자체로 제공하는 글자수 유효성 검사 함수 , 똑같이 MinLength도 설정 가능
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
        <Button text='다음' type='submit' disabled={!isValid}></Button>
        <DevTool control={control} />
      </InputWrap>
    </form>
  );
}

const InputWrap = styled.div`
  padding: 16px;
  font-size: var(--font-md);
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

const CharacterCount = styled.div`
  position: absolute;
  top: 48%;
  right: 12px;
  color: var(--extra-font-color);
  text-align: center;
  transform: translate(0, -50%);
`;
