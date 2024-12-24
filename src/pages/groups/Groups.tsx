import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlusIcon from '../../../public/assets/icons/plus-circle-icon.svg';
import GroupCard from './GroupCard';

export default function Groups() {
  const navigate = useNavigate();

  const groupData = [
    {
      groupName: '우리가족',
      memberImages: [
        'https://example.com/member1.png',
        null,
        'https://example.com/member3.png',
      ],
    },
    {
      groupName: '친구들',
      memberImages: [
        'https://example.com/friend1.png',
        'https://example.com/friend2.png',
        '',
      ],
    },
  ];

  const handleAddGroup = () => {
    navigate('/groups/add');
  };

  return (
    <PageContainer>
      <Contents>
        <Title>그룹</Title>
        <GroupListContainer>
          {groupData.map((group, index) => (
            <GroupCard
              key={index}
              groupName={group.groupName}
              memberImages={group.memberImages}
            />
          ))}
          <AddGroupCard onClick={handleAddGroup}>
            <PlusIconWrapper src={PlusIcon} alt="add group" />
          </AddGroupCard>
        </GroupListContainer>
      </Contents>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: calc(7vh);
`;

const Title = styled.h1`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  color: #4b4b4b;
  margin-bottom: 20px;
`;

const GroupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const AddGroupCard = styled.div`
  width: 328px;
  height: 153px;
  border-radius: 12px;
  background: #e9e9eb;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #dcdcdc;
  }
`;

const PlusIconWrapper = styled.img`
  width: 40px;
  height: 40px;
`;
