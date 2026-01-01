import { Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ variant = 'default', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 36,
  };

  const colorClasses = {
    default: 'text-primary',
    light: 'text-primary-foreground',
    dark: 'text-primary',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-semibold ${sizeClasses[size]} ${colorClasses[variant]}`}>
      <Droplets size={iconSizes[size]} className="text-accent" />
      <span>CleanDrop</span>
    </Link>
  );
};

export default Logo;
