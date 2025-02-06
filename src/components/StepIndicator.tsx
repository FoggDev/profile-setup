import React from 'react';
import { useFormContext } from '../context/FormContext';

const StepIndicator: React.FC = () => {
  const { currentStep } = useFormContext();

  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="text-sm font-medium text-gray-600">
        Step {currentStep}/8
      </span>
      <div className="h-2 w-32 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 8) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator