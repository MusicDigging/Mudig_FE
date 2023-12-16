import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../../components/RandomMv/VideoPlayer';
import VideoInfo from '../../components/RandomMv/VideoInfo';
import MainHeader from '../../components/common/Header/MainHeader';
import axios from 'axios';

import { useRandomMv } from '../../hooks/queries/useRandomMv';

export default function RandomMusic() {
  const { data: videoDate, mutate: getRandomMv } = useRandomMv();
  const [id, setId] = useState([]);
  const selectId = id.join(',');
  useEffect(() => {
    const fetchRandomMv = async () => {
      getRandomMv(selectId, {
        onSuccess: (data) => {
          console.log(data);
          const alreadyMusic = data.map((video) => video.id);
          setId((prevId) => [...prevId, ...alreadyMusic]);
        },

        onError: (error) => {
          console.error('랜덤뮤비 불러오기 실패', error);
        },
      });
      console.log(selectId);
    };

    fetchRandomMv();
  }, []);

  return (
    <>
      <MainHeader />
      <PlayerWrap>
        {videoDate?.map((video, index) => (
          <PlayerBox id={video.id} key={index}>
            <VideoPlayer url={video.information} />
            <VideoInfo title={video.song} views={`${video.singer}`} />
          </PlayerBox>
        ))}
      </PlayerWrap>
    </>
  );
}

const PlayerWrap = styled.div`
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 6px;
`;
const PlayerBox = styled.div`
  padding: 8px 16px;

  font-size: var(--font-md);
`;
