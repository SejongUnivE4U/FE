import React from 'react';
import styled from 'styled-components';
import CameraIcon from '../../../public/assets/icons/camera-icon.svg';
import GalleryIcon from '../../../public/assets/icons/gallery-icon.svg';

interface PhotoOptionsProps {
  onCameraCapture: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoOptions: React.FC<PhotoOptionsProps> = ({
  onCameraCapture,
  onImageUpload,
}) => {
  return (
    <OptionsContainer>
      <Option onClick={onCameraCapture}>
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
              onChange={onImageUpload}
            />
          </CircleWrapper>
        </label>
        <OptionLabel>사진 업로드</OptionLabel>
      </Option>
    </OptionsContainer>
  );
};

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

export default PhotoOptions;
