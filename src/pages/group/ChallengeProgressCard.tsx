import React from 'react';
import styled from 'styled-components';
import BronzeBadgeIcon from '../../../public/assets/icons/badge-bronze-icon.svg';
import GoldBadgeIcon from '../../../public/assets/icons/badge-gold-icon.svg';
import SilverBadgeIcon from '../../../public/assets/icons/badge-silver-icon.svg';
// 아이콘 임포트
import ProfileIcon from '../../../public/assets/icons/profile-icon.svg';

// 타입 정의
interface MemberStatus {
  id: number;
  name: string;
  profileUrl?: string;
  status: string; // 멤버 상태
}

interface ChallengeProgressCardProps {
  title: string; // 챌린지 이름
  duration: string; // 챌린지 기간
  progress: number; // 진행률 (0 ~ 1 사이의 소수)
  members: MemberStatus[]; // 멤버 상태 리스트
  badgeType: 'gold' | 'silver' | 'bronze'; // 뱃지 타입
}

// 진행 상태 카드 컴포넌트
const ChallengeProgressCard: React.FC<ChallengeProgressCardProps> = ({
  title,
  duration,
  progress,
  members,
  badgeType,
}) => {
  // 기본 이미지 처리
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ProfileIcon;
  };

  // 뱃지 타입에 따른 아이콘 설정
  const badgeIcon = {
    gold: GoldBadgeIcon,
    silver: SilverBadgeIcon,
    bronze: BronzeBadgeIcon,
  }[badgeType];

  return (
    <CardContainer>
      {/* 헤더 정보 */}
      <Header>
        <Title>{title}</Title>
        <BadgeWrapper>
          <BadgeIcon src={badgeIcon} alt={`${badgeType} badge`} />
          <Duration>{duration}</Duration>
        </BadgeWrapper>
      </Header>

      {/* 진행률 바 */}
      <ProgressBar>
        <ProgressFill $progress={progress} />
      </ProgressBar>

      {/* 멤버 상태 */}
      <MemberSection>
        <WeekLabel>6-8주차</WeekLabel>
        <MemberList>
          {members.map((member) => (
            <MemberItem key={member.id}>
              <ProfileImage
                src={member.profileUrl || ProfileIcon}
                alt={member.name}
                onError={handleImageError}
              />
              <StatusBadge $status={member.status}>
                {member.status === '완료' ? '완료!' : '미완료'}
              </StatusBadge>
              <MemberName>{member.name}</MemberName>
            </MemberItem>
          ))}
        </MemberList>
      </MemberSection>
    </CardContainer>
  );
};

export default ChallengeProgressCard;

// 스타일 정의
const CardContainer = styled.div`
  width: 328px;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #82d2bf, #8dd791);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BadgeIcon = styled.img`
  width: 13px;
  height: 13px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Duration = styled.span`
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  color: #f7f7f7;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 27px;
  border-radius: 50px;
  background: #2e3a4f;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  border-radius: 50px;
  background: linear-gradient(90deg, #fcd34d, #f97316);
  width: ${({ $progress }) => `${$progress * 100}%`};
  transition: width 0.3s ease;
`;

const MemberSection = styled.div`
  margin-top: 10px;
`;

const WeekLabel = styled.h4`
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  color: #ffffff;
  margin-bottom: 19px;
`;

const MemberList = styled.div`
  display: flex;
  gap: 18px;
`;

const MemberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StatusBadge = styled.span<{ $status: string }>`
  position: absolute;
  top: -5px;
  right: -10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 7px;
  font-weight: 600;
  color: #ffffff;
  background: ${({ $status }) => ($status === '완료' ? '#FFDD43' : '#8F95B2')};
`;

const MemberName = styled.span`
  font-size: 12px;
  color: #ffffff;
`;
