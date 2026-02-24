import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white shadow-lg overflow-hidden',
        hover && 'transition-transform hover:scale-105 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-video relative overflow-hidden bg-gray-100">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
