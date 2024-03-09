import styled from 'styled-components';
const SearchListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: calc(100vh - 230px);
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
const UserItem = styled.div`
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
export { SearchListBox, UserList, UserItem, UserImgBox, UserInfoBox };
