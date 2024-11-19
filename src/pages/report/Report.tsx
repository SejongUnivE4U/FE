import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../../../public/assets/icons/arrow-right-icon.svg';
import Button from '../../components/Button';
import CloseButton from '../../components/CloseButton';
import ScoreDonut from '../../components/ScoreDonut';

const Report = () => {
  const [reportData, setReportData] = useState({
    name: '이포유',
    score: 25,
    status: '',
    analysisResult:
      '구강 분석 결과 47,48번 치아에 충치가 있는 것으로 보입니다! 또한 42번 치아의 경우 충치가 의심되므로 치과를 방문하여 진료를 받는 것을 권장드립니다. 구강 관리 습관을 개선하여 구강 건강을 향상 시키도록 해야해요',
    detailedAnalysis:
      '말씀하신 어금니가 욱씬거리는 증상은 충치일 가능성이 높습니다. 충치가 발생하는 이유로는 음식물 섭취 이후 제대로 된 양치질을 하지 않아 세균이 배출한 배설물로 인하여 치아가 부식되고 치아의 유기질이 용해되기 때문입니다. 구강 분석 결과 47,48번 치아에 충치가 있는 것으로 보입니다! 또한 42번 치아의 경우 충치가 의심되므로 치과를 방문하여 진료를 받는 것을 권장드립니다. 구강 관리 습관을 개선하여 구강 건강을 향상 시키도록 해야해요',
    treatmentMethods: ['복합 레진', '크라운'],
    managementMethods: [
      '이포유 님은 작은 치아를 가지고 있습니다. 작은 치아의 경우 구강 관리와 소형 치간 칫솔을 사용해...',
      '관리 팁: 작은 치아는 칫솔이 잘 닿지 않는 부분이 많으므로 작은 칫솔을 사용해 치아의 모든 면을 꼼꼼히 닦아주세요.',
    ],
  });

  useEffect(() => {
    const determineStatus = (score: number) => {
      if (score <= 20) return '매우 위험';
      if (score <= 40) return '위험';
      if (score <= 60) return '보통';
      if (score <= 80) return '좋음';
      return '매우 좋음';
    };

    const newStatus = determineStatus(reportData.score);
    setReportData((prevData) => ({
      ...prevData,
      status: newStatus,
    }));
  }, [reportData.score]);

  return (
    <PageContainer>
      <TopBar>
        <CloseButton to="/home" />
      </TopBar>
      <Contents>
        <Title>구강 검사 보고서</Title>
        <ReportContentsBox>
          <ScoreSection>
            <AnalysisText>
              <NameHighlight>{reportData.name}</NameHighlight> 님의 분석 결과
            </AnalysisText>
            <ScoreDonut score={reportData.score} />
            <ScoreText>
              {reportData.score}점으로{' '}
              <StatusHighlight>{reportData.status}</StatusHighlight> 상태입니다.
            </ScoreText>
          </ScoreSection>
          <ImageSection>
            <AnalysisImage
              src="https://i.pinimg.com/564x/76/a8/10/76a8109d4368748a07aa1dc9812b6f56.jpg"
              alt="분석 이미지"
            />
          </ImageSection>
          <Section>
            <SectionTitle>분석 결과</SectionTitle>
            <SectionContent>{reportData.analysisResult}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>세부 분석</SectionTitle>
            <SectionContent>{reportData.detailedAnalysis}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>치료 방법</SectionTitle>
            {reportData.treatmentMethods.map((method, index) => (
              <ListItem
                key={index}
                onClick={() => console.log(`${method} 클릭됨`)}
              >
                <span>{method}</span>
                <Icon src={ArrowIcon} alt="화살표 아이콘" />
              </ListItem>
            ))}
          </Section>
          <Section>
            <SectionTitle>관리 방법</SectionTitle>
            {reportData.managementMethods.map((tip, index) => (
              <SectionContent key={index}>{tip}</SectionContent>
            ))}
          </Section>
        </ReportContentsBox>
        <ButtonContainer>
          <Button onClick={() => console.log('재검사')} variant="primary">
            검사 다시하기
          </Button>
          <Button onClick={() => console.log('젯봇 상담')} variant="outline">
            젯봇 추가 상담
          </Button>
          <Button
            onClick={() => console.log('주변 치과 확인')}
            variant="primary"
          >
            주변 치과 확인
          </Button>
          <Button
            onClick={() => console.log('보고서 목록')}
            variant="secondary"
          >
            보고서 목록
          </Button>
        </ButtonContainer>
      </Contents>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 20px 60px;
  margin-bottom: 200px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 28px;
`;

const ReportContentsBox = styled.div`
  width: 328px;
  border-radius: 15px;
  background: #f7f7fa;
  padding: 25px;
`;

const ScoreSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AnalysisText = styled.p`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #474d66;
  margin-bottom: 20px;
`;

const NameHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primaryGreen};
`;

const ScoreText = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  color: #474d66;
  margin-top: 12px;
`;

const StatusHighlight = styled.span`
  color: #ff5e5e;
  font-weight: bold;
`;

const ImageSection = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;
`;

const AnalysisImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 35px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-family: Pretendard;
  color: #4b4b4b;
  text-align: left;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: 15px;
`;

const SectionContent = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  color: #474d66;
  line-height: 1.5;
`;

const ListItem = styled.button`
  width: 100%;
  height: 58px;
  font-family: Pretendard;
  font-size: 14px;
  color: #474d66;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #8f95b2;
  margin-bottom: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7f7fa;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: auto;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 335px;
  margin-top: 33px;
`;

export default Report;
