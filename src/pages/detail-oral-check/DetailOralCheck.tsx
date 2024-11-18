import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import PhotoCaptureOrUpload from './PhotoCaptureOrUpload';

const DetailOralCheck = () => {
  // 부위 목록
  const steps = ['입술', '혀', '입천장'];
  const [currentStep, setCurrentStep] = useState(0);

  // 다음 단계로 진행하는 함수
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 모든 단계 완료 처리 로직 (예: 최종 진단 페이지로 이동)
    }
  };

  // 이전 단계로 돌아가는 함수
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {/* 프로세스 바 컴포넌트 */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* 현재 부위의 검사 화면 */}
      <PhotoCaptureOrUpload
        currentStep={steps[currentStep]}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
      />
    </div>
  );
};

export default DetailOralCheck;
