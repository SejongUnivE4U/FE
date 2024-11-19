import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import PhotoOptions from '../../../components/oral-check-progress/PhotoOptions';
import {
  ButtonContainer,
  Container,
  Contents,
  PhotoContents,
  Title,
  TopBar,
} from '../Photo.styled';

export default function FrontPhoto() {
  const steps = ['정면', '상악', '하악'];
  const currentStep = 0;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(selectedImage); //나중에 다시보기
        if (reader.result) {
          setSelectedImage(reader.result as string);
          navigate('/detail-oral-check/front-preview', {
            state: { image: reader.result },
          });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    navigate('/oral-check/camera-capture', {
      state: { from: '/detail-oral-check/front-photo' },
    });
  };

  return (
    <Container>
      <TopBar>
        <BackButton to="/oral-check/type" />
      </TopBar>
      <Contents>
        <Title>사진 촬영</Title>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <PhotoContents>
          <PhotoOptions
            onCameraCapture={handleCameraCapture}
            onImageUpload={handleImageUpload}
          />
        </PhotoContents>
        <ButtonContainer>
          <Button
            variant="primary"
            onClick={() => navigate('/detail-oral-check/upper-photo')}
            disabled={true}
          >
            다음 단계
          </Button>
        </ButtonContainer>
      </Contents>
    </Container>
  );
}
