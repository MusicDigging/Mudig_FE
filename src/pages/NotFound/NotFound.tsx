import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import ErrorImg from '../../img/icon_error.svg';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';
import BGImg from '../../img/background-img2.svg';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundWrap>
      <BackButton onClick={() => navigate(-1)}></BackButton>
      <NotFoundSection>
        <img src={ErrorImg} alt='우는 뮤딕 캐릭터 이미지'></img>
        <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
        <Link to={'/main'}>
          <button>돌아가기</button>
        </Link>
      </NotFoundSection>
    </NotFoundWrap>
  );
}

const NotFoundWrap = styled.div`
  height: 100%;
  background: url(${BGImg}) top left / cover no-repeat;
`;
const BackButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 22px 0 19px 22px;
  background-image: url(${leftArrowIcon});
`;
const NotFoundSection = styled.section`
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  img {
    display: block;
    margin: 200px auto 25px auto;
  }
  p {
    color: #767676;
  }
  button {
    margin-top: 20px;
    width: 243px;
    height: 38px;
    background-color: #f5f2ff;
    color: #7d4fff;
    border-radius: 10px;
    font-size: 12px;
  }
`;
