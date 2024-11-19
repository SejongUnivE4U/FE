import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreenArrowIcon from '../../../../public/assets/icons/green-arrow-icon.svg';
import BackButton from '../../../components/BackButton';

export default function OralCheckType() {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton to="/oral-check" />
      <Content>
        <CheckOption onClick={() => navigate('/detail-oral-check/front-photo')}>
          <TextContent>
            <Title>정밀 검사</Title>
            <Description>
              구강의 모든 부분을 순차적으로 촬영하여
              <br /> 종합적인 상태를 검사합니다.
            </Description>
          </TextContent>
          <Arrow src={GreenArrowIcon} alt="검사 아이콘" />
        </CheckOption>

        <CheckOption onClick={() => navigate('/oral-check/photo')}>
          <TextContent>
            <Title>빠른 검사</Title>
            <Description>
              현재 불편하거나 문제로 느껴지는 부위만 <br />
              빠르게 촬영하여 검사합니다.
            </Description>
          </TextContent>
          <Arrow src={GreenArrowIcon} alt="검사 아이콘" />
        </CheckOption>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const CheckOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 318px;
  height: 123px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primaryGreen};
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  font-family: Pretendard;
  text-align: left;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const Description = styled.span`
  width: 212px;
  height: 44px;
  flex-shrink: 0;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.Secondary};
  margin-top: 9px;
`;

const Arrow = styled.img`
  width: 22px;
  height: 22px;
`;
