import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PlusIcon from '../../../public/assets/icons/plus-icon.svg';
import InviteModal from './InviteModal';

// 초대 모달 임포트

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); // 초대 모달 상태

  // 드롭다운 메뉴 토글
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 친구 초대 클릭 핸들러
  const handleInviteClick = () => {
    setIsOpen(false); // 드롭다운 닫기
    setIsInviteModalOpen(true); // 초대 모달 열기
  };

  // 초대 완료 핸들러
  const handleInvite = (id: string) => {
    console.log('초대된 아이디:', id);
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
          <MenuItem>챌린지 추가</MenuItem>
          <MenuItem $danger>그룹 삭제</MenuItem>
        </MenuList>
      )}

      {/* 초대 모달 */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </Container>
  );
};

export default DropdownMenu;

// 스타일 정의
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

  /* 버튼 회전 효과 */
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(45deg); /* X 모양 회전 */
    `}
`;

const IconImage = styled.img`
  width: 45px;
  height: 45px;
`;

const MenuList = styled.ul`
  position: absolute;
  bottom: 65px; /* 아이콘 위에 위치 */
  right: 0;
  width: 129px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  background: #fff;
  padding: 8px 0;
`;

const MenuItem = styled.li<{ $disabled?: boolean; $danger?: boolean }>`
  padding: 11px; /* 위아래 여백 */
  font-size: 14px;
  color: ${({ $disabled, $danger }) =>
    $disabled ? '#B0B0B0' : $danger ? '#FF5E5E' : '#4B4B4B'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background: #fff;

  /* 텍스트 가운데 정렬 */
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
