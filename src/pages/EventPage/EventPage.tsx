import React, { useState } from 'react';
import * as S from './EventPageStyle';
import { useNavigate } from 'react-router-dom';
import { privateInstance } from '../../library/apis/axiosInstance';
import Loading from '../../components/Loading/Loading';

export default function EventPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/main');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 100) {
      setInputValue(newValue);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await privateInstance.post('/playlist/event/', {
        situations: inputValue,
      });

      if (response.status === 200) {
        setResponseData(response.data); // 데이터 저장
        navigate('/playlist/summary', {
          state: { playlist: response.data.playlist.id },
        }); // PlaylistSummary 페이지로 이동
      }
    } catch (error) {
      console.error('전송 실패', error);
      alert('생성 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
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
