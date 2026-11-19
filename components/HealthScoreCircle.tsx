
import React from 'react';

interface HealthScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const HealthScoreCircle: React.FC<HealthScoreCircleProps> = ({
  score,
  size = 60,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'stroke-accent-green';
  if (score < 70) colorClass = 'stroke-yellow-500';
  if (score < 40) colorClass = 'stroke-accent-orange';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <span className="text-lg font-bold text-gray-700">{score}</span>
    </div>
  );
};

export default HealthScoreCircle;
