import React, { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import GumSelector from './GumSelector';
import OptionDropdown from './OptionDropdown';
import OtherSelector from './OtherSelector';
import PainInput from './PainInput';
import ToothSelector from './ToothSelector';

export default function AdditionalCheck() {
  const options = ['치아', '잇몸', '기타'];
  const [selectedOption, setSelectedOption] = useState('치아');
  const [painLevel, setPainLevel] = useState(0);
  const [symptom, setSymptom] = useState('');
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [selectedGums, setSelectedGums] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const handleToothSelect = (teeth: number[]) => {
    setSelectedTeeth(teeth);
  };
  const handleSelectGum = (selectedGum: string[]) => {
    setSelectedGums(selectedGum);
  };
  const handleSelectPart = (parts: string[]) => {
    setSelectedParts(parts);
  };

  const handleComplete = () => {
    // Logic to handle completion (to be added later)
  };

  const handleSkip = () => {
    // Logic to handle skip (navigate to next page)
  };

  const renderContent = () => {
    switch (selectedOption) {
      case '치아':
        return (
          <ContentContainer>
            <ToothSelector onSelectTooth={handleToothSelect} />
          </ContentContainer>
        );
      case '잇몸':
        return (
          <ContentContainer>
            <GumSelector onSelectGum={handleSelectGum} />
          </ContentContainer>
        );
      case '기타':
        return (
          <ContentContainer>
            <OtherSelector onSelectPart={handleSelectPart} />
          </ContentContainer>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <TopBar>
        <BackButton to="/oral-check/photo" />
      </TopBar>
      <Contents>
        <Title>추가 진단</Title>
        <OptionDropdown
          options={options}
          defaultValue="치아"
          onSelect={setSelectedOption}
          placeholder="옵션을 선택하세요"
        />
        {renderContent()}
        <PainInput
          onPainChange={(value) => setPainLevel(value)}
          onSymptomChange={(value) => setSymptom(value)}
        />
        <ButtonContainer>
          <Button onClick={handleComplete} variant="primary">
            완료
          </Button>
          <Button onClick={handleSkip} variant="outline">
            건너띄기
          </Button>
        </ButtonContainer>
      </Contents>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 28px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
`;
