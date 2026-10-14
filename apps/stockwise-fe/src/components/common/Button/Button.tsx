import React from 'react';
import { Button as MuiButton } from '@mui/material/';

export enum ButtonVariant {
  Primary = 'contained',
  Secondary = 'outlined',
}

type ButtonType = 'button' | 'submit';

interface ButtonProps {
  title: string;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, type = 'button', variant = ButtonVariant.Primary, className, disabled, onClick }) => (
  <MuiButton variant={variant} type={type} onClick={onClick} className={className} disabled={disabled}>
    {title}
  </MuiButton>
);
