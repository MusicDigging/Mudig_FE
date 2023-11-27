import React from 'react';
import { motion } from 'framer-motion';

import NewPlaylistChip from '../../../components/NewPlaylist/NewPlaylistChip';

import CharacterImg from '../../../img/character-img.svg';
import * as S from './NewPlaylistQuestionStyle';

export default function NewPlaylistQuestion2() {
  return (
    <S.NewPlaylistQuestionWrap>
      <S.PageNum>2/3</S.PageNum>

      <S.NewPlaylistBox>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        >
          <S.QuestionBox>
            <p>어떤 장르의 음악을 즐겨들으시나요?</p>
            <p>(J-POP, 힙합, R&B 등 )</p>
          </S.QuestionBox>
        </motion.div>
        <img src={CharacterImg} alt='캐릭터 이미지' />
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        >
          <NewPlaylistChip />
        </motion.div>
      </S.NewPlaylistBox>
      <S.LinkBtn to='/playlist/create3' disabled={false}>
        다음
      </S.LinkBtn>
    </S.NewPlaylistQuestionWrap>
  );
}
