import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../../components/RandomMv/VideoPlayer';
import VideoInfo from '../../components/RandomMv/VideoInfo';
import MainHeader from '../../components/common/Header/MainHeader';
import AddModal from '../../components/common/Modal/AddModal';
import { useRandomMv } from '../../hooks/queries/useRandomMv';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';

import { IVideoData } from '../../types/RandomMv';

export default function RandomMusic() {
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const { mutate: getRandomMv } = useRandomMv();
  const [id, setId] = useState<string[]>([]);
  const selectId = id.join(',');
  const [videoId, setVideoId] = useState('');
  const [page, setPage] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [allVideos, setAllVideos] = useState<IVideoData[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  const handleAddButtonClick = (videoId: string) => {
    // console.log(`선택된 뮤비 ${videoId}`);
    setVideoId(videoId);
    setModalOpen(true);
  };

  const fetchRandomMv = async () => {
    const data = { selectId, page };
    getRandomMv(data, {
      onSuccess: (newVideoData: IVideoData[]) => {
        console.log(data);
        if (newVideoData.length === 0) {
          setIsEnd(true);
          return;
        }
        const dataId = newVideoData.map((video) => video.id);
        setId((prevId) => [...prevId, ...dataId]);
        setPage((prevPage) => prevPage + 1);
        setAllVideos((prevVideos) => [...prevVideos, ...newVideoData]);
      },
      onError: (error) => {
        console.error('랜덤뮤비 불러오기 실패', error);
      },
    });
  };

  useEffect(() => {
    const observerCallback = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        await fetchRandomMv();
      }
    };

    const observerOptions = {
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, id]);

  return (
    <>
      <MainHeader />
      <PlayerWrap>
        {allVideos &&
          allVideos.map((video, index) => (
            <PlayerBox id={video.id} key={index}>
              <VideoPlayer url={video.information} />
              <VideoInfo
                title={video.song}
                views={video.singer}
                onAddButtonClick={() => handleAddButtonClick(video.id)}
              />
            </PlayerBox>
          ))}
        <div ref={targetRef} />
        {modalOpen && <AddModal videoId={videoId} />}
      </PlayerWrap>
    </>
  );
}

const PlayerWrap = styled.main`
  margin-top: 6px;
`;

const PlayerBox = styled.div`
  padding: 8px 16px;
  font-size: var(--font-md);
`;
