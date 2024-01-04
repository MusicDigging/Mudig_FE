import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import CharacterImg from '../../img/character-img2.svg';
import * as S from './CreatePlaylistStyle';

export default function CreateNewPlaylist1() {
  const location = useLocation();
  const state = location.state || {};
  const { genre, year, backAnimation } = state;
  const [situations, setSituations] = useState(
    (state && state.situations) || '',
  );

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setSituations(value);
    }
  };

  return (
    <>
      <S.CreateNewPlaylistWrap>
        <h1 className='a11y-hidden'>플레이리스트 생성하기</h1>
        <S.PageNum>1/3</S.PageNum>
        <S.NewPlaylistBox>
          <motion.div
            initial={
              backAnimation && { x: backAnimation ? -300 : 0, opacity: 0 }
            }
            animate={
              backAnimation && {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 },
              }
            }
          >
            <S.QuestionBox>
              <p>어떤 분위기의 음악을 원하세요?</p>
              <p>현재 상황이나 기분을 알려주셔도 돼요 :)</p>
            </S.QuestionBox>
          </motion.div>
          <motion.img
            initial={backAnimation || { opacity: 0 }}
            animate={
              backAnimation || {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 },
              }
            }
            src={CharacterImg}
            alt='캐릭터 이미지'
          ></motion.img>

          <S.AnswerForm>
            <motion.div
              initial={{ x: backAnimation ? -300 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
            >
              <S.AnswerTextarea
                name='situations'
                cacheMeasurements
                placeholder='내용을 입력해주세요.'
                maxRows={4}
                minRows={1}
                value={situations}
                onChange={handleInputChange}
              />
              <span>{situations.length}/100</span>
            </motion.div>
            <S.NextLink
              to='/playlist/create2'
              state={{ situations, genre, year, backAnimation: false }}
              disabled={situations.trim() === ''}
              onClick={(e) => situations.trim() === '' && e.preventDefault()}
            >
              다음
            </S.NextLink>
          </S.AnswerForm>
        </S.NewPlaylistBox>
      </S.CreateNewPlaylistWrap>
    </>
  );
}
