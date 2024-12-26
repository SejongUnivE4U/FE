import styled from 'styled-components';
import BackButton from '../../components/BackButton';
import ChallengeProgressCard from './ChallengeProgressCard';
import DropdownMenu from './DropdownMenu';
import MemberCard from './MemberCard';

export default function Group() {
  const members = [
    {
      id: 1,
      name: '이포유',
      profileUrl: '/assets/images/profile1.jpg',
      status: '완료',
    },
    {
      id: 2,
      name: '박사과',
      profileUrl: '/assets/images/profile2.jpg',
      status: '미완료',
    },
    {
      id: 3,
      name: '김체리',
      profileUrl: '', // 프로필 없을 경우
      status: '미완료',
    },
  ];

  return (
    <Container>
      <TopBar>
        <BackButton to="/groups" />
      </TopBar>
      <TitleContainer>
        <Title>덴티ST</Title>
      </TitleContainer>

      <MemberList>
        <MemberCard
          rank={1}
          name="이포유"
          score={98}
          lastChecked="2024.09.27"
          profileImageUrl="https://example.com/profile1.jpg"
        />
        <MemberCard
          rank={2}
          name="박사과"
          score={80}
          lastChecked="2024.09.24"
          profileImageUrl="https://example.com/profile2.jpg"
        />
        <MemberCard
          rank={3}
          name="김체리"
          score={75}
          lastChecked="2024.09.24"
          profileImageUrl={null}
        />
      </MemberList>

      <ChallengeProgressCard
        title="2주 1회 검사 챌린지"
        duration="3달 (24.11.27 ~ 25.1.27)"
        progress={0.5} // 65% 진행
        members={members}
        badgeType="silver"
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const TitleContainer = styled.div`
  width: 328px;
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
