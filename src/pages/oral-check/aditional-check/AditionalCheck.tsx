import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { submitSymptom } from '../../../api/reportApis';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import { clearImagesAtom, imagesAtom } from '../../../state/imageAtoms';
import GumSelector from './GumSelector';
import OptionDropdown from './OptionDropdown';
import OtherSelector from './OtherSelector';
import PainInput from './PainInput';
import ToothSelector from './ToothSelector';

export default function AdditionalCheck() {
  const navigate = useNavigate();
  const options = ['치아', '잇몸', '기타'];
  const [selectedOption, setSelectedOption] = useState('치아');
  const [painLevel, setPainLevel] = useState(0);
  const [symptom, setSymptom] = useState('');
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [selectedGums, setSelectedGums] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageArray] = useAtom(imagesAtom);
  const [, clearImages] = useAtom(clearImagesAtom);

  useEffect(() => {
    setSelectedTeeth([]);
    setSelectedGums([]);
    setSelectedParts([]);
  }, [selectedOption]);

  const handleToothSelect = (teeth: number[]) => {
    setSelectedTeeth(teeth);
  };
  const handleSelectGum = (selectedGum: string[]) => {
    setSelectedGums(selectedGum);
  };
  const handleSelectPart = (parts: string[]) => {
    setSelectedParts(parts);
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      // 데이터 준비
      const symptomArea = [
        ...selectedTeeth.map(String),
        ...selectedGums,
        ...selectedParts,
      ];

      const formData = new FormData();
      formData.append('painLevel', String(painLevel));
      formData.append('symptomText', JSON.stringify([symptom]));
      formData.append('symptomArea', JSON.stringify(symptomArea));

      // 이미지 배열 추가
      imageArray.forEach((image, index) => {
        formData.append('file', image, `image-${index}.png`);
      });

      // API 요청
      const response = await submitSymptom(formData);

      // 결과 출력
      console.log('증상 제출 성공:', response);

      // 이미지 배열 초기화
      clearImages();

      // 결과로 받은 diagnosisId로 이동
      const diagnosisId = response.diagnosisId;
      navigate(`/report/${diagnosisId}`);
    } catch (error) {
      console.error('증상 제출 실패:', error);
      clearImages();
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case '치아':
        return (
          <ContentContainer>
            <ToothSelector onSelectTooth={handleToothSelect} />
          </ContentContainer>
        );
      case '잇몸':
        return (
          <ContentContainer>
            <GumSelector onSelectGum={handleSelectGum} />
          </ContentContainer>
        );
      case '기타':
        return (
          <ContentContainer>
            <OtherSelector onSelectPart={handleSelectPart} />
          </ContentContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingText>
        결과를 처리 중입니다.
        <br />
        잠시만 기다려 주세요.
      </LoadingText>
    );
  }

  return (
    <PageContainer>
      <TopBar>
        <BackButton to="/oral-check/photo" />
      </TopBar>
      <Contents>
        <Title>추가 진단</Title>
        <OptionDropdown
          options={options}
          defaultValue="치아"
          onSelect={setSelectedOption}
          placeholder="옵션을 선택하세요"
        />
        {renderContent()}
        <PainInput
          onPainChange={(value) => setPainLevel(value)}
          onSymptomChange={(value) => setSymptom(value)}
        />
        <ButtonContainer>
          <Button onClick={handleComplete} variant="primary">
            완료
          </Button>
        </ButtonContainer>
      </Contents>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
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

const ContentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
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
  line-height: 25px;
`;
