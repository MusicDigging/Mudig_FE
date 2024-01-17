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
`;
export const MyPlayListNoneInfo = styled.div`
  width: 100%;
  margin: auto;
  #MyPlayListNoneInfoText {
    font-size: 14px;
    margin: 34px auto;
    display: block;
    font-weight: 100;
    text-align: center;
  }
  #MyPlayListNoneInfoBtn {
    font-weight: 100;
    width: 243px;
    display: block;
    margin: auto;
    height: 44px;
    color: #7d4fff;
    background-color: #f5f2ff;
    border-radius: 5px;
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
    top: 17px;
    left: 55px;
  }
`;
