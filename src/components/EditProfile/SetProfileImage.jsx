import React from 'react';
import styled from 'styled-components';
import { ImgCompression } from '../../library/ImgCompression';
import ProfileImage from '../../components/common/Image/ProfileImage';

import UploadImgBtn from '../../img/selectImg.svg';

export default function SetProfileImage(props) {
  const { fileInput, src, setUploadImg, setPreviewImg } = props;

  const handleImageUpload = () => {
    fileInput.current.click();
  };

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

  return (
    <SetProfileImageWrap>
      <ProfileImage src={src}>
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
    </SetProfileImageWrap>
  );
}

const SetProfileImageWrap = styled.div`
  position: relative;
`;

export const ImgUploadBtn = styled.button`
  position: absolute;
  right: -15px;
  bottom: -9px;
  img {
    width: 36px;
  }
`;
