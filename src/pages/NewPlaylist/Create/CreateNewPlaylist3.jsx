import React from 'react';
import { motion } from 'framer-motion';

import CharacterImg from '../../../img/character-img.svg';

import * as S from './CreateNewPlaylistStyle';

export default function NewPlaylistQuestion3() {
  function handleBtnclick() {}

  return (
    <S.CreateNewPlaylistWrap>
      <h1 className='a11y-hidden'>플레이리스트 생성하기</h1>
      <S.PageNum>3/3</S.PageNum>

      <S.NewPlaylistBox>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        >
          <S.QuestionBox>
            <p>과거의 클래식한 음악부터 현재의</p>
            <p>트랜드한 음악들 중 어떤 걸 추천해드릴까요?</p>
            <p>( 상관없음, 2000년대, 2020년대 등 )</p>
          </S.QuestionBox>
        </motion.div>
        <img src={CharacterImg} alt='캐릭터 이미지' />
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        >
          <S.Answer
            cacheMeasurements
            placeholder='내용을 입력해주세요.'
            maxRows={4}
            minRows={1}
          />
        </motion.div>
      </S.NewPlaylistBox>

      <S.LinkBtn text='확인' to='' onClick={handleBtnclick} disabled={false}>
        확인
      </S.LinkBtn>
    </S.CreateNewPlaylistWrap>
  );
}
