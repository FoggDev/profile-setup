import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import BasicInfo from './components/steps/BasicInfo';
import PropertyType from './components/steps/PropertyType';
import Capacity from './components/steps/Capacity';
import Amenities from './components/steps/Amenities';
import Pricing from './components/steps/Pricing';
import Images from './components/steps/Images';
import Review from './components/steps/Review';
import Confirmation from './components/steps/Confirmation';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <StepRenderer />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

const StepRenderer: React.FC = () => {
  const { currentStep } = useFormContext();

  switch (currentStep) {
    case 1:
      return <BasicInfo />;
    case 2:
      return <PropertyType />;
    case 3:
      return <Capacity />;
    case 4:
      return <Amenities />;
    case 5:
      return <Pricing />;
    case 6:
      return <Images />;
    case 7:
      return <Review />;
    case 8:
      return <Confirmation />;
    default:
      return <BasicInfo />;
  }
};

export default App;