import styled from 'styled-components';
import BackButton from '../../components/BackButton';
import DropdownMenu from './DropdownMenu';
import MemberCard from './MemberCard';

export default function Group() {
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
          profileImageUrl={null} // 프로필 사진이 없을 경우
        />
      </MemberList>

      {/* 드롭다운 메뉴 - 오른쪽 아래에 고정 */}
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
`;

const DropdownWrapper = styled.div`
  position: absolute;
  right: 25px;
  bottom: 120px;
`;
