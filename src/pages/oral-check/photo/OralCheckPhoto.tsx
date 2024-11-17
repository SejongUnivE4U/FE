import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CameraIcon from '../../../../public/assets/icons/camera-icon.svg';
import GalleryIcon from '../../../../public/assets/icons/gallery-icon.svg';
import BackButton from '../../../components/BackButton';

export default function OralCheckPhoto() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
          navigate('/oral-check/photo-preview', {
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
        <BackButton to="/oral-check/type" />
      </TopBar>
      <Contents>
        <Title>사진 촬영</Title>
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
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 53px;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 51px;
  margin-top: 192px;
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
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 16px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
