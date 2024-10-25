import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || '');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <DropdownContainer>
      <DropdownSelected
        onClick={toggleDropdown}
        $isOpen={isOpen}
        $hasValue={selected !== '' && selected !== placeholder}
      >
        {selected || placeholder}
        <Arrow $isOpen={isOpen}>▼</Arrow>
      </DropdownSelected>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  width: 335px;
  position: relative;
`;

const DropdownSelected = styled.div<{ $isOpen: boolean; $hasValue: boolean }>`
  display: flex;
  width: 335px;
  height: 42px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: none;
  background-color: #f7f7fa;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding-left: 150px;
  padding-right: 26px;

  border: ${({ $isOpen, theme }) =>
    $isOpen ? `1px solid ${theme.colors.primaryGreen}` : 'none'};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.textPrimary : theme.colors.textSecondary};
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
  margin-left: 26px;
  font-size: 12px;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: #8f95b2;
`;

const DropdownList = styled.ul`
  width: 335px;
  max-height: 150px;
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  margin-top: 5px;
  border: none;
  z-index: 1;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Dropdown;
