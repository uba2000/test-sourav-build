import clsx from 'clsx';
import React from 'react'

interface IButton {
  variant?: 'primary' | 'secondary' | 'cobalt' | 'gaming-cobalt';
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
        'bg-gaming-blue disabled:bg-gaming-blue-disabled hover:bg-gaming-blue-hover text-gaming-navy': variant === 'primary',
        'bg-gaming-yellow disabled:bg-[#575757]': variant === 'secondary',
        'bg-intel-cobalt-t1 disabled:bg-[#575757]': variant === 'cobalt',
        'bg-gaming-cobalt disabled:bg-[#575757]': variant === 'gaming-cobalt',
      },className)}
    >
      {children}
    </button>
  )
}

export default Button