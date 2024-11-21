import React, { useState } from 'react';
import styled from 'styled-components';
import LipSelectImage from '../../../../public/assets/images/lip-select-img.png';
import PalateSelectImage from '../../../../public/assets/images/palate-select-img.png';
import TongueSelectImage from '../../../../public/assets/images/tongue-select-img.png';

interface OtherSelectorProps {
  onSelectPart: (selectedParts: string[]) => void;
}

const OtherSelector: React.FC<OtherSelectorProps> = ({ onSelectPart }) => {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const handlePartClick = (part: string) => {
    setSelectedParts((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(part);
      const newSelection = isAlreadySelected
        ? prevSelected.filter((item) => item !== part)
        : [...prevSelected, part];
      setTimeout(() => onSelectPart(newSelection), 0);
      return newSelection;
    });
  };

  const options = [
    { label: '입술', img: LipSelectImage },
    { label: '혀', img: TongueSelectImage },
    { label: '입천장', img: PalateSelectImage },
    { label: '직접 입력', img: null },
  ];

  return (
    <Container>
      <OptionsContainer>
        {options.map(({ label, img }) => (
          <OptionButton
            key={label}
            $isSelected={selectedParts.includes(label)}
            onClick={() => handlePartClick(label)}
          >
            {img ? (
              <>
                <RowContainer>
                  <OptionLabel>{label}</OptionLabel>
                  <OptionImage src={img} alt={label} />
                </RowContainer>
              </>
            ) : (
              <CenteredLabel>{label}</CenteredLabel>
            )}
          </OptionButton>
        ))}
      </OptionsContainer>
      <Description>
        현재 <Highlight>불편함</Highlight>이 있는 부분을 선택해주세요.
      </Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 328px;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  width: 157px;
  height: 102px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid
    ${({ $isSelected: isSelected, theme }) =>
      isSelected ? theme.colors.primaryGreen : '#8F95B2'};
  background-color: ${({ $isSelected: isSelected }) =>
    isSelected ? '#DBEDE9' : '#ffffff'};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  transition: background-color 0.3s;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptionImage = styled.img`
  width: 55px;
  height: auto;
  margin-left: 18px;
`;

const OptionLabel = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const CenteredLabel = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Description = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 10px;
`;

const Highlight = styled.span`
  color: #ff5e5e;
`;

export default OtherSelector;
