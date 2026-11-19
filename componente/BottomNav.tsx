import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import { HomeIcon, BookOpenIcon, BarChart2Icon, UserIcon } from './icons';

const BottomNav: React.FC = () => {
  const { activePage, setActivePage } = useContext(AppContext);

  const navItems: { page: Page; label: string; icon: JSX.Element }[] = [
    { page: 'home', label: 'Home', icon: <HomeIcon /> },
    { page: 'recipes', label: 'Receitas', icon: <BookOpenIcon /> },
    { page: 'analysis', label: 'Análises', icon: <BarChart2Icon /> },
    { page: 'profile', label: 'Perfil', icon: <UserIcon /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full max-w-lg mx-auto bg-white border-t border-gray-200 shadow-t-lg z-50">
      <nav className="flex items-center justify-around h-16">
        {navItems.map(({ page, label, icon }) => {
          const isActive = activePage === page;

          if (isActive) {
            return (
              <div key={page} className="w-1/4 flex justify-center">
                <button
                  onClick={() => setActivePage(page)}
                  className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center transform -translate-y-4 shadow-lg border-4 border-gray-50"
                  aria-label={label}
                >
                  {React.cloneElement(icon, { className: 'w-7 h-7' })}
                </button>
              </div>
            );
          }

          return (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className="flex flex-col items-center justify-center w-1/4 pt-1 transition-colors duration-200 text-gray-400"
            >
              {React.cloneElement(icon, { className: 'w-6 h-6' })}
              <span className="text-xs mt-1">{label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;
