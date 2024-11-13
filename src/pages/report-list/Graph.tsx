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
  const displayedData = data.slice(-20);

  return (
    <GraphWrapper>
      <GraphTitle>구강 건강 점수 추이</GraphTitle>
      <GraphContainer>
        {displayedData.map((item) => (
          <BarContainer key={item.diagnosisId}>
            <Bar
              height={(item.reportScore / maxScore) * 100}
              isCritical={item.reportScore <= 40}
            />
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
  justify-content: flex-start; /* 아이템이 붙어 있게 정렬 */
  gap: 7px;
  width: auto; /* 필요시 너비 자동 조정 */
  max-width: 290px; /* 최대 너비 제한 */
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

const Bar = styled.div<{ height: number; isCritical: boolean }>`
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

export default Graph;
