import styled from 'styled-components';
import BgImg from '../../img/background-img2.svg';
export const HomeWrap = styled.main`
  width: 360px;
  height: 100%;
  background: url(${BgImg}) top left / cover no-repeat;
`;
export const HomeSection = styled.section`
  h2 {
    margin-top: 24px;
    margin-left: 16px;
    font-size: var(--font-lg);
  }
  #bold {
    font-weight: 500;
  }
`;
export const MyPlayListNoneInfo = styled.div`
  width: 300px;
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
