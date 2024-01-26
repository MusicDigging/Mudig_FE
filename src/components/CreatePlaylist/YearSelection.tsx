import React from 'react';
import styled from 'styled-components';

interface Props {
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function YearSelection(props: Props) {
  const { year, setYear } = props;
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };
  return (
    <>
      <SelectionWrap>
        {['상관없음', '2000년대', '2010년대', '2020년대'].map(
          (radioName, index) => (
            <RadioBox
              key={index}
              className={year === radioName ? 'checked' : ''}
              htmlFor={radioName}
            >
              <span></span>
              <input
                id={radioName}
                type='radio'
                name='genre'
                value={radioName}
                onChange={handleRadioChange}
                checked={year === radioName}
              />
              <label htmlFor={radioName}>{radioName}</label>
            </RadioBox>
          ),
        )}
      </SelectionWrap>
    </>
  );
}

const SelectionWrap = styled.div`
  font-weight: var(--font-regular);
  font-size: var(--font-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const RadioBox = styled.label`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-radius: 10px;
  border: 1px solid #fff;
  color: var(--sub-font-color);
  background-color: rgba(255, 255, 255, 0.6);
  transition: 0.3s;

  input {
    display: none;
  }
  label,
  span {
    user-select: none;
  }
  span {
    margin: 0 18px 0 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    border: 4px solid transparent;
    box-shadow: 0 0 0 1.6px #b0b0b0;
    cursor: pointer;
  }
  /* 체크된 라디오 버튼 스타일 */
  &.checked {
    border: 1px solid #8969ff;
    color: #8969ff;
    span {
      background-color: #8969ff;
      border: 4px solid #fff;
      box-shadow: 0 0 0 1.6px #8969ff;
    }
  }
`;
