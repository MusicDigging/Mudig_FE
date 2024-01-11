import React from 'react';
import styled from 'styled-components';

export default function GenreSelection(props) {
  const { genre, setGenre } = props;
  const handleRadioChange = (e) => {
    setGenre(e.target.value);
  };
  return (
    <>
      <SelectionWrap>
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
        ].map((radioName, index) => (
          <RadioBox key={index}>
            <input
              id={radioName}
              type='radio'
              name='genre'
              value={radioName}
              onChange={handleRadioChange}
              checked={genre === radioName}
            />
            <label htmlFor={radioName}>{radioName}</label>
          </RadioBox>
        ))}
      </SelectionWrap>
    </>
  );
}

const SelectionWrap = styled.div`
  font-weight: var(--font-regular);
  font-size: var(--font-md);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const RadioBox = styled.div`
  input {
    display: none;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 8px 16px;
    transition: 0.3s;
    width: 75px;
    height: 36px;
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid #fff;
    color: var(--sub-font-color);
    background-color: rgba(255, 255, 255, 0.6);
    user-select: none;
  }
  input:checked + label {
    border: 1px solid var(--main-color);
    color: var(--main-color);
    background-color: #e5dcff;
  }
`;
