import Carousel from '../../components/Carousel';
import ReportCard from './ReportCard';

export default function ReportList() {
  return (
    <>
      보고서 리스트 페이지
      <Carousel>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
      </Carousel>
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
    </>
  );
}
