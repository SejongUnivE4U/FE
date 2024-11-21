import React from 'react';
import styled from 'styled-components';
import XIcon from '../../public/assets/icons/x-icon.svg';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  buttonText?: string;
  onConfirm?: () => void;
  additionalMessage?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  buttonText = '확인',
  onConfirm,
  additionalMessage,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer $hasAdditionalMessage={!!additionalMessage}>
        <CloseIcon src={XIcon} alt="Close" onClick={onClose} />
        <ModalContentWrapper $hasAdditionalMessage={!!additionalMessage}>
          <ModalContent>{title}</ModalContent>
          {additionalMessage && (
            <AdditionalMessage>{additionalMessage}</AdditionalMessage>
          )}
          <ConfirmButton onClick={handleConfirm}>{buttonText}</ConfirmButton>
        </ModalContentWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

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

const ModalContainer = styled.div<{ $hasAdditionalMessage: boolean }>`
  background: #ffffff;
  width: 275px;
  height: ${({ $hasAdditionalMessage }) =>
    $hasAdditionalMessage ? '200px' : '180px'};
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
`;

const ModalContentWrapper = styled.div<{ $hasAdditionalMessage: boolean }>`
  margin-top: 53px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${({ $hasAdditionalMessage }) =>
    $hasAdditionalMessage ? '120px' : '100px'};
`;

const ModalContent = styled.p`
  width: 220px;
  color: #4b4b4b;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin: 0px auto;
  word-break: keep-all;
`;

const AdditionalMessage = styled.p`
  width: 220px;
  color: #b3b3b3;
  font-family: Pretendard;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin: 0px auto;
  word-break: keep-all;
`;

const ConfirmButton = styled.button`
  width: 89px;
  height: 40px;
  padding: 12px auto;
  background: ${({ theme }) => theme.colors.primaryGreen};
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
`;
