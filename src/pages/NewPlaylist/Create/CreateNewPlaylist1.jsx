import React from 'react';

import CharacterImg from '../../../img/character-img2.svg';
import * as S from './CreateNewPlaylistStyle';

export default function CreateNewPlaylist1() {
  return (
    <S.CreateNewPlaylistWrap>
      <h1 className='a11y-hidden'>플레이리스트 생성하기</h1>
      <S.PageNum>1/3</S.PageNum>
      <S.NewPlaylistBox>
        <S.QuestionBox>
          <p>어떤 분위기의 음악을 원하세요?</p>
          <p>현재 상황이나 기분을 알려주셔도 돼요 :)</p>
        </S.QuestionBox>
        <img src={CharacterImg} alt='캐릭터 이미지' />
        <S.Answer
          cacheMeasurements
          placeholder='내용을 입력해주세요.'
          maxRows={4}
          minRows={1}
        />
        <S.LinkBtn to='/playlist/create2' disabled={false}>
          다음
        </S.LinkBtn>
      </S.NewPlaylistBox>
    </S.CreateNewPlaylistWrap>
  );
}
