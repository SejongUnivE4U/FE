import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: #474d66;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 40px;
  margin-bottom: 45px;
`;

export const PhotoContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 327px;
  margin-top: 80px;
`;

/** 프리뷰 페이지 */

export const ImagePreview = styled.img`
  width: 327px;
  height: auto;
  border-radius: 10px;
  margin-top: 70px;
`;

export const NoticeWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  width: 327px;
  align-items: center;
`;

export const Notice = styled.p<{ $isValid?: boolean }>`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ $isValid: isValid }) => (isValid ? '#4CBFA4' : '#FF5E5E')};
`;

export const NoticeIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 7.5px;
`;

export const ReSelectButtonWrapper = styled.div`
  display: flex;
  margin-top: 7px;
  width: 327px;
  align-items: center;
  justify-content: right;
`;

export const ReSelectButton = styled.button`
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

export const LoadingMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 100px;
`;
