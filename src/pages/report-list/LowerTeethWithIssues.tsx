import React, { useState } from 'react';
import styled from 'styled-components';
import CariesIcon from '../../../public/assets/icons/caries-icon.svg';
import LowerTeethImage from '../../../public/assets/images/lower-tooth-img.png';
import { translateDiseaseName } from '../../utils/translateDiseaseName';

interface LowerTeethWithIssuesProps {
  toothDiseases: Record<number, { disease_name: string; conf: number }[]>;
}

const LowerTeethWithIssues: React.FC<LowerTeethWithIssuesProps> = ({
  toothDiseases,
}) => {
  const lowerTeeth = [
    [31, 32, 33, 34, 35, 36, 37, 38],
    [41, 42, 43, 44, 45, 46, 47, 48],
  ];
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  const teethPositions = [
    { left: '54%', top: '89%' }, //31
    { left: '61%', top: '86%' }, //32
    { left: '69%', top: '80%' }, //33
    { left: '76%', top: '73%' }, //34
    { left: '80%', top: '63%' }, //35
    { left: '84%', top: '52%' }, //36
    { left: '85%', top: '38%' }, //37
    { left: '87%', top: '26%' }, //38
    { left: '45%', top: '89%' }, //41
    { left: '38%', top: '86%' }, //42
    { left: '30%', top: '80%' }, //43
    { left: '24%', top: '73%' }, //44
    { left: '20%', top: '63%' }, //45
    { left: '15%', top: '52%' }, //46
    { left: '14%', top: '38%' }, //47
    { left: '13%', top: '26%' }, //48
  ];

  const smallIconTeeth = [31, 32, 41, 42];

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber);

    // 2초 후에 선택된 상태를 초기화
    setTimeout(() => {
      setSelectedTooth(null);
    }, 2000);
  };

  return (
    <Container>
      <GraphTitle>치아별 증상 확인</GraphTitle>
      <TeethImage src={LowerTeethImage} alt="Lower Teeth" />
      {lowerTeeth.flat().map((toothNumber, index) => {
        const diseases = toothDiseases[toothNumber];
        if (!diseases || diseases.length === 0) return null;

        return (
          <CariesIconWrapper
            key={toothNumber}
            style={{
              left: teethPositions[index].left,
              top: teethPositions[index].top,
              width: smallIconTeeth.includes(toothNumber) ? '15px' : '20px',
              height: smallIconTeeth.includes(toothNumber) ? '15px' : '20px',
            }}
            onClick={() => handleToothClick(toothNumber)}
          >
            <CariesIconImage src={CariesIcon} alt="Caries Icon" />
            {selectedTooth === toothNumber && (
              <DiseaseName>
                {diseases
                  .map((d) => translateDiseaseName(d.disease_name))
                  .join(', ')}
              </DiseaseName>
            )}
          </CariesIconWrapper>
        );
      })}
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

const DiseaseName = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(71, 77, 102, 0.8);
  color: white;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 10;
`;

export default LowerTeethWithIssues;
