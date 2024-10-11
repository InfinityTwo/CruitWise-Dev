import "./ProgressBar.scss";

import React from "react";

interface ProgressBarProps {
  progress: number;
  delayShow?: number;
}

export const ProgressBar = ({ progress = 0.0 }: ProgressBarProps) => {
  // const [progressPercentage, setProgressPercentage] = useState(progress); // 0.00 -> 1.00

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-component">
        <div className="progress-bar-actual" style={{ width: "max(" + String(progress * 100) + "%, 20px)" }}></div>
      </div>
      <p className="progress-bar-pecent">{String(Math.round(progress * 100))}%</p>
    </div>
  );
};
