// components/CircularProgress.tsx
import React from "react";

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 60,
  strokeWidth = 6,
  showValue = true,
}) => {
  // Ensure value is a valid number between 0 and 100
  const validValue =
    typeof value === "number" && !isNaN(value)
      ? Math.max(0, Math.min(100, value))
      : 0;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (validValue / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#404040"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#47CD89"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {validValue}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
