import styled from 'styled-components';
import BGImg from '../../img/background-img2.svg';

export const ProfileWrap = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  font-size: var(--font-md);
  color: var(--font-color);
  background: url(${BGImg}) top left / cover no-repeat;
`;
