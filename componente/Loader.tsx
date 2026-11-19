
import React from 'react';
import { RefreshCwIcon } from './icons';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <RefreshCwIcon className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-lg font-semibold text-gray-700">{text}</p>
      <p className="text-sm text-gray-500 mt-1">Isso pode levar alguns segundos...</p>
    </div>
  );
};

export default Loader;
