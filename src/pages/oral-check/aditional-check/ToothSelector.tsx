import React, { useState } from 'react';
import styled from 'styled-components';
import ToothSelectImage from '../../../../public/assets/images/tooth-select-img.png';

interface ToothSelectorProps {
  onSelectTooth: (selectedTeeth: number[]) => void;
}

export default function ToothSelector({ onSelectTooth }: ToothSelectorProps) {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);

  const handleToothClick = (toothNumber: number) => {
    setSelectedTeeth((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(toothNumber);
      const newSelection = isAlreadySelected
        ? prevSelected.filter((num) => num !== toothNumber)
        : [...prevSelected, toothNumber];
      onSelectTooth(newSelection);
      return newSelection;
    });
  };

  const upperTeeth = [
    [11, 12, 13, 14, 15, 16, 17, 18],
    [21, 22, 23, 24, 25, 26, 27, 28],
  ];
  const lowerTeeth = [
    [31, 32, 33, 34, 35, 36, 37, 38],
    [41, 42, 43, 44, 45, 46, 47, 48],
  ];

  return (
    <Container>
      <ImageContainer>
        <ToothImage src={ToothSelectImage} alt="치아 이미지" />
      </ImageContainer>
      <Description>
        현재 <Highlight>불편함</Highlight>이 있는 치아를 골라주세요.
      </Description>
      <TeethSection>
        <TeethLabel>상악</TeethLabel>
        {upperTeeth.map((row, rowIndex) => (
          <TeethRow key={`upper-${rowIndex}`}>
            {row.map((num) => (
              <ToothButton
                key={num}
                $isSelected={selectedTeeth.includes(num)}
                onClick={() => handleToothClick(num)}
              >
                {num}
              </ToothButton>
            ))}
          </TeethRow>
        ))}
      </TeethSection>
      <TeethSection>
        <TeethLabel>하악</TeethLabel>
        {lowerTeeth.map((row, rowIndex) => (
          <TeethRow key={`lower-${rowIndex}`}>
            {row.map((num) => (
              <ToothButton
                key={num}
                $isSelected={selectedTeeth.includes(num)}
                onClick={() => handleToothClick(num)}
              >
                {num}
              </ToothButton>
            ))}
          </TeethRow>
        ))}
      </TeethSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 328px;
`;

const ImageContainer = styled.div`
  margin-bottom: 10px;
`;

const ToothImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const Description = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
  margin: 10px 0 22px;
`;

const Highlight = styled.span`
  color: #ff5e5e;
`;

const TeethSection = styled.div`
  margin-bottom: 14px;
  width: 100%;
`;

const TeethRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

const TeethLabel = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: bold;
  color: #8f95b2;
  background-color: #f7f7fa;
  border: 1px solid #8f95b2;
  border-radius: 15px;
  padding: 5px 15px;
  text-align: center;
  margin-bottom: 10px;
  width: 328px;
  align-self: center;
`;

const ToothButton = styled.button<{ $isSelected: boolean }>`
  width: 35px;
  height: 35px;
  margin-right: 7px;
  border-radius: 10px;
  border: 1px solid
    ${({ $isSelected: isSelected, theme }) =>
      isSelected ? theme.colors.primaryGreen : '#8F95B2'};
  background-color: ${({ $isSelected: isSelected, theme }) =>
    isSelected ? '#DBEDE9' : '#ffffff'};
  color: ${({ $isSelected: isSelected, theme }) =>
    isSelected ? theme.colors.primaryGreen : '#8F95B2'};
  cursor: pointer;
  font-family: Pretendard;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-right: 0;
  }
`;
