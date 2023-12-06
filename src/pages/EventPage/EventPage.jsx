import React from 'react';
import styled from 'styled-components';
import * as S from './EventPageStyle';

export default function EventPage() {
  // 닫기 버튼은 홈으로 이동
  // 생성 버튼은 플리 생성 로딩에서 플리 생성 결과로 이동
  return (
    <S.EventPageWrap>
      <S.CloseButton />
      <S.QuestionBox>
        <p>당신의 하루는 어떠셨나요?</p>
        <input placeholder='답변 입력하기' type='text'></input>
        <S.SubmitButton>생성</S.SubmitButton>
      </S.QuestionBox>
    </S.EventPageWrap>
  );
}
