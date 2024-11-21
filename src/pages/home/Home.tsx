// import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../../../public/assets/icons/logo.svg';
import TitiImage from '../../../public/assets/images/character.png';
import { fetchUserData } from '../../api/userApis';
import Carousel from '../../components/Carousel';
import ScoreDonut from '../../components/ScoreDonut';

type StateType = 'initial' | 'overdue' | 'needsAttention' | 'healthy';

const messages: Record<StateType, string> = {
  initial: '안녕하세요!\n지금부터 당신의 구강 관리를 도와줄\n티티입니다!',
  overdue: '구강 검사를 한지 n주가 지났어요! 지금 바로 검사해보세요!',
  needsAttention:
    '현재 구강 상태가 좋지 않아요! 가까운 치과를 방문해보시는 건 어때요?',
  healthy: '훌륭해요! 건강한 상태를 유지하고 있군요! 계속해서 관리해봅시다!',
};

export default function Home() {
  const navigate = useNavigate();
  // const [state, setState] = useState<StateType>('initial');

  const userName = '이포유';
  const score = 25;
  const statusRisk = '매우 위험';
  const totalChecks = 7;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        console.log('Fetched User Data:', userData);
        // You can set the user data to state here if needed
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    getUserData();
  }, []);

  // const handleStateChange = (newState: StateType) => {
  //   setState(newState);
  // };

  return (
    <Container>
      <ContentsContainer>
        <Header>
          <Logo src={LogoImage} alt="E4U 로고" />
          <UserGreeting>
            <UserName>{userName}</UserName>님,
          </UserGreeting>
        </Header>

        <CharacterSection>
          <CharacterImage src={TitiImage} alt="Titi 캐릭터" />
          {/* <CharacterMessage>{messages[state]}</CharacterMessage> */}
          <CharacterMessage>{messages['initial']}</CharacterMessage>
          <ActionButton onClick={() => navigate('/oral-check')}>
            구강 검사 하러가기
          </ActionButton>
        </CharacterSection>

        <Carousel>
          <div>
            <StatusSection>
              <ScoreContainer>
                <ScoreDonut score={score} />
              </ScoreContainer>
              <StatusTextContainer>
                <StatusBox>
                  <StatusBoxLabel>최근 검사 결과</StatusBoxLabel>
                  <StatusRisk>{statusRisk}</StatusRisk>
                </StatusBox>
                <StatusBox>
                  <StatusBoxLabel>총 검사 횟수</StatusBoxLabel>
                  <TotalChecksCount>{totalChecks}회</TotalChecksCount>
                </StatusBox>
              </StatusTextContainer>
            </StatusSection>
          </div>
          <div>Content 2</div>
        </Carousel>
      </ContentsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: calc(7vh);
  margin-bottom: 120px;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 328px;
`;

const Header = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 94.4px;
  height: auto;
`;

const UserGreeting = styled.p`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 17px;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-weight: 700;
`;

const CharacterSection = styled.div`
  height: 340px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #f7f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 18px;
`;

const CharacterImage = styled.img`
  margin-top: 10px;
  width: 136px;
  height: auto;
`;

const CharacterMessage = styled.p`
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 20px;
  white-space: pre-line;
`;

const ActionButton = styled.button`
  display: flex;
  width: 200px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: #fff;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StatusTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  margin-left: 20px;
`;

const StatusBox = styled.div`
  background: #e4e4ea;
  width: 145px;
  height: 59px;
  padding: 10px 15px;
  border-radius: 10px;
`;

const StatusBoxLabel = styled.p`
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 5px;
`;

const StatusRisk = styled.p`
  font-family: Pretendard;
  color: #ff5e5e;
  font-family: 'Pretendard Variable';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;

const TotalChecksCount = styled.p`
  font-family: Pretendard;
  color: #334155;
  font-family: 'Pretendard Variable';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
