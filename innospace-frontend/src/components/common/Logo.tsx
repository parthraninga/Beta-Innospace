import React from 'react';
import logoPng from '../../assets/logo.png';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  isDark?: boolean;
};

const sizeMap: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'w-8 h-8',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24',
};

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '', isDark = false }) => {
  const textColorClass = isDark ? 'text-amber-100' : 'text-gray-900';
  const subtextColorClass = isDark ? 'text-amber-200' : 'text-gray-600';
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={logoPng}
        alt="Innospace logo"
        className={`${sizeMap[size]} object-contain`} 
        aria-hidden={false}
      />
      {showText && (
        <div>
          <h1 className={`text-xl md:text-2xl font-bold ${textColorClass}`}>INNOSPACE</h1>
          <p className={`text-xs md:text-sm ${subtextColorClass} -mt-1`}>Interiors</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
