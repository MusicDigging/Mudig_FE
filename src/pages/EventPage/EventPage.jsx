import React, { useState } from 'react';
import * as S from './EventPageStyle';
import { useNavigate } from 'react-router-dom';
import { privateInstance } from '../../library/apis/axiosInstance';

export default function EventPage() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 100) {
      // 100자 이내의 입력만 허용
      setInputValue(newValue);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await privateInstance.post('/playlist/event/', {
        situations: inputValue,
      });

      console.log('response.data:', response.data);

      if (response.status === 200) {
        const { message } = response.data;
        console.log(message);
        navigate('/');
      }
    } catch (error) {
      console.error('전송 실패', error);
    }
  };

  return (
    <S.EventPageWrap>
      <S.CloseButton onClick={handleClose} />
      <S.QuestionBox>
        <p>당신의 하루는 어떠셨나요?</p>
        <input
          id='answer'
          placeholder='답변 입력하기'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <div>{inputValue.length}/100</div>
        <S.SubmitButton onClick={handleSubmit}>생성</S.SubmitButton>
      </S.QuestionBox>
    </S.EventPageWrap>
  );
}
