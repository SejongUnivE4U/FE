import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../../../public/assets/icons/logo.svg';
import TitiImage from '../../../public/assets/images/character.png';
import ToothImage from '../../../public/assets/images/tooth-img.svg';
import { fetchUserData } from '../../api/userApis';
import Carousel from '../../components/Carousel';
import ScoreDonut from '../../components/ScoreDonut';

type StateType = 'initial' | 'overdue' | 'needsAttention' | 'healthy';

const messages: Record<StateType, string> = {
  initial: '안녕하세요!\n지금부터 당신의 구강 관리를\n도와줄 티티입니다!',
  overdue: '구강 검사를 한지 오래됐어요!\n지금 바로 검사해보세요!',
  needsAttention:
    '현재 구강 상태가 좋지 않아요!\n가까운 치과를 방문해보시는 건 어때요?',
  healthy: '훌륭해요!\n건강한 상태를 유지하고 있군요! 계속해서 관리해봅시다!',
};

const determineStatus = (score: number): string => {
  if (score <= 20) return '매우 위험';
  if (score <= 40) return '위험';
  if (score <= 60) return '보통';
  if (score <= 80) return '좋음';
  return '매우 좋음';
};

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [statusRisk, setStatusRisk] = useState<string>('');
  const [totalChecks, setTotalChecks] = useState<number>(0);
  const [characterState, setCharacterState] = useState<StateType>('initial');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        console.log('Fetched User Data:', userData);

        setUserName(userData.userName);
        setScore(userData.lastDiagnoseScore);
        setTotalChecks(userData.diagnoseNum);

        const riskStatus = determineStatus(userData.lastDiagnoseScore);
        setStatusRisk(riskStatus);

        const lastDiagnoseDate = new Date(userData.lastDiagnoseDate);
        const now = new Date();
        const weeksSinceLastDiagnose = Math.floor(
          (now.getTime() - lastDiagnoseDate.getTime()) /
            (1000 * 60 * 60 * 24 * 7),
        );

        if (userData.diagnoseNum === 0) {
          setCharacterState('initial');
        } else if (weeksSinceLastDiagnose > 4) {
          setCharacterState('overdue');
        } else if (userData.lastDiagnoseScore <= 40) {
          setCharacterState('needsAttention');
        } else {
          setCharacterState('healthy');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    getUserData();
  }, []);

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
          <CharacterMessage>{messages[characterState]}</CharacterMessage>
          <ActionButton onClick={() => navigate('/oral-check')}>
            구강 검사 하러가기
          </ActionButton>
        </CharacterSection>

        <Carousel>
          <div>
            <StatusSection>
              <ScoreContainer>
                {score !== null && <ScoreDonut score={score} />}
              </ScoreContainer>
              <StatusTextContainer>
                <StatusBox>
                  <StatusBoxLabel>최근 검사 결과</StatusBoxLabel>
                  <StatusRisk>
                    {score !== null ? statusRisk : '없음'}
                  </StatusRisk>
                </StatusBox>
                <StatusBox>
                  <StatusBoxLabel>총 검사 횟수</StatusBoxLabel>
                  <TotalChecksCount>{totalChecks}회</TotalChecksCount>
                </StatusBox>
              </StatusTextContainer>
            </StatusSection>
          </div>
          <div>
            <DentalInfoSection>
              <ToothImageStyled src={ToothImage} alt="치아 이미지" />
              <TextAndButtonWrapper>
                <InfoText>
                  치료가 필요하신가요?
                  <br />
                  가까운 치과를 확인해보세요!
                </InfoText>
                <NearbyButton onClick={() => navigate('/map')}>
                  주변 치과 보기
                </NearbyButton>
              </TextAndButtonWrapper>
            </DentalInfoSection>
          </div>
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
  width: 271px;
  word-break: keep-all;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;

const TotalChecksCount = styled.p`
  font-family: Pretendard;
  color: #334155;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;

const DentalInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7fa;
  width: 100%;
  height: 112px;
`;

const ToothImageStyled = styled.img`
  width: 82px;
  height: auto;
`;

const TextAndButtonWrapper = styled.div`
  width: 146px;
  margin-left: 31px;
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 15px;
`;

const NearbyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 146px;
  height: 51px;
  background-color: #334155;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
`;
