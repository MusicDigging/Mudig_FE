import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { toastAtom } from '../../library/atom';
import { ImgCompression } from '../../library/ImgCompression';
import ProfileImage from '../../components/common/Image/ProfileImage';

import UploadImgBtn from '../../img/selectImg.svg';

interface Props {
  fileInput: React.RefObject<HTMLInputElement>;
  src: string;
  setUploadImg: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>;
}
const supportedFormats = ['.jpg', '.png', '.jpeg', '.bmp', '.tif', '.heic'];
export default function SetProfileImage(props: Props) {
  const { fileInput, src, setUploadImg, setPreviewImg } = props;
  const setToast = useSetRecoilState(toastAtom);
  const handleImageUpload = () => {
    fileInput.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    try {
      // console.log('압축 전:', file);
      const { compressedFile, preview } = await ImgCompression(file);

      // console.log('압축 후:', compressedFile);
      setUploadImg(compressedFile);
      setPreviewImg(preview);
    } catch (error) {
      // console.log('이미지 압축 실패', error);
    }
  };

  const imgValidation = (file: File) => {
    if (!file) {
      return false;
    }

    if (file.size > 1024 * 1024 * 10) {
      setToast({
        content: '이미지 파일의 크기를 초과하였습니다.(최대 10MB)',
        type: 'error',
      });
      return false;
    }

    //이미지 지원 형식 확인
    if (!supportedFormats.some((format) => file.name.includes(format))) {
      setToast({
        content:
          '이미지 형식을 확인해 주세요! (지원형식: .jpg, .png, .jpeg, .bmp, .tif, *.heic)',
        type: 'warning',
      });
      return false;
    }
    return true; //모두 만족 한다면 true
  };

  return (
    <SetProfileImageWrap>
      <ProfileImage src={src} alt='프로필 이미지'>
        <ImgUploadBtn type='button' onClick={handleImageUpload}>
          <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
          <input
            type='file'
            accept='image/jpg, image/png, image/jpeg, image/bmp, image/tif, image/heic'
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
