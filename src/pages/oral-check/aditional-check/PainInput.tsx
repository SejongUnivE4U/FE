import React, { useState } from 'react';
import styled from 'styled-components';

interface PainInputProps {
  onPainChange: (painLevel: number) => void;
  onSymptomChange: (symptom: string) => void;
}

export default function PainInput({
  onPainChange,
  onSymptomChange,
}: PainInputProps) {
  const [painLevel, setPainLevel] = useState(0);
  const [symptom, setSymptom] = useState('');

  const handlePainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPainLevel(value);
    onPainChange(value);
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSymptom(value);
    onSymptomChange(value);
  };

  return (
    <Container>
      <Section>
        <Title>통증 정도</Title>
        <SliderContainer>
          <PainLevelDisplay>현재 통증 정도: {painLevel}</PainLevelDisplay>
          <Slider
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={handlePainChange}
          />
          <Labels>
            <Label>0 : 통증 없음</Label>
            <Label>5 : 신경 쓰이는 통증</Label>
            <Label>10 : 못참을 정도의 통증</Label>
          </Labels>
        </SliderContainer>
      </Section>
      <Section>
        <Title>증상 입력</Title>
        <TextArea
          value={symptom}
          onChange={handleSymptomChange}
          placeholder="증상을 입력하세요."
        />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  background: #f7f7fa;
  border-radius: 15px;
  padding: 20px;
  padding-bottom: 0px;
  width: 327px;
  max-width: 100%;
  margin-top: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 10px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PainLevelDisplay = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Slider = styled.input<{ value: number }>`
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
  appearance: none;
  height: 6px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primaryGreen} 0%,
    ${({ theme }) => theme.colors.primaryGreen} ${({ value }) => value * 10}%,
    #e0e0e0 ${({ value }) => value * 10}%,
    #e0e0e0 100%
  );
  outline: none;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.primaryGreen};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  font-family: Pretendard;
  font-size: 12px;
  color: #8f95b2;
  margin-top: 10px;
`;

const Label = styled.span``;

const TextArea = styled.textarea`
  margin-top: 3px;
  width: 100%;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  font-family: Pretendard;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
  resize: none;
  &::placeholder {
    color: #8f95b2;
  }
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.primaryGreen};
  }
`;
