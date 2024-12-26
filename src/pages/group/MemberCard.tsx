import React from 'react';
import styled from 'styled-components';
import ProfileIcon from '../../../public/assets/icons/profile-icon.svg';

interface MemberCardProps {
  rank: number;
  name: string;
  score: number;
  lastChecked: string;
  profileImageUrl?: string | null;
}

const rankColors = [
  '#FF4D4F', // 1위
  '#FA8C16', // 2위
  '#52C41A', // 3위
  '#1890FF', // 4위
  '#722ED1', // 5위
  '#EB2F96', // 6위
  '#13C2C2', // 7위
  '#2F54EB', // 8위
  '#FA541C', // 9위
  '#A0D911', // 10위
];

const MemberCard: React.FC<MemberCardProps> = ({
  rank,
  name,
  score,
  lastChecked,
  profileImageUrl,
}) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ProfileIcon;
  };

  return (
    <CardContainer>
      <ProfileImage
        src={profileImageUrl || ProfileIcon}
        alt="profile"
        onError={handleImageError}
      />
      <Content>
        <LeftContents>
          <TopRow>
            <Rank style={{ color: rankColors[rank - 1] || '#333' }}>
              {rank}위
            </Rank>
            <Name>{name}</Name>
          </TopRow>
          <BottomRow>마지막 검사: {lastChecked}</BottomRow>
        </LeftContents>
        <Score>{score}점</Score>
      </Content>
    </CardContainer>
  );
};

export default MemberCard;

const CardContainer = styled.div`
  width: 328px;
  height: 65px;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.08);
`;

const ProfileImage = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Rank = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Name = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  color: #4b4b4b;
`;

const Score = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  color: #4b4b4b;
  margin: auto;
  margin-right: 0px;
`;

const BottomRow = styled.div`
  font-size: 12px;
  color: #b0b0b0;
  margin-top: 8px;
`;
