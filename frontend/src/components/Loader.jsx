import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="z z-1">Z</div>
        <div className="z z-2">Z</div>
        <div className="z z-3">Z</div>
        <div className="z z-4">Z</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 150px;
  width: 100%;
  margin: 20px 0;

  position: relative;

  .z {
    position: absolute;
    font-size: 32px;
    opacity: 0;
  }
  .z-1 {
    animation: swayUpToRight 2s ease-out infinite;
  }
  .z-2 {
    animation: swayUpToRight 2s ease-out 0.5s infinite;
  }
  .z-3 {
    animation: swayUpToRight 2s ease-out 1s infinite;
  }
  .z-4 {
    animation: swayUpToRight 2s ease-out 1.5s infinite;
  }
  @keyframes swayUpToRight {
    0% {
      transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      /* Буквы улетают вверх и вправо относительно центра */
      transform: translate(40px, -80px) scale(1.2) rotate(30deg);
      opacity: 0;
    }
  }
`;

export default Loader;
