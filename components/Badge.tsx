
import React from 'react';
import { RecipeCategory } from '../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: RecipeCategory | 'default';
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'default' }) => {
  const colorClasses = {
    Express: 'bg-orange-100 text-accent-orange',
    Balanceada: 'bg-blue-100 text-primary-light',
    Performance: 'bg-green-100 text-accent-green',
    default: 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
