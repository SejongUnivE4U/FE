import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import ArrowIcon from '../../../public/assets/icons/arrow-right-icon.svg';
import { fetchDiagnosisReport } from '../../api/reportApis';
import Button from '../../components/Button';
import CloseButton from '../../components/CloseButton';
import ScoreDonut from '../../components/ScoreDonut';

const Report = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();

  const [reportData, setReportData] = useState<{
    userName: string;
    dangerPoint: number;
    status: string;
    analyzedImageUrls: string[];
    result: string;
    detailedResult: string;
    careMethod: string;
    treatmentMethods: string[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const determineStatus = (score: number) => {
      if (score <= 20) return '매우 위험';
      if (score <= 40) return '위험';
      if (score <= 60) return '보통';
      if (score <= 80) return '좋음';
      return '매우 좋음';
    };

    const loadReportData = async () => {
      try {
        if (reportId) {
          const data = await fetchDiagnosisReport(Number(reportId));
          const mappedData = {
            userName: data.userName,
            dangerPoint: data.dangerPoint,
            status: determineStatus(data.dangerPoint),
            analyzedImageUrls: data.analyzedImageUrls,
            result: data.result,
            detailedResult: data.detailed_result,
            careMethod: data.care_method,
            treatmentMethods: ['복합 레진', '크라운'],
          };
          setReportData(mappedData);
        }
      } catch (error) {
        console.error('리포트 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [reportId]);

  if (loading) {
    return <LoadingText>데이터를 불러오는 중...</LoadingText>;
  }

  if (!reportData) {
    return <ErrorText>리포트 데이터를 찾을 수 없습니다.</ErrorText>;
  }

  return (
    <PageContainer>
      <TopBar>
        <CloseButton to="/report-list" />
      </TopBar>
      <Contents>
        <Title>구강 검사 보고서</Title>
        <ReportContentsBox>
          <ScoreSection>
            <AnalysisText>
              <NameHighlight>{reportData.userName}</NameHighlight> 님의 분석
              결과
            </AnalysisText>
            <ScoreDonut score={reportData.dangerPoint} />
            <ScoreText>
              {reportData.dangerPoint}점으로{' '}
              <StatusHighlight>{reportData.status}</StatusHighlight> 상태입니다.
            </ScoreText>
          </ScoreSection>
          <ImageSection>
            {reportData.analyzedImageUrls.map((url, index) => (
              <AnalysisImage
                key={index}
                src={url}
                alt={`분석 이미지 ${index + 1}`}
              />
            ))}
          </ImageSection>
          <Section>
            <SectionTitle>분석 결과</SectionTitle>
            <SectionContent>{reportData.result}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>세부 분석</SectionTitle>
            <SectionContent>{reportData.detailedResult}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>관리 방법</SectionTitle>
            <SectionContent>{reportData.careMethod}</SectionContent>
          </Section>
        </ReportContentsBox>
        <ButtonContainer>
          <Button onClick={() => navigate('/oral-check')} variant="outline">
            검사 다시하기
          </Button>
          <Button onClick={() => navigate('/map')} variant="primary">
            주변 치과 확인
          </Button>
          <Button onClick={() => navigate('/report-list')} variant="secondary">
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
  margin-bottom: 30px;
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
  white-space: pre-line;
`;

// const ListItem = styled.button`
//   width: 100%;
//   height: 58px;
//   font-family: Pretendard;
//   font-size: 14px;
//   color: #474d66;
//   padding: 10px 20px;
//   border-radius: 10px;
//   border: 1px solid #8f95b2;
//   margin-bottom: 14px;
//   background: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #f7f7fa;
//   }
// `;

// const Icon = styled.img`
//   width: 16px;
//   height: auto;
// `;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 335px;
  margin-top: 33px;
`;

const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  color: #c6cada;
`;

const ErrorText = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #ff5e5e;
`;

export default Report;
