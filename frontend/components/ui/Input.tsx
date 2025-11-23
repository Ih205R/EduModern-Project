import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-subheading font-medium text-dark text-sm">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border-2 border-grayblue bg-white px-4 py-2 font-body text-base text-dark placeholder:text-grayblue/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-destructive font-body">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };