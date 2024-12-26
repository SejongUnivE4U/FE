import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createCommunity } from '../../../api/communityApis';
import Button from '../../../components/Button';
import CloseButton from '../../../components/CloseButton';
import Modal from '../../../components/Modal';

const GroupAdd: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [onModalCloseAction, setOnModalCloseAction] = useState<
    (() => void) | null
  >(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const navigate = useNavigate();

  // 모달 핸들러
  const handleOpenModal = (
    message: string,
    onCloseAction?: () => void,
    additionalMsg?: string,
  ) => {
    setModalMessage(message);
    setAdditionalMessage(additionalMsg || '');
    setOnModalCloseAction(() => onCloseAction || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onModalCloseAction) onModalCloseAction();
  };

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createCommunity(groupName);
      console.log('그룹 생성 성공:', response);

      handleOpenModal(
        '그룹이 성공적으로 생성되었습니다!',
        () => navigate('/groups'),
        '그룹 목록으로 이동합니다.',
      );
    } catch (error) {
      console.error('그룹 생성 실패:', error);
      handleOpenModal('그룹 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const isFormValid = groupName.trim() !== '';

  return (
    <Container>
      <TopBar>
        <CloseButton to="/groups" />
      </TopBar>
      <Contents>
        <TitleContainer>
          <Title>그룹 만들기</Title>
        </TitleContainer>
        <Description>
          친구나 가족과 함께 구강 건강 관리를 시작하세요!
          <br />
          그룹을 만들어 목표를 설정하고 함께 관리해보세요.
        </Description>

        <Form onSubmit={handleCreateGroup}>
          <InputGroup>
            <Label>그룹 이름</Label>
            <Input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onFocus={() => setFocusedField('email')}
              placeholder="그룹 이름을 입력하세요"
              $focused={focusedField === 'email'}
            />
          </InputGroup>
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            그룹 만들기
          </Button>
        </Form>
      </Contents>

      <Modal
        isOpen={isModalOpen}
        title={modalMessage}
        additionalMessage={additionalMessage}
        onClose={handleCloseModal}
        buttonText="확인"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 327px;
`;

const TitleContainer = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.h1`
  color: #4b4b4b;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  margin-top: 20px;
`;

const Description = styled.p`
  width: 327px;
  margin-top: 8px;
  font-size: 14px;
  color: #757575;
  text-align: left;
  line-height: 1.6;
`;

const Form = styled.form`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
`;

const Input = styled.input<{ $focused: boolean }>`
  display: flex;
  width: 335px;
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

export default GroupAdd;
