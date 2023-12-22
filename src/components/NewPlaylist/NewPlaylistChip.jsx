import React from 'react';
import styled from 'styled-components';
import { ChipButton } from '../../components/common/Button/Button';
export default function NewPlaylistChip(props) {
  const { selectedChips, setSelectedChips } = props;
  const handleChipSelect = (newSelectedChips) => {
    setSelectedChips(newSelectedChips);
  };
  return (
    <>
      <Chipwrap>
        <ChipBox>
          {[
            'POP',
            'K-POP',
            'J-POP',
            '힙합',
            'R&B',
            '발라드',
            '댄스',
            '인디',
            'OST',
          ].map((chipName, index) => (
            <ChipButton
              key={index}
              name={chipName}
              onSelect={handleChipSelect}
              selectedChips={selectedChips}
            />
          ))}
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
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;
