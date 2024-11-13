import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}) => {
  return (
    <StyledButton onClick={onClick} variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ variant: string }>`
  display: flex;
  width: 335px;
  height: 45px;
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

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.primaryGreen};
          color: ${({ theme }) => theme.colors.textWhite};
          border: none;

          &:active {
            background-color: #32a68a;
          }

          &:disabled {
            background-color: #c6cada;
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return css`
          background-color: #767a8c;
          color: ${({ theme }) => theme.colors.textWhite};
          border: none;

          &:active {
            background-color: #63687d;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${({ theme }) => theme.colors.primaryGreen};
          border: 1px solid ${({ theme }) => theme.colors.primaryGreen};

          &:active {
            background-color: #eef9f6;
          }
        `;
      default:
        return '';
    }
  }}
`;
