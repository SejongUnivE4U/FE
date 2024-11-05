import React from 'react';
import styled from 'styled-components';

interface ScoreDonutProps {
  score: number;
}

const ScoreDonut: React.FC<ScoreDonutProps> = ({ score }) => {
  const radius = 43;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <DonutContainer>
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#334155"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="url(#paint0_linear_1_514)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${circumference - progress}`}
          fill="none"
          transform="rotate(-90 55 55)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_514"
            x1="55"
            y1="0"
            x2="55"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4CBFA4" />
            <stop offset="1" stopColor="#C2EA80" />
          </linearGradient>
        </defs>
      </svg>
      <ScoreText>{score}점</ScoreText>
    </DonutContainer>
  );
};

const DonutContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ScoreText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  background: linear-gradient(90deg, #4cbfa4 0%, #c2ea80 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default ScoreDonut;
