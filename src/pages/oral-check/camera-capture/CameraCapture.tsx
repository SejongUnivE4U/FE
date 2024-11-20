import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LipGuideImage from '../../../../public/assets/icons/lip-guide.svg';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFacingUser, setIsFacingUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(isCameraActive); //임시

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
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        console.log(location.state);
        if (location.state && location.state.from === '/oral-check/photo') {
          navigate('/oral-check/photo-preview', {
            state: { image: imageDataUrl },
          });
        } else if (
          location.state &&
          location.state.from === '/detail-oral-check/front-photo'
        ) {
          navigate('/detail-oral-check/front-preview', {
            state: { image: imageDataUrl },
          });
        } else if (
          location.state &&
          location.state.from === '/detail-oral-check/upper-photo'
        ) {
          navigate('/detail-oral-check/upper-preview', {
            state: { image: imageDataUrl },
          });
        } else if (
          location.state &&
          location.state.from === '/detail-oral-check/lower-photo'
        ) {
          navigate('/detail-oral-check/lower-preview', {
            state: { image: imageDataUrl },
          });
        }

        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    setIsFacingUser((prev) => !prev);
  };

  return (
    <Container>
      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline />
        <Canvas ref={canvasRef} />
        <GuideImage src={LipGuideImage} alt="Lip guide" />
      </VideoContainer>
      <ButtonContainer>
        <ActionButton onClick={() => navigate('/oral-check/photo')}>
          취소
        </ActionButton>
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
  justify-content: space-between;
  background-color: black;
  padding-top: 150px; /* 상단 여백 */
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  flex: 1;
  margin-bottom: 20px; /* 하단 여백 */
`;

const GuideImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
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
  padding: 0 30px;
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: auto;
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const CaptureButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  display: block;
  margin: 0 auto;
`;

export default CameraCapture;
