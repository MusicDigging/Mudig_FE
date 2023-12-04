import React from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar/NavBar';
import MainHeader from '../../components/common/Header/MainHeader';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import PlayListTable from '../../components/Home/PlayListTable';

export default function Home() {
  return (
    <HomeWrap>
      <MainHeader />
      <HomeSection>
        <h2 id='bold'>고길동2님을 위한 플레이리스트</h2>
        <PlayListTable liSize={{ width: '152px' }} />
        <h2>지금 핫한🔥 플레이리스트</h2>
        <PlayListTable liSize={{ width: '118px' }} />
        <h2>내가 생성한 플레이리스트</h2>
        <MyPlayListTable />
        <h2>신규 플레이리스트</h2>
        <PlayListTable liSize={{ width: '118px' }} />
      </HomeSection>
      <NavBar />
    </HomeWrap>
  );
}
const HomeWrap = styled.div`
  width: 360px;
  height: 100%;
  overflow: hidden;
`;
const HomeSection = styled.section`
  position: absolute;
  top: 70px;
  padding-bottom: 70px;
  h2 {
    margin-top: 24px;
    margin-left: 16px;
    font-size: --font-lg;
  }
  #bold {
    font-weight: bold;
  }
`;
