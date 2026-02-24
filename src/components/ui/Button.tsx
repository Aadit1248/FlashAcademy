'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'volt';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, onClick, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer shadow-md hover:shadow-lg active:scale-95',
      {
        // Volt/Neon Yellow - High contrast CTA
        'bg-[#CCFF00] text-green-900 hover:bg-[#b8e600] focus:ring-[#CCFF00] border-2 border-[#CCFF00]':
          variant === 'volt',
        // Primary - Standard yellow
        'bg-yellow-400 text-green-900 hover:bg-yellow-300 focus:ring-yellow-400':
          variant === 'primary',
        // Secondary - Forest green
        'bg-green-800 text-white hover:bg-green-700 focus:ring-green-800':
          variant === 'secondary',
        // Outline - Green border
        'border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white focus:ring-green-800 bg-transparent':
          variant === 'outline',
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
      },
      className
    );

    // Handle anchor links with smooth scrolling
    if (href?.startsWith('#')) {
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      return (
        <a href={href} onClick={handleClick} className={classes}>
          {children}
        </a>
      );
    }

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
