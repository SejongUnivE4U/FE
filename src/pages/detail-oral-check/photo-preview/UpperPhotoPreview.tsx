import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '../../../../public/assets/icons/check-circle.svg';
import XCircleIcon from '../../../../public/assets/icons/x-circle.svg';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import { usePhotoValidation } from '../../../hooks/usePhotoValidation';
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

export default function UpperPhotoPreview() {
  const steps = ['정면', '상악', '하악'];
  const currentStep = 1;
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || { image: null };
  const { isPhotoValid, isLoading } = usePhotoValidation(
    image as File | null,
    false,
  );

  return (
    <Container>
      <TopBar></TopBar>
      <Contents>
        <Title>검사 사진</Title>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <PhotoContents>
          {isLoading ? (
            <LoadingMessage>검사 중입니다...</LoadingMessage>
          ) : image ? (
            <>
              <ImagePreview
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
              />
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
              {!isPhotoValid && (
                <ReSelectButtonWrapper>
                  <ReSelectButton
                    onClick={() => navigate('/detail-oral-check/upper-photo')}
                  >
                    재선택 하기
                  </ReSelectButton>
                </ReSelectButtonWrapper>
              )}
            </>
          ) : (
            <Notice>이미지가 없습니다. 다시 시도해 주세요.</Notice>
          )}
        </PhotoContents>
        <ButtonContainer>
          <Button
            variant="primary"
            onClick={() => navigate('/detail-oral-check/lower-photo')}
            disabled={!isPhotoValid}
          >
            다음 단계
          </Button>
        </ButtonContainer>
      </Contents>
    </Container>
  );
}
