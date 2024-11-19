import React, { useState } from 'react';
import styled from 'styled-components';
import CameraIcon from '../../../public/assets/icons/camera-icon.svg';
import GalleryIcon from '../../../public/assets/icons/gallery-icon.svg';

interface PhotoCaptureOrUploadProps {
  currentStep: string;
  onNext: () => void;
  onPrevious: () => void;
}

const PhotoCaptureOrUpload: React.FC<PhotoCaptureOrUploadProps> = ({
  currentStep,
  onNext,
  onPrevious,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPhotoValid, setIsPhotoValid] = useState<boolean | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
          validatePhoto(reader.result as string); // 사진 검사 로직 호출
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    // 카메라 촬영 로직을 수행 후, 이미지 검증
    const dummyCapturedImage = 'captured-image-url'; // 이 부분은 실제 캡처한 이미지 URL로 대체
    setSelectedImage(dummyCapturedImage);
    validatePhoto(dummyCapturedImage);
  };

  const validatePhoto = (image: string) => {
    // 임시 검증 로직 (여기서 API 호출 또는 로직 수행 가능)
    setTimeout(() => {
      const isValid = Math.random() > 0.5; // 임의로 통과 여부 결정 (실제 로직으로 변경)
      setIsPhotoValid(isValid);
    }, 1000);
  };

  return (
    <Container>
      <Title>{currentStep} 촬영</Title>
      {!selectedImage ? (
        <OptionsContainer>
          <Option onClick={handleCameraCapture}>
            <CircleWrapper $isCamera>
              <OptionIcon src={CameraIcon} alt="사진 촬영 아이콘" />
            </CircleWrapper>
            <OptionLabel>사진 촬영</OptionLabel>
          </Option>
          <Option>
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              <CircleWrapper>
                <OptionIcon src={GalleryIcon} alt="사진 업로드 아이콘" />
                <HiddenFileInput
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </CircleWrapper>
            </label>
            <OptionLabel>사진 업로드</OptionLabel>
          </Option>
        </OptionsContainer>
      ) : (
        <PhotoValidation image={selectedImage} isValid={isPhotoValid} />
      )}
      <ButtonContainer>
        <ActionButton onClick={onPrevious}>이전</ActionButton>
        <ActionButton
          onClick={onNext}
          disabled={!isPhotoValid}
          style={{ backgroundColor: isPhotoValid ? '#8DD791' : '#e0e0e0' }}
        >
          다음 단계
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

// 새로운 PhotoValidation 컴포넌트
interface PhotoValidationProps {
  image: string;
  isValid: boolean | null;
}

const PhotoValidation: React.FC<PhotoValidationProps> = ({
  image,
  isValid,
}) => (
  <ValidationContainer>
    <ImagePreview src={image} alt="Uploaded Preview" />
    <NoticeWrapper>
      <Notice>
        {isValid === null
          ? '검사 중입니다...'
          : isValid
            ? '검사가 가능한 사진입니다.'
            : '구강을 인식할 수 없습니다. 다시 촬영해 주세요.'}
      </Notice>
    </NoticeWrapper>
  </ValidationContainer>
);

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  margin-bottom: 16px;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 51px;
  margin-top: 32px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const CircleWrapper = styled.div<{ $isCamera?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isCamera }) => ($isCamera ? '#8DD791' : '#474D66')};
`;

const OptionIcon = styled.img`
  width: 33px;
  height: 33px;
`;

const OptionLabel = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  color: #474d66;
  margin-top: 16px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ValidationContainer = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 327px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const NoticeWrapper = styled.div`
  margin-top: 8px;
`;

const Notice = styled.p`
  font-size: 14px;
  color: #474d66;
`;

export default PhotoCaptureOrUpload;
