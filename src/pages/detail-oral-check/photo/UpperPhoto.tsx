import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

export default function UpperPhoto() {
  const steps = ['정면', '상악', '하악'];
  const currentStep = 1;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
          navigate('/detail-oral-check/upper-preview', {
            state: { image: reader.result },
          });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    navigate('/oral-check/camera-capture');
  };

  return (
    <Container>
      <TopBar>
        <BackButton to="/detail-oral-check/front-photo" />
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
            onClick={() => navigate('/detail-oral-check/lower-photo')}
            disabled={true}
          >
            다음 단계
          </Button>
        </ButtonContainer>
      </Contents>
    </Container>
  );
}
