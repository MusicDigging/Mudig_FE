import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MudigIcon from '../../../img/playlistinfo-mudig.svg';
import ProfileBadge from '../../../img/badge-icon.svg';
import { PlayListAtom } from '../../../library/atom';
import { Link } from 'react-router-dom';
import { CircleImage } from '../../common/Image/Image';
import { useState } from 'react';

export default function MoreInfo() {
  const { playlist, user } = useRecoilValue(PlayListAtom);
  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);

  return (
    <>
      {isOpenMoreInfo ? (
        <>
          <ThumbnailBlurBox />
          <MoreInfoBox>
            <h2>{playlist?.title}</h2>
            <WriterInfo
              to={`/user/profile/${user?.id}`}
              state={{ id: user?.id }}
            >
              <CircleImage src={user?.image} alt='프로필 이미지' />
              <img src={ProfileBadge} alt='프로필 작성자 배지' />
              <p>{user?.name}</p>
            </WriterInfo>
            <div>
              <p>{playlist?.content}</p>
              <button onClick={() => setIsOpenMoreInfo(false)}>닫기</button>
            </div>
          </MoreInfoBox>
        </>
      ) : (
        <MoreBtn onClick={() => setIsOpenMoreInfo(true)}>더보기</MoreBtn>
      )}
    </>
  );
}

const ThumbnailBlurBox = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 90%;
  backdrop-filter: blur(2px);
  z-index: 3;
`;

const MoreInfoBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 3;
  display: flex;
  bottom: 13px;
  left: 0;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px 0px;
  background: linear-gradient(180deg, #f5f2ff 0%, #fff 100%);
  color: var(--tertiary-font-color);
  font-size: var(--font-sm);
  line-height: normal;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  h2 {
    width: 100%;
    color: var(--font-color);
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-16px, -95%);
    width: 110px;
    height: 76px;
    background: url(${MudigIcon}) no-repeat center/contain;
  }
  button {
    float: right;
    color: var(--font-color);
    font-weight: var(--font-regular);
    align-self: flex-end;
    font-size: var(--font-sm);
  }
`;
const WriterInfo = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  img:first-child {
    width: 24px;
    height: 24px;
  }

  p {
    font-size: var(--font-sm);
    font-weight: var(--font-semi-bold);
  }
`;
const MoreBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-16px, 0);
  white-space: nowrap;
  color: #575757;
  font-size: var(--font-sm);
`;
