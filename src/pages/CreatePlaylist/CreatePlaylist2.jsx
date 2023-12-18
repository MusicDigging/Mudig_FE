import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import NewPlaylistChip from '../../components/NewPlaylist/NewPlaylistChip';

import CharacterImg from '../../img/character-img3.svg';
import * as S from './CreatePlaylistStyle';

export default function CreateNewPlaylist2() {
  const location = useLocation();
  const state = location.state || {};
  const { situations, year, backAnimation } = state;
  const [genre, setGenre] = useState((state && state.genre) || []);

  return (
    <S.CreateNewPlaylistWrap>
      <h1 className='a11y-hidden'>플레이리스트 생성하기</h1>
      <S.PageNum>2/3</S.PageNum>

      <S.NewPlaylistBox>
        <motion.div
          initial={{ x: backAnimation ? -300 : 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          <S.QuestionBox>
            <p>어떤 장르의 음악을 즐겨들으시나요?</p>
            <p>(J-POP, 힙합, R&B 등 )</p>
          </S.QuestionBox>
        </motion.div>
        <img src={CharacterImg} alt='캐릭터 이미지' />
        <S.AnswerForm>
          <motion.div
            initial={{ x: backAnimation ? -300 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
          >
            <NewPlaylistChip
              selectedChips={genre}
              setSelectedChips={setGenre}
            />
          </motion.div>
          <S.LinkBox>
            <S.BackLink
              to='/playlist/create1'
              state={{
                situations,
                genre,
                year,
                backAnimation: true,
              }}
              disabled={false}
            >
              이전
            </S.BackLink>
            <S.NextLink
              to='/playlist/create3'
              state={{
                situations,
                genre,
                year,
                backAnimation: false,
              }}
              disabled={genre.length === 0}
              onClick={(e) => genre.length === 0 && e.preventDefault()}
            >
              다음
            </S.NextLink>
          </S.LinkBox>
        </S.AnswerForm>
      </S.NewPlaylistBox>
    </S.CreateNewPlaylistWrap>
  );
}
