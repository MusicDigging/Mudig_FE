import React from 'react';
import styled from 'styled-components';
import { ChipButton } from './Button/Button';
export default function Chip() {
  return (
    <>
      <Chipwrap>
        <Title>관심사</Title>
        <ChipBox>
          <ChipButton name='POP' />
          <ChipButton name='K-POP' />
          <ChipButton name='J-POP' />
          <ChipButton name='힙합' />
          <ChipButton name='R&B' />
          <ChipButton name='발라드' />
          <ChipButton name='댄스' />
          <ChipButton name='인디' />
          <ChipButton name='OST' />
        </ChipBox>
      </Chipwrap>
    </>
  );
}

const Chipwrap = styled.div`
  font-weight: var(--font-regular);
  font-size: var(--font-md);
`;

const ChipBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;
