import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/common/Button/Button';

import CharacterImg from '../../img/character-img.svg';
import * as S from './NewPlaylistStyle';

function handleBtnclick() {}

export default function NewPlaylist() {
  return (
    <S.NewPlaylistWrap>
      <S.QuestionBox>
        <p>{`길동`}님!</p>
        <p>오늘은 어떤 플리를 추천해드릴까요?</p>
      </S.QuestionBox>
      <img src={CharacterImg} alt='캐릭터 이미지' />
      <S.Answer
        cacheMeasurements
        placeholder='내용을 입력해주세요.'
        maxRows={8}
        minRows={1}
      />
      <Button text='확인' onClick={handleBtnclick}></Button>
    </S.NewPlaylistWrap>
  );
}
