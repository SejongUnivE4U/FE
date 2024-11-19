import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

export default function AccountSetting() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordConfirmation = (value: string) => {
    setConfirmNewPassword(value);
    if (newPassword !== value) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(null);
    }
  };

  return (
    <Container>
      <Title>계정 설정</Title>

      <Form>
        <SectionTitle>비밀번호 변경</SectionTitle>
        <InputWrapper>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="기존 비밀번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => handlePasswordConfirmation(e.target.value)}
            placeholder="새 비밀번호 확인"
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputWrapper>
        <ChangePasswordButtonWrapper>
          <ChangePasswordButton onClick={() => alert('비밀번호 변경')}>
            변경하기
          </ChangePasswordButton>
        </ChangePasswordButtonWrapper>

        <LogoutButtonWrapper>
          <Button variant="outline" onClick={() => alert('로그아웃')}>
            로그아웃
          </Button>
        </LogoutButtonWrapper>

        <Button variant="secondary" onClick={() => alert('계정 탈퇴')}>
          계정 탈퇴
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  margin-top: 100px;
  margin-bottom: 200px;
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

const SectionTitle = styled.h2`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 335px;
  height: 45px;
  padding: 14px 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 10px;
  background: #f7f7fa;
  border: 1px solid transparent;

  &::placeholder {
    color: #8f95b2;
  }
`;

const ChangePasswordButtonWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 58px;
  display: flex;
  justify-content: right;
`;

const ChangePasswordButton = styled.button`
  display: flex;
  width: 90px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  &:active {
    background-color: #32a68a;
  }
`;

const LogoutButtonWrapper = styled.div`
  margin-bottom: 24px;
`;

const ErrorMessage = styled.span`
  color: #d14343;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;
