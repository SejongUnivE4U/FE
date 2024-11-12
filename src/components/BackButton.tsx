import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowIcon from '../../public/assets/icons/arrow-icon.svg';

interface BackButtonProps {
  onClick?: () => void;
  to?: string;
}

export default function BackButton({ onClick, to = '/' }: BackButtonProps) {
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
      <Icon src={ArrowIcon} alt="뒤로 가기" />
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
  width: 24px;
  height: 24px;
`;
