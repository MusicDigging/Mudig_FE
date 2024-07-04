import styled from 'styled-components';
import { MiniModalWrap } from '../../components/common/Modal/MiniModal';

const PlaylistDetailWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const PlayListDetailBox = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;
  background-color: #fff;
`;
const MusicNothingSection = styled.section`
  &,
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  width: 100%;
  text-align: center;
  font-size: var(--font-md);
  color: var(--font-color);
  line-height: normal;
  padding: 50px 16px 66px;
  p {
    font-weight: var(--font-semi-bold);
  }
  span {
    font-size: var(--font-sm);
  }
  a {
    width: 243px;
    height: 44px;
    padding: 8px 16px;
    margin-top: 16px;
    border-radius: 10px;
    background: #f5f2ff;
    color: var(--main-color);
    font-weight: var(--semi-font-bold);
  }
`;
const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
  filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
    brightness(104%) contrast(101%);
  z-index: 5;
`;
const MoreBtnBox = styled.div`
  position: absolute;
  top: 22px;
  right: 16px;
  z-index: 5;
  img {
    filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
      brightness(104%) contrast(101%);
  }
`;
const MiniModalStyle = styled(MiniModalWrap)`
  right: 0;
  top: 32px;
`;

export {
  PlaylistDetailWrap,
  PlayListDetailBox,
  MusicNothingSection,
  MoveBackBtn,
  MoreBtnBox,
  MiniModalStyle,
};
