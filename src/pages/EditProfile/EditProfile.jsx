import React from 'react';

import ProfileInput from '../../components/common/Input/ProfileInput';
import ProfileImage from '../../components/common/Image/ProfileImage';

import UploadImgBtn from '../../img/selectImg.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import * as S from './EditProfileStyle';

export default function EditProfile() {
  return (
    <S.EditProfileWrap>
      <S.MoveBackBtn to='/user/profile/my'>
        <img src={ArrowIcon} alt='' />
      </S.MoveBackBtn>
      <ProfileImage src='https://picsum.photos/200/300'>
        <S.ImgUploadBtn type='button'>
          <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
          <input
            type='file'
            accept='image/jpg,impge/png,image/jpeg'
            style={{ display: 'none' }}
          />
        </S.ImgUploadBtn>
      </ProfileImage>
      <ProfileInput btnText='변경하기' />
    </S.EditProfileWrap>
  );
}
