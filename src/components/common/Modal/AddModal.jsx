import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { modalAtom } from '../../../atoms/modalAtom';
import closeIcon from '../../../img/close-icon.svg';
import { useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
import {
  SuccessToast,
  ErrorToast,
} from '../../../library/sweetAlert/sweetAlert';
import {
  useMyPlayList,
  usePutMyPlayList,
} from '../../../hooks/queries/usePlaylist';
import React from 'react';
export default function AddModal({ videoId }) {
  const navigate = useNavigate();
  const { data } = useMyPlayList();
  const { mutate: putMyPlayList } = usePutMyPlayList();
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const modalRef = useRef(null);
  //선택한 플레이리스트 아이디
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  //플레이리스트 존재유무
  const isPlaylistAvailable =
    data && data.myplaylist && data.myplaylist.length > 0;

  useEffect(() => {
    if (isPlaylistAvailable) {
      setSelectedPlaylist(data.myplaylist[0].title);
      setSelectedPlaylistId(data.myplaylist[0].id);
    } else {
      setSelectedPlaylist('플레이리스트를 먼저 생성해 주세요.');
    }
  }, [data]);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMakePlaylist = () => {
    navigate('/playlist/create1');
  };
  const handleSelectPlaylist = (title, id) => {
    setSelectedPlaylist(title);
    setSelectedPlaylistId(id);

    setDropdownOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  // 모달창 외부 클릭시 모달 닫기 & esc 모달창 닫기  키보드 이벤트 추가
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // event target이 modalRef안에서 일어나지 않은 경우
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSubmit = () => {
    const playlist_id = selectedPlaylistId; //담을 플리
    const music = String(videoId); //선택한 음악
    const data = { playlist_id, music };
    // console.log(data);
    putMyPlayList(data, {
      onSuccess: (data) => {
        // console.log(data);
        SuccessToast.fire({
          title: '플레이리스트 추가 완료',
        });
        setModalOpen(false);
        // navigate(`/playlist/detail/${playlist_id}`);
      },
      onError: (error) => {
        console.error('플리추가 실패', error);
        ErrorToast.fire({
          title: `플레이리스트 추가가 실패하였습니다. \n 다시 시도해주세요`,
        });
      },
    });
  };
  return (
    <ModalWrap>
      <ModalBox ref={modalRef}>
        <img onClick={handleClose} src={closeIcon} alt='닫기버튼' />
        <h1>플레이 리스트 추가</h1>
        {selectedPlaylist && (
          <PlaylistAdd type='button' onClick={handleToggleDropdown}>
            <p>{selectedPlaylist}</p>
            {isDropdownOpen && data.myplaylist && (
              <PlaylistDropdown ref={dropdownRef}>
                {data.myplaylist.map((playlist, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelectPlaylist(playlist.title, playlist.id)
                    }
                  >
                    {playlist?.title}
                  </li>
                ))}
              </PlaylistDropdown>
            )}
            {selectedPlaylist.length > 0 && <ArrowIcon fill='black' />}
          </PlaylistAdd>
        )}
        {/* 생성한 플리 여부에 따라 다른 버튼 보여주기 */}
        {isPlaylistAvailable ? (
          <>
            <Button
              type='submit'
              onClick={handleSubmit}
              btnWidth='295px'
              text='확인'
              alt='내 플레이리스트에 추가 '
            />
          </>
        ) : (
          <>
            <Button
              onClick={handleMakePlaylist}
              btnWidth='295px'
              text='플레이리스트 생성하러 가기'
              alt='플리생성하러가기 버튼 '
            />
          </>
        )}
      </ModalBox>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 327px;
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  height: 217px;
  h1 {
    margin-top: 30px;

    font-weight: 700;
    line-height: 33px;
    font-size: 22px;
  }
  img {
    cursor: pointer;
    position: absolute;
    left: 286px;
  }
`;

const PlaylistAdd = styled.button`
  position: relative;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  margin: 8px 0 16px 0;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 295px;
  font-size: 14px;
  height: 44px;

  p {
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
  }
`;

const PlaylistDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 180px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  width: 100%;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: #fff;
  list-style: none;
  padding: 8px;
  li {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
