import styled from 'styled-components';
import Carousel from '../../components/Carousel';
import Graph from './Graph';
import LowerTeethWithIssues from './LowerTeethWithIssues';
import ReportCard from './ReportCard';
import UpperTeethWithIssues from './UpperTeethWithIssues';

export default function ReportList() {
  const data = [
    { diagnosisId: 1, reportScore: 30 },
    { diagnosisId: 2, reportScore: 20 },
    { diagnosisId: 3, reportScore: 60 },
    { diagnosisId: 4, reportScore: 20 },
    { diagnosisId: 5, reportScore: 50 },
    { diagnosisId: 6, reportScore: 90 },
    { diagnosisId: 7, reportScore: 30 },
    { diagnosisId: 8, reportScore: 20 },
    { diagnosisId: 9, reportScore: 60 },
    { diagnosisId: 10, reportScore: 20 },
  ];

  // const [problemTeeth, setProblemTeeth] = useState<number[]>([
  //   // 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
  //   // 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  //   11,
  //   12, 13, 25, 28, 35, 37, 52,
  // ]);
  const problemTeeth = [
    // 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    // 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
    11,
    12, 13, 25, 28, 35, 37, 52,
  ];

  return (
    <Container>
      <Contents>
        <TitleWrapper>
          <UserName>이포유</UserName>
          <Title>님의 구강 리포트입니다.</Title>
        </TitleWrapper>
        <Carousel>
          <div>
            <Graph data={data} />
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
        <ReportCard
          diagnosisId={1}
          images={{
            '1': 'https://i.pinimg.com/736x/ae/87/22/ae87226f90a278003f901a61955eea0f.jpg',
            '2': 'https://i.pinimg.com/736x/1d/59/02/1d5902a3c97b4638fe06dc2243ed6b9e.jpg',
          }}
          diagnoseDate="2024-10-26T08:31:28.000+00:00"
          reportScore={10}
          diagnoseCondition="충치,치주염"
        />
        <ReportCard
          diagnosisId={1}
          images={{
            '1': 'https://i.pinimg.com/736x/ae/87/22/ae87226f90a278003f901a61955eea0f.jpg',
            '2': 'https://i.pinimg.com/736x/1d/59/02/1d5902a3c97b4638fe06dc2243ed6b9e.jpg',
          }}
          diagnoseDate="2024-10-26T08:31:28.000+00:00"
          reportScore={30}
          diagnoseCondition="충치,치주염"
        />
        <ReportCard
          diagnosisId={1}
          images={{
            '1': 'https://i.pinimg.com/736x/ae/87/22/ae87226f90a278003f901a61955eea0f.jpg',
            '2': 'https://i.pinimg.com/736x/1d/59/02/1d5902a3c97b4638fe06dc2243ed6b9e.jpg',
          }}
          diagnoseDate="2024-10-26T08:31:28.000+00:00"
          reportScore={60}
          diagnoseCondition="충치,치주염"
        />
        <ReportCard
          diagnosisId={1}
          images={{
            '1': 'https://i.pinimg.com/736x/ae/87/22/ae87226f90a278003f901a61955eea0f.jpg',
            '2': 'https://i.pinimg.com/736x/1d/59/02/1d5902a3c97b4638fe06dc2243ed6b9e.jpg',
          }}
          diagnoseDate="2024-10-26T08:31:28.000+00:00"
          reportScore={80}
          diagnoseCondition="충치,치주염"
        />
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
