import React, { useState } from 'react';
import styled from 'styled-components';
import XIcon from '../../../public/assets/icons/x-icon.svg';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (id: string) => void; // 초대 API 콜백
}

const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [inviteId, setInviteId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInviteId(value);
    setIsValid(value.trim() !== ''); // 유효성 검사
  };

  // 초대 버튼 클릭 핸들러
  const handleInvite = () => {
    if (isValid) {
      onInvite(inviteId); // API 호출
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>
          <img src={XIcon} alt="close" />
        </CloseButton>
        <Title>친구 초대</Title>

        {/* 폼 */}
        <Form>
          <InputGroup>
            <Label>초대 아이디</Label>
            <Input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={inviteId}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              $focused={focusedField === 'email'}
            />
          </InputGroup>
          <ButtonWrapper>
            <InviteButton disabled={!isValid} onClick={handleInvite}>
              초대
            </InviteButton>
          </ButtonWrapper>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default InviteModal;

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
  width: 275px;
  padding: 22px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #4b4b4b;
  margin-top: 30px;
  margin-bottom: 33px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: 14px;
  color: #4b4b4b;
`;

const Input = styled.input<{ $focused: boolean }>`
  display: flex;
  width: 237px;
  height: 45px;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 10px;
  background: #f7f7fa;

  border: ${({ $focused, theme }) =>
    $focused
      ? `1px solid ${theme.colors.primaryGreen}`
      : '1px solid transparent'};

  &::placeholder {
    color: #8f95b2;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InviteButton = styled.button`
  width: 237px;
  height: 40px;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? '#c6cada' : '#32a68a')};
  color: ${({ disabled }) => (disabled ? '#F7F7FA' : '#FFFFFF')};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
