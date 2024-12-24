import styled from 'styled-components';
import BackButton from '../../components/BackButton';
import ChallengeProgressCard from './ChallengeProgressCard';
import DropdownMenu from './DropdownMenu';
import MemberCard from './MemberCard';

export default function Group() {
  const members = [
    {
      id: 1,
      name: '홍길동',
      profileUrl: '/assets/images/profile1.jpg',
      status: '완료',
    },
    {
      id: 2,
      name: '박길동',
      profileUrl: '/assets/images/profile2.jpg',
      status: '미완료',
    },
    {
      id: 3,
      name: '김길동',
      profileUrl: '', // 프로필 없을 경우
      status: '미완료',
    },
  ];

  return (
    <Container>
      <TopBar>
        <BackButton to="/groups" />
      </TopBar>
      <Title>우리가족</Title>

      <MemberList>
        <MemberCard
          rank={1}
          name="홍길동"
          score={98}
          lastChecked="2024.09.24"
          profileImageUrl="https://example.com/profile1.jpg"
        />
        <MemberCard
          rank={2}
          name="박길동"
          score={80}
          lastChecked="2024.09.24"
          profileImageUrl="https://example.com/profile2.jpg"
        />
        <MemberCard
          rank={3}
          name="김길동"
          score={75}
          lastChecked="2024.09.24"
          profileImageUrl={null}
        />
      </MemberList>

      <ChallengeProgressCard
        title="2주 1회 검사 챌린지"
        duration="3달 (24.12.23 ~ 25.2.23)"
        progress={0.65} // 65% 진행
        members={members}
        badgeType="gold"
      />

      <DropdownWrapper>
        <DropdownMenu />
      </DropdownWrapper>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  position: relative;
  height: 100vh;
  padding: 24px;
  background-color: #d9ece6;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 36px;
  color: #4b4b4b;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  right: 25px;
  bottom: 120px;
`;
