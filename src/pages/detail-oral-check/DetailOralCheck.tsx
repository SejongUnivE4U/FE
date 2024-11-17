import styled from 'styled-components';
import ProgressBar from '../../components/ProgressBar';

export default function DetailOralCheck() {
  return (
    <div>
      <Div>
        <ProgressBar
          steps={[
            '입술',
            '혀',
            '입천장',
            '오른쪽 상악',
            '왼쪽 상악',
            '오른쪽 하악',
            '왼쪽하악',
          ]}
          currentStep={0} // 현재 진행중인 스텝의 인덱스
        />
      </Div>
      <Div>
        <ProgressBar
          steps={[
            '입술',
            '혀',
            '입천장',
            '오른쪽 상악',
            '왼쪽 상악',
            '오른쪽 하악',
            '왼쪽하악',
          ]}
          currentStep={1} // 현재 진행중인 스텝의 인덱스
        />
      </Div>
      <Div>
        <ProgressBar
          steps={[
            '입술',
            '혀',
            '입천장',
            '오른쪽 상악',
            '왼쪽 상악',
            '오른쪽 하악',
            '왼쪽하악',
          ]}
          currentStep={2} // 현재 진행중인 스텝의 인덱스
        />
      </Div>
      <Div>
        <ProgressBar
          steps={[
            '입술',
            '혀',
            '입천장',
            '오른쪽 상악',
            '왼쪽 상악',
            '오른쪽 하악',
            '왼쪽하악',
          ]}
          currentStep={3} // 현재 진행중인 스텝의 인덱스
        />
      </Div>
    </div>
  );
}

const Div = styled.div`
  margin-left: 50px;
  margin-top: 100px;
`;
