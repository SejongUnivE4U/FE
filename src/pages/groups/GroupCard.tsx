import React from 'react';
import styled from 'styled-components';
import ProfileIcon from '../../../public/assets/icons/profile-icon.svg';

interface GroupCardProps {
  groupName: string;
  memberImages: (string | null)[];
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, memberImages }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = ProfileIcon;
  };

  return (
    <Card>
      <Title>{groupName}</Title>
      <MembersContainer>
        {memberImages.map((img, index) => (
          <MemberAvatar
            key={index}
            src={img || ProfileIcon}
            onError={handleImageError}
            alt="member"
          />
        ))}
      </MembersContainer>
    </Card>
  );
};

const Card = styled.div`
  width: 328px;
  height: 153px;
  border-radius: 12px;
  padding: 22px 30px;
  background: linear-gradient(180deg, #c8eee5 0%, #e9f3dc 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: #4b4b4b;
  margin: 0;
  margin-top: 10px;
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const MemberAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`;

export default GroupCard;
