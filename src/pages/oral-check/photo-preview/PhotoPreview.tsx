import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CheckCircleIcon from '../../../../public/assets/icons/check-circle.svg';
import XCircleIcon from '../../../../public/assets/icons/x-circle.svg';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';

export default function PhotoPreview() {
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
        <BackButton to="/oral-check/photo" />
      </TopBar>
      <Contents>
        <Title>검사 사진</Title>
        {isLoading ? (
          <LoadingMessage>검사 중입니다...</LoadingMessage>
        ) : image ? (
          <>
            <ImagePreview src={image} alt="Uploaded Preview" />
            <NoticeWrapper>
              <NoticeIcon src={isPhotoValid ? CheckCircleIcon : XCircleIcon} />
              <Notice $isValid={isPhotoValid || false}>
                {isPhotoValid
                  ? '검사가 가능한 사진입니다.'
                  : '구강을 인식할 수 없습니다. 다시 촬영해 주세요.'}
              </Notice>
            </NoticeWrapper>
            <ReSelectButtonWrapper>
              <ReSelectButton onClick={() => navigate('/oral-check/photo')}>
                재선택 하기
              </ReSelectButton>
            </ReSelectButtonWrapper>
            <ButtonContainer>
              <Button
                variant="primary"
                onClick={() => navigate('/oral-check/aditional-check')}
                disabled={!isPhotoValid}
              >
                다음 단계
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <Notice>이미지가 없습니다. 다시 시도해 주세요.</Notice>
        )}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ImagePreview = styled.img`
  width: 327px;
  height: auto;
  border-radius: 10px;
  margin-top: 70px;
`;

const NoticeWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  width: 327px;
  align-items: center;
`;

const Notice = styled.p<{ $isValid?: boolean }>`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ $isValid: isValid, theme }) =>
    isValid ? '${theme.colors.primaryGreen}' : '#FF5E5E'};
`;

const NoticeIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 7.5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 327px;
  margin-top: 132px;
`;

const ReSelectButtonWrapper = styled.div`
  display: flex;
  margin-top: 7px;
  width: 327px;
  align-items: center;
  justify-content: right;
`;

const ReSelectButton = styled.button`
  width: 117px;
  height: 42px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primaryGreen};
  color: ${({ theme }) => theme.colors.primaryGreen};
  border-radius: 8px;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;

  &:hover {
    background-color: rgba(141, 215, 145, 0.1);
  }
`;

const LoadingMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 100px;
`;
