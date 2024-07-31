import React, { useState } from 'react';
import * as S from './EventPageStyle';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import useCreateEvent from '../../hooks/queries/useEvent';

export default function EventPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateEvent({
    onSuccess: (data) => {
      navigate('/playlist/summary', { state: { playlist: data.playlist.id } });
    },
    onError: () => {
      alert('플레이리스트 생성에 실패했습니다.');
    },
  });

  const handleClose = () => {
    navigate('/main');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 100) {
      setInputValue(newValue);
    }
  };

  const handleSubmit = () => {
    mutate(inputValue);
  };

  return (
    <S.EventPageWrap>
      {isLoading && <Loading isLoading={isLoading} />}
      <S.CloseButton onClick={handleClose} />
      <S.QuestionBox>
        <h1>당신의 하루는 어떠셨나요?</h1>
        <input
          id='answer'
          placeholder='답변 입력하기'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
        />
        <div id='textValue'>{inputValue.length}/100</div>
        <S.NotTodayBox>
          <input type='checkbox' id='inputCheckbox' />
          <p>오늘하루 보지 않기</p>
        </S.NotTodayBox>
        <S.SubmitButton
          onClick={handleSubmit}
          disabled={inputValue.trim().length === 0}
        >
          생성
        </S.SubmitButton>
      </S.QuestionBox>
    </S.EventPageWrap>
  );
}
