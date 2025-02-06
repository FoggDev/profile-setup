import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Home, Building2 } from 'lucide-react';
import FormFooter from '../FormFooter';

const PropertyType: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleSelect = (type: 'cabin' | 'hotel') => {
    setFormData({
      ...formData,
      propertyType: type,
    });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Select Property Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => handleSelect('cabin')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            formData.propertyType === 'cabin'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
              alt="Cabin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Home className="w-6 h-6" />
            <span className="text-lg font-medium">Cabin</span>
          </div>
        </button>

        <button
          onClick={() => handleSelect('hotel')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            formData.propertyType === 'hotel'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="Hotel"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Building2 className="w-6 h-6" />
            <span className="text-lg font-medium">Hotel</span>
          </div>
        </button>
      </div>

      <FormFooter />
    </div>
  );
};

export default PropertyType;