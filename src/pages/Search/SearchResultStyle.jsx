import styled from 'styled-components';

const SearchWrap = styled.div`
  padding: 13.32px 16px;
  form {
    margin-bottom: 8px;
    button {
      vertical-align: middle;
    }
  }
`;
const SearchInput = styled.input`
  width: 274px;
  border-radius: 8px;
  background: #f6f6f6;
  padding: 12px 16px;
  margin-right: 19px;
  &:placeholder {
    color: #bfbfbf;
  }
`;
const NavList = styled.ul`
  display: flex;
  margin-bottom: 24px;
  li {
    width: 100%;
  }
  button {
    font-size: var(--font-lg);
    width: 100%;
    height: 44px;
    padding: 10px;
    &:active,
    &.active {
      color: var(--btn-point-color);
      box-shadow: inset 0 -2px var(--btn-point-color);
    }
  }
`;
const SearchListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const SearchListSection = styled.section`
  h2 {
    font-size: 20px;
  }
`;
const SearchListTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  margin-bottom: 20px;
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
  SearchWrap,
  SearchInput,
  NavList,
  SearchListBox,
  SearchListSection,
  SearchListTitleBox,
  UserList,
  UserItem,
  UserInfoBox,
};
