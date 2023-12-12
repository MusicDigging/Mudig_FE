import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../../components/RandomMv/VideoPlayer';
import VideoInfo from '../../components/RandomMv/VideoInfo';
import MainHeader from '../../components/common/Header/MainHeader';
import axios from 'axios';

import { useMutation } from 'react-query';
import { userInfoAtom } from '../../library/atom';
import { useRecoilValue } from 'recoil';
export default function RandomMusic() {
  const token = useRecoilValue(userInfoAtom).token.access;
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.mudig.co.kr/playlist/random-mv/',
          {
            already_musiclist: [null],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setVideoData(response.data);
        }
      } catch (error) {
        console.error('데이터 받아오기 실패 :', error);
      }

      console.log(videoData);
    };

    fetchData();
  }, []);
  return (
    <>
      <MainHeader />
      <PlayerWrap>
        {videoData?.map((video, index) => (
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
  overflow-y: auto;
  margin-top: 6px;
`;
const PlayerBox = styled.div`
  padding: 8px 16px;
  font-size: var(--font-md);
`;
