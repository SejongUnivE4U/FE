import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlusIcon from '../../../public/assets/icons/plus-circle-icon.svg';
import { fetchCommunities } from '../../api/communityApis';
import GroupCard from './GroupCard';

interface Group {
  communityId: number;
  communityName: string;
  memberImages: (string | null)[]; // 멤버 이미지 배열
}

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]); // 그룹 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 그룹 데이터 불러오기
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setLoading(true); // 로딩 시작
        const data = await fetchCommunities(); // API 호출
        const formattedData = data.map((item: any) => ({
          communityId: item.communityId,
          communityName: item.communityName,
          memberImages: [null, null, null], // 임시 멤버 이미지
        }));
        setGroups(formattedData); // 데이터 상태 업데이트
      } catch (err) {
        setError('그룹 데이터를 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    loadCommunities();
  }, []);

  const handleAddGroup = () => {
    navigate('/groups/add');
  };

  // 그룹 클릭 시 상세 페이지로 이동
  const handleGroupClick = (communityId: number) => {
    navigate(`/group/${communityId}`);
  };

  if (loading) return <LoadingMessage>불러오는 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PageContainer>
      <Contents>
        <Title>그룹</Title>
        <GroupListContainer>
          {groups.map((group) => (
            <GroupCard
              key={group.communityId}
              groupName={group.communityName}
              memberImages={group.memberImages}
              onClick={() => handleGroupClick(group.communityId)}
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

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #4b4b4b;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #ff4d4f;
  margin-top: 20px;
`;
