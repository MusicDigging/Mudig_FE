import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function MiniModal(props: Props) {
  const { children } = props;
  return <MiniModalWrap>{children}</MiniModalWrap>;
}

export const MiniModalWrap = styled.div`
  min-width: 98px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 2;
  padding: 11px;
  border-radius: 10px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  font-size: var(--font-md);
  color: black;
  button,
  a {
    color: black;
    padding: 6px;
    font-size: var(--font-md);
    text-align: left;
    line-height: normal;
  }
`;
