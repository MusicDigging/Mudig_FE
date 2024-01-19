import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../../components/RandomMv/VideoPlayer';
import VideoInfo from '../../components/RandomMv/VideoInfo';
import MainHeader from '../../components/common/Header/MainHeader';
import AddModal from '../../components/common/Modal/AddModal';
import { useRandomMv } from '../../hooks/queries/useRandomMv';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import { InfoToast } from '../../library/sweetAlert/sweetAlert';

import Toast from '../../components/common/Toast';
import { toastAtom } from '../../library/atom';

interface IVideo {
  id: string;
  information: string;
  song: string;
  singer: string;
}
export default function RandomMusic() {
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const { mutate: getRandomMv } = useRandomMv();
  //랜덤뮤비 중복 방지 위해 post 요청 보낼 id
  const [id, setId] = useState<string[]>([]);
  const selectId = id.join(',');
  //개별 뮤비 아이디
  const [videoId, setVideoId] = useState('');
  const [toast, setToast] = useRecoilState(toastAtom);
  const [page, setPage] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [allVideos, setAllVideos] = useState<IVideo[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  //버튼 클릭히 해당 뮤비 아이디 함수`
  const handleAddButtonClick = (videoId: string) => {
    // console.log(`선택된 뮤비 ${videoId}`);
    setVideoId(videoId);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchRandomMv = async () => {
      const data = { selectId, page };
      // console.log(data);
      getRandomMv(data, {
        onSuccess: (newVideoData: IVideo[]) => {
          if (newVideoData.length === 0) {
            setIsEnd(true);
            return;
          }
          //받아온 뮤비들의 id값 갱신하여 [id, setId] 에 저장
          const dataId = newVideoData.map((video) => video.id);
          setId((prevId) => [...prevId, ...dataId]);
          setPage((prevPage) => prevPage + 1);
          //기존 비디오랑 새로 받아오는 비디오
          setAllVideos((prevVideos) => [...prevVideos, ...newVideoData]);
        },
        onError: (error) => {
          console.error('랜덤뮤비 불러오기 실패', error);
        },
      });
    };

    const observerCallback = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        await fetchRandomMv();
        // console.log('스크롤 이벤트 발생!');
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
    } else if (!isEnd) {
      // 더 이상 데이터가 없는 경우
      InfoToast.fire({
        icon: 'info',
        title: '더 이상 보여줄 뮤비 정보가 없습니다!',
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <>
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
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
