import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreatePlaylist } from '../../hooks/queries/usePlaylist';

import Loading from '../../components/Loading/Loading';
import YearSelection from '../../components/NewPlaylist/YearSelection';

import CharacterImg from '../../img/character-img4.svg';
import CharacterImg2 from '../../img/character-img5.svg';
import * as S from './CreatePlaylistStyle';

export default function CreateNewPlaylist3() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const state = location.state || {};
  const { situations, genre } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState((state && state.year) || '');
  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleCompleteBtnClick = (e) => {
    if (year.trim() === '') {
      return;
    }
    const data = { situations, genre: genre.join(','), year: year.trim() };

    setIsLoading(true);
    createPlaylist(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries('get-profile');
        setIsLoading(false);
        navigate('/playlist/summary', {
          state: { playlist: data.data.playlist.id },
        });
      },
      onError: () => {
        setIsLoading(false);
        setTimeout(() => {
          alert('생성 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
          // 처음 플리 생성 페이지로 이동
          navigate('/playlist/create1', {
            state: { situations, genre, year },
          });
        }, 0);
      },
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setYear(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
          </S.QuestionBox>
        </motion.div>
        <S.ImgBox isLoading={isLoading}>
          <img
            src={isLoading ? CharacterImg2 : CharacterImg}
            alt='캐릭터 이미지'
          />
        </S.ImgBox>
        <S.AnswerForm>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
          >
            <YearSelection year={year} setYear={setYear} />
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
