import styled from 'styled-components';
const SetProfileWrap = styled.div`
  padding: 56px 16px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
  right: 16px;
  font-size: var(--font-l);
  color: var(--sub-font-color);
  font-weight: 500;
`;

const SetProfileTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
`;

const ProfileInputBox = styled.div`
  height: 100%;
`;

export {
  SetProfileWrap,
  SetProfileBox,
  PageNum,
  SetProfileTitle,
  ProfileInputBox,
};
