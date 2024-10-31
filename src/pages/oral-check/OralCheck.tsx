import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OralCheckImage from '../../../public/assets/images/oral-check-img.png';

export default function OralCheck() {
  const navigate = useNavigate();

  return (
    <ContentsContainer>
      <TitleWrapper>
        <Title>구강 검사</Title>
      </TitleWrapper>
      <Description>
        이포유의 구강 검사는 인공지능을 이용한 구강질환 경고 솔루션이에요
        <br />
        정확한 진단 및 치료는 전문의와 상담해 주세요
      </Description>
      <Image src={OralCheckImage} alt="구강 검사 이미지" />
      <ButtonContainer>
        <GuideButton onClick={() => alert('검사 가이드')}>
          검사 가이드
        </GuideButton>
        <StartButton onClick={() => navigate('/oral-check/type')}>
          검사 시작
        </StartButton>
      </ButtonContainer>
    </ContentsContainer>
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 83px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 317px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: #474d66;
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.p`
  width: 317px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 53px;
  text-align: left;
`;

const Image = styled.img`
  width: 255px;
  margin-bottom: 75px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuideButton = styled.button`
  width: 317px;
  height: 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  border-radius: 50px;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  background-color: #767a8c;
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  margin-bottom: 15px;
`;

const StartButton = styled.button`
  width: 317px;
  height: 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  border-radius: 50px;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
`;
