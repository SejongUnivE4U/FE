import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import instance from '../../api/axios';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [onModalCloseAction, setOnModalCloseAction] = useState<
    (() => void) | null
  >(null);

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await instance.post('/login', { email, password });
      const { accessToken, refreshToken } = response.data;

      // Cookies.set('refreshToken', response.data.refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      handleOpenModal(
        '로그인에 성공하였습니다.',
        () => navigate('/home'),
        '홈 화면으로 이동합니다.',
      );
    } catch (error) {
      handleOpenModal('정확하지 않은 이메일이거나 비밀번호입니다.');
    }
  };

  return (
    <Container>
      <Title>로그인</Title>

      <Form onSubmit={handleLogin}>
        <InputGroup>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="이메일을 입력해 주세요"
              $focused={focusedField === 'email'}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="비밀번호를 입력해 주세요"
              $focused={focusedField === 'password'}
            />
          </InputWrapper>
        </InputGroup>

        <Button variant="primary" type="submit" disabled={!isFormValid}>
          로그인
        </Button>
      </Form>
      <SignUpText onClick={() => navigate('/signup')}>회원가입</SignUpText>
      <Modal
        isOpen={isModalOpen}
        title={modalMessage}
        additionalMessage={additionalMessage}
        onClose={handleCloseModal}
        buttonText="확인"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.label`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const SignUpText = styled.span`
  margin-top: 40px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryGreen};
  cursor: pointer;
  &:active {
    text-decoration: underline;
  }
`;
