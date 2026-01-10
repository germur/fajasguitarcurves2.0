import React from 'react';

interface ProgressBarProps {
    step: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
    const percentage = (step / totalSteps) * 100;

    return (
        <div className="w-full bg-stone-200 h-1.5 rounded-full mb-8 overflow-hidden">
            <div
                className="bg-[#D4A853] h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
