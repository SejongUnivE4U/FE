import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckIcon from '../../../public/assets/icons/check-circle-white.svg';
import XIcon from '../../../public/assets/icons/x-icon.svg';
import ChallengeCard from './ChallengeCard';

interface ChallengeAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChallenge: (challengeId: number) => void; // 챌린지 시작 API 콜백
}

interface Challenge {
  id: number;
  title: string;
  durationInMonths: number;
  gradientColors: [string, string];
  badgeType: 'gold' | 'silver' | 'bronze';
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: '1주 1회 검사 챌린지',
    durationInMonths: 3,
    gradientColors: ['#6EE7B7', '#3B82F6'],
    badgeType: 'gold',
  },
  {
    id: 2,
    title: '2주 1회 검사 챌린지',
    durationInMonths: 3,
    gradientColors: ['#82D2BF', '#8DD791'],
    badgeType: 'silver',
  },
  {
    id: 3,
    title: '4주 1회 검사 챌린지',
    durationInMonths: 3,
    gradientColors: ['#FFB8E0', '#C2EA80'],
    badgeType: 'bronze',
  },
];

const ChallengeAddModal: React.FC<ChallengeAddModalProps> = ({
  isOpen,
  onClose,
  onStartChallenge,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(
    null,
  );

  // 모달이 닫힐 때 선택값 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedChallenge(null);
    }
  }, [isOpen]);

  const handleSelect = (id: number) => {
    setSelectedChallenge(id);
  };

  // 챌린지 시작
  const handleStart = () => {
    if (selectedChallenge !== null) {
      onStartChallenge(selectedChallenge); // API 호출
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={XIcon} alt="close" />
        </CloseButton>
        <Title>챌린지 추가</Title>
        <Description>함께 도전할 목표를 설정하세요!</Description>

        <ChallengeList>
          {challenges.map((challenge) => (
            <ChallengeItem
              key={challenge.id}
              onClick={() => handleSelect(challenge.id)}
            >
              <ChallengeCard
                title={challenge.title}
                durationInMonths={challenge.durationInMonths}
                gradientColors={challenge.gradientColors}
                badgeType={challenge.badgeType}
              />
              {challenge.id === selectedChallenge && (
                <CheckIconOverlay src={CheckIcon} alt="selected" />
              )}
            </ChallengeItem>
          ))}
        </ChallengeList>

        <ButtonWrapper>
          <StartButton
            disabled={selectedChallenge === null}
            onClick={handleStart}
          >
            챌린지 시작하기
          </StartButton>
        </ButtonWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default ChallengeAddModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 290px;
  padding: 22px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #4b4b4b;
  margin-bottom: 13px;
  margin-top: 30px;
`;

const Description = styled.p`
  font-size: 13px;
  color: #8f95b2;
  margin-bottom: 20px;
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const ChallengeItem = styled.div`
  position: relative;
  cursor: pointer;
`;

const CheckIconOverlay = styled.img`
  position: absolute;
  top: 22px;
  right: 30px;
  width: 24px;
  height: 24px;
`;

const ButtonWrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`;

const StartButton = styled.button`
  width: 236px;
  height: 38px;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? '#C6CADA' : '#4CBFA4')};
  color: ${({ disabled }) => (disabled ? '#F7F7FA' : '#FFFFFF')};
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 20px;
`;
