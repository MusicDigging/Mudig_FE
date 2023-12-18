import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const EditProfileWrap = styled.main`
  padding: 72px 16px 112px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const MoveBackBtn = styled(Link)`
  position: absolute;
  top: 22px;
  left: 16px;
`;
