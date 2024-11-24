import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import boltSlashIcon from '../../../../public/assets/icons/bolt-slash.svg';
import boltIcon from '../../../../public/assets/icons/bolt.svg';
import FrontGuideImage from '../../../../public/assets/images/camera-guide-front.svg';
import LowerGuideImage from '../../../../public/assets/images/camera-guide-lower.svg';
import UpperGuideImage from '../../../../public/assets/images/camera-guide-upper.svg';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFacingUser, setIsFacingUser] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [isFacingUser]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFacingUser ? 'user' : 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        if (isFlashActive) {
          await triggerFlash();
        }

        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.png', {
              type: 'image/png',
            });

            if (location.state && location.state.from === '/oral-check/photo') {
              navigate('/oral-check/photo-preview', {
                state: { image: file },
              });
            } else if (
              location.state &&
              location.state.from === '/detail-oral-check/front-photo'
            ) {
              navigate('/detail-oral-check/front-preview', {
                state: { image: file },
              });
            } else if (
              location.state &&
              location.state.from === '/detail-oral-check/upper-photo'
            ) {
              navigate('/detail-oral-check/upper-preview', {
                state: { image: file },
              });
            } else if (
              location.state &&
              location.state.from === '/detail-oral-check/lower-photo'
            ) {
              navigate('/detail-oral-check/lower-preview', {
                state: { image: file },
              });
            }

            stopCamera();
          }
        }, 'image/png');
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const toggleCameraFacing = () => {
    setIsFacingUser((prev) => !prev);
  };

  const toggleFlash = () => {
    setIsFlashActive((prev) => !prev);
  };

  const triggerFlash = async () => {
    setIsFlashing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsFlashing(false);
  };

  const getGuideImage = () => {
    if (!location.state) return null;
    const { from } = location.state;

    if (from === '/detail-oral-check/front-photo') {
      return FrontGuideImage;
    } else if (from === '/detail-oral-check/upper-photo') {
      return UpperGuideImage;
    } else if (from === '/detail-oral-check/lower-photo') {
      return LowerGuideImage;
    } else if (from === '/oral-check/photo') {
      return null;
    }
  };

  const guideImageSrc = getGuideImage();

  const handleCancel = () => {
    if (location.state && location.state.from) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Container>
      <FlashWrapper>
        <FlashIcon
          src={isFlashActive ? boltIcon : boltSlashIcon}
          alt="Flash Toggle"
          onClick={toggleFlash}
        />
      </FlashWrapper>
      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline />
        <Canvas ref={canvasRef} />
        {guideImageSrc && <GuideImage src={guideImageSrc} alt="Camera guide" />}
        {isFlashing && <FlashEffect />}
      </VideoContainer>
      <ButtonContainer>
        <ActionButton onClick={handleCancel}>취소</ActionButton>
        <CaptureButton onClick={capturePhoto} />
        <ActionButton onClick={toggleCameraFacing}>전환</ActionButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const FlashWrapper = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
`;

const FlashIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  flex: 1;
`;

const GuideImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: auto;
  opacity: 0.7;
  pointer-events: none;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
`;

const Canvas = styled.canvas`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  width: 100%;
  height: 185px;
  margin-top: auto;
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const CaptureButton = styled.button`
  width: 75px;
  height: 75px;
  background-color: white;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 63px;
    height: 63px;
    border: 2.5px solid black;
    border-radius: 50%;
    background-color: transparent;
  }
`;

const FlashEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export default CameraCapture;
