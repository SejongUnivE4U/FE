import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../public/assets/icons/check-icon.svg';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <Container>
      {steps.map((step, index) => (
        <StepContainer key={index}>
          <StepCircle
            $isCompleted={index < currentStep}
            $isActive={index === currentStep}
          >
            {index < currentStep ? <Check src={CheckIcon} alt="완료" /> : null}
          </StepCircle>
          {index === currentStep && (
            <SpeechBubble>
              <BubbleText>{step}</BubbleText>
            </SpeechBubble>
          )}
          {index < steps.length - 1 && (
            <StepLine
              $isCompleted={index < currentStep}
              $stepsLength={steps.length}
            />
          )}
        </StepContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 327px;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StepCircle = styled.div<{ $isCompleted: boolean; $isActive: boolean }>`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${({
    $isCompleted: isCompleted,
    $isActive: isActive,
    theme,
  }) => (isCompleted || isActive ? theme.colors.primaryGreen : '#D3D3D3')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${({ $isActive: isActive, theme }) =>
    isActive &&
    `
    border: 2px solid ${theme.colors.primaryGreen};
  `}
`;

const Check = styled.img`
  width: 12px;
  height: 12px;
`;

const SpeechBubble = styled.div`
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -30px;
  left: 11%;
  transform: translateX(-50%);
  background-color: #e0f7e0;
  padding: 4px 8px;
  border-radius: 8px;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #e0f7e0;
  }
`;

const BubbleText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #474d66;
  white-space: nowrap;
`;

const StepLine = styled.div<{ $isCompleted: boolean; $stepsLength: number }>`
  width: ${({ $stepsLength: stepsLength }) =>
    `calc((327px - 27px * ${stepsLength}) / (${stepsLength} - 1))`};
  height: 4px;
  background-color: ${({ $isCompleted: isCompleted, theme }) =>
    isCompleted ? theme.colors.primaryGreen : '#D3D3D3'};
  margin: 0;
  flex-shrink: 0;
`;

export default ProgressBar;
