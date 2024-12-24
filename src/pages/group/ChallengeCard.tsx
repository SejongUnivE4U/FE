import React from 'react';
import styled from 'styled-components';
import BronzeBadgeIcon from '../../../public/assets/icons/badge-bronze-icon.svg';
import GoldBadgeIcon from '../../../public/assets/icons/badge-gold-icon.svg';
import SilverBadgeIcon from '../../../public/assets/icons/badge-silver-icon.svg';
import CheckIcon from '../../../public/assets/icons/check-square-icon.svg';

// 챌린지 카드 속성 타입
interface ChallengeCardProps {
  title: string; // 챌린지 이름
  durationInMonths: number; // 기간 (개월)
  gradientColors: [string, string]; // 그라데이션 색상
  badgeType: 'gold' | 'silver' | 'bronze'; // 뱃지 타입
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  durationInMonths,
  gradientColors,
  badgeType,
}) => {
  // 현재 날짜 계산
  const today = new Date();
  const startDate = `${today.getFullYear() % 100}.${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + durationInMonths);
  const formattedEndDate = `${endDate.getFullYear() % 100}.${(
    endDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')}`;

  // 뱃지 타입 매핑
  const badgeIcon = {
    gold: GoldBadgeIcon,
    silver: SilverBadgeIcon,
    bronze: BronzeBadgeIcon,
  }[badgeType];

  return (
    <CardContainer $gradientColors={gradientColors}>
      <CheckIconBackground src={CheckIcon} alt="check-icon" />
      <Content>
        <Title>{title}</Title>
        <Details>
          <Badge src={badgeIcon} alt={`${badgeType}-badge`} />
          <Duration>
            {durationInMonths}달 ({startDate} ~ {formattedEndDate})
          </Duration>
        </Details>
      </Content>
    </CardContainer>
  );
};

export default ChallengeCard;

// 스타일 정의
const CardContainer = styled.div<{ $gradientColors: [string, string] }>`
  width: 236px;
  height: 71px;
  border-radius: 15px;
  padding: 16px 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ $gradientColors }) => `${$gradientColors[0]}, ${$gradientColors[1]}`}
  );
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const CheckIconBackground = styled.img`
  position: absolute;
  right: 10px;
  bottom: -10px;
  width: 70px;
  height: 70px;
  opacity: 0.2; /* 투명도 조절 */
  transform: rotate(-20deg); /* 회전 */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.h3`
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  color: #ffffff;
  text-align: left;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.img`
  width: 15px;
  height: 15px;
`;

const Duration = styled.span`
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #ffffff;
`;
