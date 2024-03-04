import styled from 'styled-components';

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const LoginHeader = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 56px;

  line-height: 33px;
`;

const LoginTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const LoginText = styled.span`
  color: var(--sub-font--color);
  font-size: var(--font-md);
  line-height: 33px;
`;
const LoginMain = styled.main`
  position: relative;
  text-align: center;
  top: 149px;
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 25px;
`;

const Span = styled.span`
  position: relative;
  display: block;
  color: var(--font-color);
  font-weight: 300;
`;

const NavUserInfo = styled.nav`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const NavUserInfoLink = styled.span`
  font-size: var(--font-sm);
  cursor: pointer;
`;
export {
  LoginWrap,
  LoginHeader,
  LoginTitle,
  LoginText,
  LoginMain,
  LoginBtnBox,
  Span,
  NavUserInfo,
  NavUserInfoLink,
};
