
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-screen shadow-lg">
      {children}
    </div>
  );
};

export default Layout;
