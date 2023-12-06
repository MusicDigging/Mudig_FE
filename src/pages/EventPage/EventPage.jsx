import React from 'react';
import * as S from './EventPageStyle';
import { useNavigate } from 'react-router-dom';

export default function EventPage() {
  // 닫기 버튼은 홈으로 이동
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 닫기 버튼 클릭 핸들러
  const handleClose = () => {
    navigate('/');
  };

  // 생성 버튼은 플리 생성 로딩에서 플리 생성 결과로 이동

  return (
    <S.EventPageWrap>
      <S.CloseButton onClick={handleClose} />
      <S.QuestionBox>
        <p>당신의 하루는 어떠셨나요?</p>
        <input placeholder='답변 입력하기' type='text'></input>
        <S.SubmitButton>생성</S.SubmitButton>
      </S.QuestionBox>
    </S.EventPageWrap>
  );
}
