import styled from 'styled-components';

interface Props {
  tabType: { playlist: boolean; music: boolean };
  setTabType: React.Dispatch<
    React.SetStateAction<{
      playlist: boolean;
      music: boolean;
    }>
  >;
}

export default function TypeTabButton({ tabType, setTabType }: Props) {
  return (
    <TabButtonBox>
      <TabButton
        type='button'
        name='playlist'
        onClick={() => setTabType({ ...tabType, playlist: !tabType.playlist })}
        active={tabType.playlist}
      >
        플리
      </TabButton>
      <TabButton
        type='button'
        name='music'
        onClick={() => setTabType({ ...tabType, music: !tabType.music })}
        active={tabType.music}
      >
        노래
      </TabButton>
    </TabButtonBox>
  );
}

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
