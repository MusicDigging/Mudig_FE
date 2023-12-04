import React, { useState } from 'react';
import styled from 'styled-components';
import { ChipButton } from '../../components/common/Button/Button';
import ProfileImage from '../../components/common/Image/ProfileImage';
import UploadImgBtn from '../../img/selectImg.svg';
import ProfileInput from '../../components/common/Input/ProfileInput';
export default function SetProfile() {
  const onSubmit = (data) => {
    console.log('폼 제출', data, selectedChipsString);
  };

  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipSelect = (newSelectedChips) => {
    setSelectedChips(newSelectedChips);
    console.log(newSelectedChips);
  };

  //백엔드 전달시 문자열로 전달해줘야 되기에 join 메서드 사용
  const selectedChipsString = selectedChips.join(', ');

  return (
    <SetProfileWrap>
      <PageNum>2/2</PageNum>
      <SetProfileTitle>
        가입을 축하드려요! <br />
        프로필을 설정해주세요
      </SetProfileTitle>
      <SetProfileBox>
        <ProfileImage src='https://picsum.photos/200/300'>
          <ImgUploadBtn type='button'>
            <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
            <input
              type='file'
              accept='image/jpg,impge/png,image/jpeg'
              style={{ display: 'none' }}
            />
          </ImgUploadBtn>
        </ProfileImage>
      </SetProfileBox>
      <ProfileInputBox>
        {/* 프로필 설정 input, button  */}
        <ProfileInput onSubmit={onSubmit} btnText='다음' />
        <>
          <Chipwrap>
            <Title>관심사</Title>
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
      </ProfileInputBox>
    </SetProfileWrap>
  );
}

const SetProfileWrap = styled.div`
  padding: 56px 16px 24px;
  display: flex;

  width: 100%;
  flex-direction: column;
`;

const SetProfileBox = styled.div`
  margin-top: 58px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 53px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  left: 317px;
  font-size: var(--font-l);
  color: var(--sub-font-color);
  font-weight: 500;
`;

const SetProfileTitle = styled.h1`
  width: 252px;
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
`;

const ImgUploadBtn = styled.button`
  position: absolute;
  right: -15px;
  bottom: -9px;
  img {
    width: 36px;
  }
`;

const ProfileInputBox = styled.div`
  margin-top: 48.39px;
  font-size: var(--font-md);
  height: 100%;
`;

const Chipwrap = styled.div`
  font-weight: var(--font-regular);
  font-size: var(--font-md);
  /* padding-left: 16px; */
`;

const ChipBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;
