import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PlusIcon from '../../../public/assets/icons/plus-icon.svg';
import { inviteToCommunity } from '../../api/communityApis';
import Modal from '../../components/Modal';
import ChallengeAddModal from './ChallengeAddModal';
import InviteModal from './InviteModal';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const { groupId } = useParams();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInviteClick = () => {
    setIsOpen(false);
    setIsInviteModalOpen(true);
  };

  const handleChallengeClick = () => {
    setIsOpen(false);
    setIsChallengeModalOpen(true);
  };

  const handleInvite = async (userId: string) => {
    try {
      if (!groupId) {
        throw new Error('그룹 ID가 존재하지 않습니다.');
      }

      const response = await inviteToCommunity(Number(groupId), Number(userId));
      console.log('초대 성공:', response);

      setModalMessage('초대가 성공적으로 완료되었습니다!');
      setAdditionalMessage('친구가 그룹에 추가되었습니다.');
      setIsModalOpen(true);
    } catch (error) {
      console.error('초대 실패:', error);

      setModalMessage('초대에 실패했습니다.');
      setAdditionalMessage('다시 시도해 주세요.');
      setIsModalOpen(true);
    }
  };

  const handleStartChallenge = (challengeId: number) => {
    console.log('선택된 챌린지 ID:', challengeId);
    // API 호출 로직 추가 예정
  };

  return (
    <Container>
      {/* 메뉴 아이콘 버튼 */}
      <IconButton onClick={toggleMenu} $isOpen={isOpen}>
        <IconImage src={PlusIcon} alt="menu icon" />
      </IconButton>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <MenuList>
          <MenuItem onClick={handleInviteClick}>친구 초대</MenuItem>
          <MenuItem onClick={handleChallengeClick}>챌린지 추가</MenuItem>
          <MenuItem $danger>그룹 삭제</MenuItem>
        </MenuList>
      )}

      {/* 초대 모달 */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite} // 초대 함수 연결
      />

      {/* 챌린지 추가 모달 */}
      <ChallengeAddModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onStartChallenge={handleStartChallenge}
      />

      {/* 공통 모달 */}
      <Modal
        isOpen={isModalOpen}
        title={modalMessage}
        additionalMessage={additionalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default DropdownMenu;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const IconButton = styled.button<{ $isOpen: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #c6cada;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(45deg);
    `}
`;

const IconImage = styled.img`
  width: 45px;
  height: 45px;
`;

const MenuList = styled.ul`
  position: absolute;
  bottom: 65px;
  right: 0;
  width: 129px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  background: #fff;
  padding: 8px 0;
`;

const MenuItem = styled.li<{ $disabled?: boolean; $danger?: boolean }>`
  padding: 11px;
  font-size: 14px;
  color: ${({ $disabled, $danger }) =>
    $disabled ? '#B0B0B0' : $danger ? '#FF5E5E' : '#4B4B4B'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background: #fff;
  text-align: center;

  &:hover {
    ${({ $disabled }) =>
      !$disabled &&
      css`
        background: #f7f7f7;
      `}
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e9e9eb;
  }
`;
