import { css } from 'styled-components';

import NotoSansRegular from '../fonts/NotoSansKR-Regular.ttf';
import NotoSansMedium from '../fonts/NotoSansKR-Medium.ttf';
import NotoSansBold from '../fonts/NotoSansKR-Bold.ttf';

export const fonts = css`
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 400;
    src: url(${NotoSansRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    src: url(${NotoSansMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Noto Sans KR';

    font-weight: 700;

    src: url(${NotoSansBold}) format('truetype');
  }
`;
