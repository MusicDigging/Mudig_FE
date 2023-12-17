import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { useCreatePlaylist } from '../../hooks/queries/usePlaylist';

import Loading from '../../components/Loading/Loading';

import CharacterImg from '../../img/character-img.svg';
import * as S from './CreatePlaylistStyle';

export default function CreateNewPlaylist3() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { situations, genre } = state;
  const [year, setYear] = useState((state && state.year) || '');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleCompleteBtnClick = (e) => {
    const data = { situations, genre: genre.join(','), year };

    setIsLoading(true);
    createPlaylist(data, {
      onSuccess: (data) => {
        setIsLoading(false);
        navigate('/playlist/summary', {
          state: { playlist: data.data.playlist },
        });
      },
      onError: () => {
        setIsLoading(false);
        alert('생성 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
      },
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setYear(value);
    }
  };

  return (
    <S.CreateNewPlaylistWrap>
      {isLoading && <Loading isLoading={isLoading} />}
      <h1 className='a11y-hidden'>플레이리스트 생성하기</h1>
      <S.PageNum>3/3</S.PageNum>

      <S.NewPlaylistBox>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          <S.QuestionBox>
            <p>과거의 클래식한 음악부터 현재의</p>
            <p>트랜드한 음악들 중 어떤 걸 추천해드릴까요?</p>
            <p>( 상관없음, 2000년대, 2020년대 등 )</p>
          </S.QuestionBox>
        </motion.div>
        <img src={CharacterImg} alt='캐릭터 이미지' />
        <S.AnswerForm>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
          >
            <S.Answer
              name='year'
              cacheMeasurements
              placeholder='내용을 입력해주세요.'
              maxRows={4}
              minRows={1}
              value={year}
              onChange={handleInputChange}
            />
            <span>{year.length}/100</span>
          </motion.div>
          <S.LinkBox>
            <S.BackLink
              to='/playlist/create2'
              state={{ situations, genre, year, backAnimation: true }}
              disabled={false}
            >
              이전
            </S.BackLink>
            <S.CompleteBtn
              type='button'
              onClick={handleCompleteBtnClick}
              disabled={year.trim() === ''}
            >
              완료
            </S.CompleteBtn>
          </S.LinkBox>
        </S.AnswerForm>
      </S.NewPlaylistBox>
    </S.CreateNewPlaylistWrap>
  );
}
