import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      <Subtitle>
        당신을 위한
        <br />
        구강체크 도우미 <br /> -v 11/28 19:12
      </Subtitle>
      <Logo src="/assets/icons/logo.svg" alt="E4U 로고" />
      <ButtonWrapper>
        <Button variant="primary" onClick={() => navigate('/login')}>
          로그인하기
        </Button>
        <Button variant="secondary" onClick={() => navigate('/signup')}>
          회원가입하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100vh;
`;

const Subtitle = styled.h2`
  font-family: Pretendard;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 5.4px;
  margin-bottom: 25px;
`;

const Logo = styled.img`
  width: 162px;
  height: auto;
  margin-bottom: 73px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
