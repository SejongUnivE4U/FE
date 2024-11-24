import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { logoutUser } from '../../api/userApis';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function AccountSetting() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove('refreshToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Container>
      <Title>계정 설정</Title>
      <ButtonWrapper>
        <LogoutButtonWrapper>
          <Button variant="outline" onClick={() => setLogoutModalOpen(true)}>
            로그아웃
          </Button>
        </LogoutButtonWrapper>
        <Button variant="secondary" onClick={() => alert('계정 탈퇴')}>
          계정 탈퇴
        </Button>
      </ButtonWrapper>
      <Modal
        isOpen={isLogoutModalOpen}
        title="정말 로그아웃 하시겠습니까?"
        onClose={() => setLogoutModalOpen(false)}
        buttonText="확인"
        onConfirm={handleLogout}
        additionalMessage="로그아웃 후 다시 로그인해야 합니다."
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  margin-top: calc(20vh);
  margin-bottom: 130px;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutButtonWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
`;
