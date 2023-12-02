import React from 'react';
import styled from 'styled-components';
import ErrorImg from '../../img/icon_error.svg';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';

export default function NotFound() {
  return (
    <NotFoundWrap>
      <BackButton></BackButton>
      <NotFoundSection>
        <img src={ErrorImg} alt='우는 뮤딕 캐릭터 이미지'></img>
        <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
        <button>돌아가기</button>
      </NotFoundSection>
    </NotFoundWrap>
  );
}

const NotFoundWrap = styled.div`
  width: 360px;
`;
const BackButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 22px 0 19px 22px;
  background-image: url(${leftArrowIcon});
`;
const NotFoundSection = styled.section`
  text-align: center;
  img {
    display: block;
    margin: 250px auto 25px auto;
  }
  p {
    color: #7d4fff;
  }
  button {
    margin-top: 20px;
    width: 70px;
    height: 38px;
    background-color: #7d4fff;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
  }
`;
