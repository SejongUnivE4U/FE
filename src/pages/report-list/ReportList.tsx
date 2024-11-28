import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAllDiagnosisReports } from '../../api/reportApis';
import Carousel from '../../components/Carousel';
import Graph from './Graph';
import LowerTeethWithIssues from './LowerTeethWithIssues';
import ReportCard from './ReportCard';
import UpperTeethWithIssues from './UpperTeethWithIssues';

export default function ReportList() {
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const problemTeeth = [11, 12, 13, 25, 28, 35, 37, 52];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchAllDiagnosisReports();

        if (apiData.length > 0) {
          // 첫 번째 데이터에서 userName 추출
          setUserName(apiData[0].userName);
        }

        // 데이터를 최신순으로 유지하되, diagnosisId는 오래된 데이터부터 0으로 설정
        const mappedData = apiData.map(
          (item: any, index: number, arr: any[]) => ({
            diagnosisId: arr.length - 1 - index, // 오래된 데이터가 0부터 증가
            idx: index, // 화면 상에서는 최신 데이터가 위로
            images: {
              '1': item.analyzedImageUrls[0] || '', // 첫 번째 이미지만 사용
            },
            diagnoseDate: item.diagnoseDate,
            reportScore: item.dangerPoint,
            diagnoseCondition: '', // 빈 값
          }),
        );

        setReportData(mappedData);
      } catch (error) {
        console.error('리포트 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 로딩 완료
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
            <LowerTeethWithIssues problemTeeth={problemTeeth} />
          </div>
          <div>
            <UpperTeethWithIssues problemTeeth={problemTeeth} />
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
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #666;
`;

const NoReportText = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #999;
`;
