import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-gray-900 placeholder:text-gray-400 focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/20',
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
