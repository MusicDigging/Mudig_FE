import React from 'react';
import styled from 'styled-components';

export default function Gradation() {
  return (
    <GradationWrap>
      <PinkGradation></PinkGradation>
      <PurpleGradation></PurpleGradation>
      <SkyGradation></SkyGradation>
    </GradationWrap>
  );
}
const GradationWrap = styled.div`
  width: 360px;
  height: 100%;
  position: relative;
  z-index: 0;
`;
const PinkGradation = styled.span`
  width: 573px;
  height: 573px;
  position: absolute;
  border-radius: 573px;
  background: radial-gradient(
    circle,
    rgba(255, 201, 218, 0.5) 0%,
    rgba(252, 207, 221, 0.2) 40%,
    rgba(252, 207, 221, 0) 70%,
    rgba(252, 207, 221, 0) 100%
  );
  left: -158px;
  top: -300px;
  z-index: -1;
`;
const PurpleGradation = styled.span`
  width: 761px;
  height: 761px;
  position: absolute;
  border-radius: 761px;
  background: radial-gradient(
    circle,
    rgba(222, 119, 217, 0.5) 0%,
    rgba(222, 119, 217, 0.2) 40%,
    rgba(229, 203, 246, 0) 70%,
    rgba(229, 203, 246, 0) 90%,
    rgba(229, 203, 246, 0) 100%
  );
  left: 35px;
  top: -110px;
  z-index: -1;
`;
const SkyGradation = styled.span`
  width: 672px;
  height: 672px;
  position: absolute;
  border-radius: 672px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #8ceaff -10%,
    rgba(252, 207, 221, 0) 80.21%
  );
  left: -201px;
  top: 247px;
  z-index: -1;
`;
