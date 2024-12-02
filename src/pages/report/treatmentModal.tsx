import React from 'react';
import styled from 'styled-components';
import XIcon from '../../../public/assets/icons/x-icon.svg';

interface TreatmentModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackgroundClick}>
      <ModalContainer>
        <CloseIcon src={XIcon} alt="Close" onClick={onClose} />
        <ModalContentWrapper>
          <ModalTitle>{title}</ModalTitle>
          <ModalContent>{content}</ModalContent>
        </ModalContentWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default TreatmentModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-bottom: 45px;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ModalContentWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ModalTitle = styled.h3`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const ModalContent = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: #666;
  word-break: keep-all;
`;
