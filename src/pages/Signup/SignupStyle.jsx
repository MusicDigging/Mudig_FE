import styled from 'styled-components';

const SignupWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SignupHeader = styled.header`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  left: 16px;
  line-height: 33px;
`;

const SignupTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const SignupText = styled.span`
  color: var(--sub-font--color);
  font-size: var(--font-md);
  line-height: 33px;
`;

const SignupMain = styled.main`
  margin: 0 auto;
  width: 328px;
  position: absolute;
  top: 287px;
  text-align: center;
  left: 16px;
  right: 16px;
`;

const SignupBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`;

const Span = styled.span`
  position: relative;
  display: block;
  margin-bottom: 24px;
  color: var(--font-color);
`;

const NavLoign = styled.nav`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const NavSpan = styled.nav`
  font-size: var(--font-sm);
  color: var(--sub-font--color);
  padding-right: 4px;
  line-height: 17px;
`;

const LinkLogin = styled.span`
  font-size: var(--font-sm);
  color: var(--font-color);
  cursor: pointer;
  border-bottom: 1px solid var(--font-color);
  line-height: 17px;
`;

const Footer = styled.footer`
  position: absolute;
  top: 742px;
  display: flex;
  left: 16px;
  right: 16px;
  justify-content: center;
  text-align: center;
`;

export {
  SignupWrap,
  SignupHeader,
  SignupTitle,
  SignupText,
  SignupMain,
  SignupBtnBox,
  Span,
  NavLoign,
  NavSpan,
  LinkLogin,
  Footer,
};
