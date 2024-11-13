import React from 'react';
import styled from 'styled-components';

interface ReportCardProps {
  diagnosisId: number;
  images: Record<string, string>;
  diagnoseDate: string;
  reportScore: number;
  diagnoseCondition: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  images,
  diagnoseDate,
  reportScore,
  diagnoseCondition,
}) => {
  const imageSrc = Object.values(images)[0];

  const formattedDate = new Date(diagnoseDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const determineStatus = (score: number) => {
    if (score <= 20) return { status: '매우 위험', color: '#ff5e5e' };
    if (score <= 40) return { status: '위험', color: '#ff9f43' };
    if (score <= 60) return { status: '보통', color: '#32a852' };
    return { status: '좋음', color: '#4a90e2' };
  };

  const { status, color } = determineStatus(reportScore);

  return (
    <CardContainer>
      <Image src={imageSrc} alt="진단 이미지" />
      <InfoContainer>
        <Condition>{diagnoseCondition}</Condition>
        <DateText>{formattedDate}</DateText>
      </InfoContainer>
      <ScoreContainer>
        <ScoreText>{reportScore}점</ScoreText>
        <StatusText style={{ color }}>{status}</StatusText>
      </ScoreContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 328px;
  height: 76px;
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
`;

const Image = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 18px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Condition = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const DateText = styled.p`
  font-family: Pretendard;
  color: #8f95b2;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  margin: 6px 0 0 0;
`;

const ScoreContainer = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreText = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-right: 10px;
`;

const StatusText = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
`;

export default ReportCard;
