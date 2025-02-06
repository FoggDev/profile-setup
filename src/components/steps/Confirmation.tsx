import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useFormContext } from '../../context/FormContext';

const Confirmation: React.FC = () => {
  const { resetForm } = useFormContext();

  return (
    <div className="animate-fadeIn text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Property Listed Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Your property has been successfully listed. You can manage your listing from your dashboard.
        </p>

        <div className="space-x-4">
          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            List Another Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;