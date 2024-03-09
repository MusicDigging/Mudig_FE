import styled from 'styled-components';

const TabButtonBox = styled.div`
  padding-bottom: 18px;
  display: flex;
  gap: 12px;
  width: 100%;
  background: #fff;
`;

const TabButton = styled.button<{ active: boolean }>`
  width: 60px;
  border-radius: 20px;
  padding: 4px 0px;
  border: ${(props) =>
    props.active ? '1px solid var(--main-color)' : '1px solid #e5e5e5'};
  background: ${(props) =>
    props.active ? '#e5dcff' : 'rgba(255, 255, 255, 0.6)'};
  color: ${(props) => (props.active ? 'var(--main-color)' : '#767676')};
  font-size: var(--font-md);
`;

const PlaylistWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: calc(100vh - 270px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;

const UserImgBox = styled.div`
  width: 60px;
  height: 60px;
`;

const UserInfoBox = styled.div`
  font-size: var(--font-md);
  div {
    margin-bottom: 3px;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  p {
    color: var(--sub-font-color);
  }
`;

export {
  TabButtonBox,
  TabButton,
  PlaylistWrap,
  UserList,
  UserItem,
  UserImgBox,
  UserInfoBox,
};
