import React from 'react';
import styled from 'styled-components';
import CariesIcon from '../../../public/assets/icons/caries-icon.svg';
import LowerTeethImage from '../../../public/assets/images/upper-tooth-img.png';

interface UpperTeethWithIssuesProps {
  problemTeeth: number[];
}

const UpperTeethWithIssues: React.FC<UpperTeethWithIssuesProps> = ({
  problemTeeth,
}) => {
  const lowerTeeth = [
    [11, 12, 13, 14, 15, 16, 17, 18],
    [21, 22, 23, 24, 25, 26, 27, 28],
  ];

  const teethPositions = [
    { left: '55%', top: '19%' }, //21
    { left: '64%', top: '22%' }, //22
    { left: '73%', top: '29%' }, //23
    { left: '77%', top: '38%' }, //24
    { left: '81%', top: '49%' }, //25
    { left: '84%', top: '60%' }, //26
    { left: '87%', top: '74%' }, //27
    { left: '87%', top: '86%' }, //28

    { left: '44%', top: '19%' }, //11
    { left: '34%', top: '22%' }, //12
    { left: '26%', top: '29%' }, //13
    { left: '21%', top: '38%' }, //14
    { left: '18%', top: '49%' }, //15
    { left: '15%', top: '60%' }, //16
    { left: '12%', top: '74%' }, //17
    { left: '11%', top: '86%' }, //18
  ];

  const smallIconTeeth = [21, 22, 23, 11, 12, 13];

  return (
    <Container>
      <GraphTitle>치아별 증상 확인</GraphTitle>
      <TeethImage src={LowerTeethImage} alt="Lower Teeth" />
      {lowerTeeth.flat().map((toothNumber, index) => (
        <CariesIconWrapper
          key={toothNumber}
          style={{
            left: teethPositions[index].left,
            top: teethPositions[index].top,
            display: problemTeeth.includes(toothNumber) ? 'block' : 'none',
            width: smallIconTeeth.includes(toothNumber) ? '15px' : '20px',
            height: smallIconTeeth.includes(toothNumber) ? '15px' : '20px',
          }}
        >
          <CariesIconImage src={CariesIcon} alt="Caries Icon" />
        </CariesIconWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 190px;
  height: auto;
`;

const GraphTitle = styled.h3`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 12px;
  margin-bottom: 0px;
`;

const TeethImage = styled.img`
  width: 100%;
  height: auto;
`;

const CariesIconWrapper = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
`;

const CariesIconImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default UpperTeethWithIssues;
