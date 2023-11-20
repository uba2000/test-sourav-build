import clsx from 'clsx';
import React from 'react'

interface IButton {
  variant?: 'primary' | 'secondary' | 'cobalt';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({ children, disabled = false, variant = 'primary', onClick = () => { }, className }: IButton) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(' min-w-[75px]', {
        'bg-gaming-blue': variant === 'primary',
        'bg-gaming-yellow': variant === 'secondary',
        'bg-intel-cobalt-t1': variant === 'cobalt',
      }, 'disabled:bg-[#575757]', className)}
    >
      {children}
    </button>
  )
}

export default Button