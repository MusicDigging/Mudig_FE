import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
export default function InfoBox({ children }: Props) {
  return <InfoBoxWrap>{children}</InfoBoxWrap>;
}

const InfoBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 47px 16px 0;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;
