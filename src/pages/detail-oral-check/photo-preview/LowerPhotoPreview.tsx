import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '../../../../public/assets/icons/check-circle.svg';
import XCircleIcon from '../../../../public/assets/icons/x-circle.svg';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import {
  ButtonContainer,
  Container,
  Contents,
  ImagePreview,
  LoadingMessage,
  Notice,
  NoticeIcon,
  NoticeWrapper,
  PhotoContents,
  ReSelectButton,
  ReSelectButtonWrapper,
  Title,
  TopBar,
} from '../Photo.styled';

export default function LowerPhotoPreview() {
  const steps = ['정면', '상악', '하악'];
  const currentStep = 2;
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || { image: null };
  const [isPhotoValid, setIsPhotoValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 임시 서버 검증 로직 시뮬레이션
    const validatePhoto = async () => {
      setIsLoading(true);
      try {
        //API 호출 코드

        // 임시로 2초 후 유효 여부를 랜덤하게 결정
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const isValid = Math.random() > 0.5;
        setIsPhotoValid(isValid);
      } catch (error) {
        console.error('Error validating photo:', error);
        setIsPhotoValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (image) {
      validatePhoto();
    } else {
      setIsPhotoValid(false);
      setIsLoading(false);
    }
  }, [image]);

  return (
    <Container>
      <TopBar>
        <BackButton to="/detail-oral-check/lower-photo" />
      </TopBar>
      <Contents>
        <Title>검사 사진</Title>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <PhotoContents>
          {isLoading ? (
            <LoadingMessage>검사 중입니다...</LoadingMessage>
          ) : image ? (
            <>
              <ImagePreview src={image} alt="Uploaded Preview" />
              <NoticeWrapper>
                <NoticeIcon
                  src={isPhotoValid ? CheckCircleIcon : XCircleIcon}
                />
                <Notice $isValid={isPhotoValid || false}>
                  {isPhotoValid
                    ? '검사가 가능한 사진입니다.'
                    : '구강을 인식할 수 없습니다. 다시 촬영해 주세요.'}
                </Notice>
              </NoticeWrapper>
              <ReSelectButtonWrapper>
                <ReSelectButton
                  onClick={() => navigate('/detail-oral-check/lower-photo')}
                >
                  재선택 하기
                </ReSelectButton>
              </ReSelectButtonWrapper>
            </>
          ) : (
            <Notice>이미지가 없습니다. 다시 시도해 주세요.</Notice>
          )}
        </PhotoContents>
        <ButtonContainer>
          <Button
            variant="primary"
            onClick={() => navigate('/oral-check/aditional-check')}
            disabled={!isPhotoValid}
          >
            다음 단계
          </Button>
        </ButtonContainer>
      </Contents>
    </Container>
  );
}
