import React from 'react';
import { useFormContext } from '../context/FormContext';
import StepIndicator from './StepIndicator';

interface FormFooterProps {
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  onNext?: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  showBack = true,
  showNext = true,
  nextLabel = 'Next',
  onNext,
}) => {
  const { previousStep, nextStep, currentStep, formData } = useFormContext();

  const isNextDisabled = () => {
    // Disable next button on Images step if no images are selected
    if (currentStep === 6) {
      return formData.images.length === 0;
    }
    return false;
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  if (currentStep === 8) return null;

  return (
    <div className="flex items-center justify-between mt-8 border-t pt-4">
      <div className="flex-1">
        {showBack && currentStep > 1 && (
          <button
            onClick={previousStep}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back
          </button>
        )}
      </div>
      
      <StepIndicator />
      
      <div className="flex-1 text-right">
        {showNext && (
          <button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormFooter;