import React, { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProfileImage from '../../components/common/Image/ProfileImage';
import UploadImgBtn from '../../img/selectImg.svg';
import ProfileInput from '../../components/common/Input/ProfileInput';
import { SignUpAtom } from '../../library/atom';
import { useRecoilState } from 'recoil';
import { ImgCompression } from '../../library/ImgCompression';
import { useNavigate } from 'react-router-dom';

export default function SetProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(SignUpAtom);
  const [genre, setGenre] = useState([]);
  const [previewImg, setPreviewImg] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
  );
  const [uploadImg, setUploadImg] = useState('');
  const fileInput = useRef(null);

  const handleImageUpload = () => {
    fileInput.current.click();
  };

  const imgValidation = (file) => {
    if (!file) {
      return false;
    }

    if (file.size > 1024 * 1024 * 10) {
      alert('이미지 파일의 크기를 초과하였습니다. (최대 10MB)');
      return false;
    }

    //이미지 지원 형식 확인
    if (
      !file.name.includes('png') &&
      !file.name.includes('jpg') &&
      !file.name.includes('jpeg') &&
      !file.name.includes('bmp') &&
      !file.name.includes('tif') &&
      !file.name.includes('heic')
    ) {
      alert(
        `이미지 형식을 확인해 주세요!\n(지원형식 : .jpg, .png, .jpeg,.bmp, .tif, *.heic)`,
      );
      return false;
    }
    return true; //모두 만족 한다면 true
  };

  // 장르 선택 함수 props
  const handleChipSelect = (newSelectedChips) => {
    setGenre(newSelectedChips);
    console.log('장르선택:', newSelectedChips);
  };

  const selectGenre = genre.join(',');

  const handleImageChange = async (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    try {
      console.log('압축 전:', file);
      const { compressedFile, preview } = await ImgCompression(file);

      console.log('압축 후:', compressedFile);
      setUploadImg(compressedFile);
      setPreviewImg(preview);
    } catch (error) {
      console.log('이미지 압축 실패', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('email', userInfo.email);
      formData.append('password', userInfo.password);
      formData.append('name', data.nickName);
      formData.append('about', data.about || '소개글을 작성해주세요.');
      formData.append('genre', selectGenre);
      formData.append('image', uploadImg);

      const response = await axios.post(
        'https://api.mudig.co.kr/user/join/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      console.log('회원가입 성공:', response.data);
      setUserInfo({
        ...userInfo,
        name: data.nickName,
        about: data.about || '',
        genre: selectGenre,
      });
      navigate('/login');
    } catch (error) {
      console.error('실패:', error.response.data.message);
    }
    console.log(typeof data.about);
  };

  return (
    <SetProfileWrap>
      <PageNum>2/2</PageNum>
      <SetProfileTitle>
        가입을 축하드려요! <br />
        프로필을 설정해주세요
      </SetProfileTitle>
      <SetProfileBox>
        <ProfileImage src={previewImg}>
          <ImgUploadBtn type='button' onClick={handleImageUpload}>
            <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
            <input
              type='file'
              accept='image/jpg,impge/png,image/jpeg'
              ref={fileInput}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </ImgUploadBtn>
        </ProfileImage>
        <ProfileInputBox>
          {/* 프로필 설정 input, button  */}
          <ProfileInput
            onSubmit={onSubmit}
            btnText='다음'
            onChipSelect={handleChipSelect}
          />
        </ProfileInputBox>
      </SetProfileBox>
    </SetProfileWrap>
  );
}

const SetProfileWrap = styled.div`
  padding: 56px 16px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SetProfileBox = styled.div`
  margin-top: 58px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 40px;
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
  height: 100%;
`;
