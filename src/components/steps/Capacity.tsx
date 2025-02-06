import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Minus, Plus, Users, Bath, Bed, Hotel } from 'lucide-react';
import FormFooter from '../FormFooter';

const CapacityCounter: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, value, icon, min, max, onChange }) => (
  <div className="p-4 rounded-lg border border-gray-200">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <div className="flex items-center justify-between">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus className="w-5 h-5" />
      </button>
      <span className="text-xl font-semibold">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const Capacity: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (field: keyof typeof formData.capacity, value: number) => {
    setFormData({
      ...formData,
      capacity: {
        ...formData.capacity,
        [field]: value,
      },
    });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Property Capacity</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CapacityCounter
          label="Guests"
          value={formData.capacity.guests}
          icon={<Users className="w-5 h-5" />}
          min={1}
          max={20}
          onChange={(value) => handleChange('guests', value)}
        />
        <CapacityCounter
          label="Bathrooms"
          value={formData.capacity.bathrooms}
          icon={<Bath className="w-5 h-5" />}
          min={1}
          max={10}
          onChange={(value) => handleChange('bathrooms', value)}
        />
        <CapacityCounter
          label="Bedrooms"
          value={formData.capacity.bedrooms}
          icon={<Hotel className="w-5 h-5" />}
          min={1}
          max={10}
          onChange={(value) => handleChange('bedrooms', value)}
        />
        <CapacityCounter
          label="Beds"
          value={formData.capacity.beds}
          icon={<Bed className="w-5 h-5" />}
          min={1}
          max={10}
          onChange={(value) => handleChange('beds', value)}
        />
      </div>

      <FormFooter />
    </div>
  );
};

export default Capacity;