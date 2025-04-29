import { forwardRef } from 'react';
import { cn } from '../../../utils/clsx.utils';
import { StyledInputProps } from './styled-input.types';

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ className, label, error, icon, required, ...props }, ref) => {
    const placeholderText = label
      ? `${label}${required ? ' *' : ''}`
      : undefined;

    return (
      <div className="relative">
        {label && (
          <label
            className={cn(
              'absolute left-3 transition-all duration-200 pointer-events-none',
              props.value || props.defaultValue
                ? '-top-2 text-xs bg-white px-1'
                : 'top-3 text-sm',
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent',
              icon && 'pl-10',
              error
                ? 'border-red-500'
                : 'border-gray-300 hover:border-[#2A9D8F]',
              className
            )}
            {...props}
            placeholder={placeholderText}
          />
        </div>
        {error && (
          <span className="text-xs text-red-500 mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);

StyledInput.displayName = 'StyledInput';
