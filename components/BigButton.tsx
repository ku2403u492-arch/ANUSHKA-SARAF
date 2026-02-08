import React from 'react';
import { AppSettings } from '../types';
import { speak } from '../services/tts';

interface BigButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  settings: AppSettings;
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
  fullWidth?: boolean;
  subLabel?: string;
}

export const BigButton: React.FC<BigButtonProps> = ({
  label,
  icon,
  onClick,
  settings,
  variant = 'primary',
  fullWidth = false,
  subLabel,
}) => {
  
  const getThemeColors = () => {
    // Base styles
    const baseBorder = settings.theme === 'dark' ? 'border-white' : 'border-black';
    
    switch (variant) {
      case 'danger':
        return `bg-red-700 text-white ${baseBorder}`;
      case 'neutral':
         return settings.theme === 'dark' 
          ? `bg-gray-800 text-white border-gray-600` 
          : `bg-gray-200 text-black border-gray-400`;
      case 'secondary':
        return settings.theme === 'dark'
          ? `bg-slate-800 text-white ${baseBorder}`
          : `bg-white text-black ${baseBorder}`;
      case 'primary':
      default:
        return settings.theme === 'dark' 
          ? `bg-blue-900 text-white ${baseBorder}`
          : `bg-blue-100 text-black ${baseBorder}`;
    }
  };

  const handleMouseEnter = () => {
    speak(label, settings);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter} // For mouse users
      onFocus={handleMouseEnter}      // For keyboard/screen reader users
      className={`
        relative overflow-hidden
        ${fullWidth ? 'w-full' : 'flex-1'}
        ${getThemeColors()}
        border-4 rounded-2xl
        p-6 flex flex-col items-center justify-center gap-4
        transition-transform active:scale-95
        focus:outline-none focus:ring-4 focus:ring-yellow-400
        min-h-[140px]
      `}
      aria-label={label}
    >
      {icon && <div className="scale-150 mb-2">{icon}</div>}
      <span className="leading-tight text-center">
        {label}
      </span>
      {subLabel && (
        <span className="text-[0.7em] opacity-90 font-normal mt-1 block">
          {subLabel}
        </span>
      )}
    </button>
  );
};
