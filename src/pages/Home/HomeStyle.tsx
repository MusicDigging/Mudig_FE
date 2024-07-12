import styled from 'styled-components';
import BgImg from '../../img/background-img2.svg';
import MoreImg from '../../img/right-arrow-icon.svg';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';

export const HomeWrap = styled.main`
  width: 100%;
  height: 100%;
  background: url(${BgImg}) top left / cover no-repeat;
`;
export const HomeSection = styled.section`
  #bold {
    font-weight: 500;
  }

  margin-bottom: 50px;
`;
export const MyPlayListNoneInfo = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: var(--font-lg);
    color: #b0b0b0;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    color: var(--main-color);
    border-radius: 10px;
    border: 1px solid #fff;
    background: #f5f2ff;
  }
`;
export const PlaylistNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 24px;
  margin-left: 16px;
  text-align: center;
  cursor: pointer;
  h2 {
    font-size: var(--font-lg);
    font-weight: 500;
  }
`;
export const MoreBtn = styled.button`
  width: 15px;
  height: 15px;
  margin-right: 15px;
  background-image: url(${MoreImg});
`;
export const BackButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 22px 0 15px 16px;
  background-image: url(${leftArrowIcon});
`;
export const MorePlaylistWrap = styled.div`
  .morePlaylistName {
    position: absolute;
    top: 25px;
    left: 55px;
  }
`;
