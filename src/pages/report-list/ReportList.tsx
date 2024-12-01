import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  fetchAllDiagnosisReports,
  fetchToothDiseases,
} from '../../api/reportApis';
import Carousel from '../../components/Carousel';
import Graph from './Graph';
import LowerTeethWithIssues from './LowerTeethWithIssues';
import ReportCard from './ReportCard';
import UpperTeethWithIssues from './UpperTeethWithIssues';

export default function ReportList() {
  const [reportData, setReportData] = useState<any[]>([]);
  const [toothDiseases, setToothDiseases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchAllDiagnosisReports();

        if (apiData.length > 0) {
          // 첫 번째 데이터에서 userName 추출
          setUserName(apiData[0].userName);
        }

        const mappedData = apiData.map(
          (item: any, index: number, arr: any[]) => ({
            diagnosisId: arr.length - index,
            idx: index,
            images: {
              '1': item.analyzedImageUrls[0] || '',
            },
            diagnoseDate: item.diagnoseDate,
            reportScore: item.dangerPoint,
            diagnoseCondition: item.detectedDiseases.join(', '),
          }),
        );

        setReportData(mappedData);

        const diseasesData = await fetchToothDiseases();
        setToothDiseases(diseasesData);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingText>데이터를 불러오는 중입니다...</LoadingText>;
  }

  return (
    <Container>
      <Contents>
        <TitleWrapper>
          <UserName>{userName}</UserName>
          <Title>님의 구강 리포트입니다.</Title>
        </TitleWrapper>
        <Carousel>
          <div>
            <Graph data={reportData} />
          </div>
          <div>
            <LowerTeethWithIssues toothDiseases={toothDiseases} />
          </div>
          <div>
            <UpperTeethWithIssues toothDiseases={toothDiseases} />
          </div>
        </Carousel>
        <ReportTitleWrapper>
          <ReportTitle>전체 보고서</ReportTitle>
        </ReportTitleWrapper>
        {reportData.length === 0 ? (
          <NoReportText>아직 리포트 데이터가 없습니다.</NoReportText>
        ) : (
          reportData.map((report) => (
            <ReportCard
              key={report.diagnosisId}
              diagnosisId={report.diagnosisId}
              images={report.images}
              diagnoseDate={report.diagnoseDate}
              reportScore={report.reportScore}
              diagnoseCondition={report.diagnoseCondition}
            />
          ))
        )}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: calc(7vh);
  margin-bottom: 130px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  justify-content: left;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 20px;
`;

const UserName = styled.p`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;

const ReportTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  justify-content: left;
  margin: 27px 0 20px;
`;

const ReportTitle = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
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

const NoReportText = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #999;
`;
