import React from 'react';
import styled from 'styled-components';

interface ReportData {
  diagnosisId: number;
  reportScore: number;
}

interface GraphProps {
  data: ReportData[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const maxScore = 100;

  if (data.length === 0) {
    return (
      <GraphWrapper>
        <NoDataMessage>아직 리포트 데이터가 없습니다.</NoDataMessage>
      </GraphWrapper>
    );
  }

  const displayedData = data.slice(-20);

  return (
    <GraphWrapper>
      <GraphTitle>구강 건강 점수 추이</GraphTitle>
      <GraphContainer>
        {displayedData.map((item) => (
          <BarContainer key={item.diagnosisId}>
            <Bar height={(item.reportScore / maxScore) * 100} />
          </BarContainer>
        ))}
      </GraphContainer>
      {data.length > 20 && (
        <Message>최근 20개의 데이터에 대한 정보만 표시됩니다.</Message>
      )}
    </GraphWrapper>
  );
};

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const GraphTitle = styled.h3`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 7px;
  width: auto;
  max-width: 290px;
`;

const BarContainer = styled.div`
  width: 20px;
  height: 130px;
  background: #334155;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

const Bar = styled.div<{ height: number }>`
  width: 100%;
  background: linear-gradient(#c2ea80 0%, #4cbfa4 100%);
  height: ${({ height }) => height}%;
  transition: height 0.3s ease-in-out;
  border-radius: 10px;
`;

const Message = styled.p`
  font-family: Pretendard;
  font-size: 8px;
  color: #8f95b2;
  text-align: center;
  margin-top: 10px;
`;

const NoDataMessage = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

export default Graph;
