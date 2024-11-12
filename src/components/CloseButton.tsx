import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import XIcon from '../../public/assets/icons/x-icon.svg';

interface CloseButtonProps {
  onClick?: () => void;
  to?: string;
}

export default function CloseButton({ onClick, to = '/' }: CloseButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <Button onClick={handleClick}>
      <Icon src={XIcon} alt="닫기" />
    </Button>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;
