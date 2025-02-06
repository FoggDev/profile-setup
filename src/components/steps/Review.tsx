import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Edit3, MapPin, Home, Users, Sparkles, DollarSign, Image as ImageIcon } from 'lucide-react';
import FormFooter from '../FormFooter';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, onEdit, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <button
        onClick={onEdit}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Edit3 className="w-4 h-4" />
      </button>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Review: React.FC = () => {
  const { formData, jumpToStep } = useFormContext();

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Review Your Listing</h2>
      
      <div className="space-y-6">
        <Section
          title="Basic Information"
          icon={<MapPin className="w-5 h-5" />}
          onEdit={() => jumpToStep(1)}
        >
          <div className="space-y-2">
            <p><strong>Property Name:</strong> {formData.propertyName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Location:</strong> {formData.location.address}, {formData.location.city}, {formData.location.state}, {formData.location.country}</p>
          </div>
        </Section>

        <Section
          title="Property Type"
          icon={<Home className="w-5 h-5" />}
          onEdit={() => jumpToStep(2)}
        >
          <p className="capitalize">{formData.propertyType}</p>
        </Section>

        <Section
          title="Capacity"
          icon={<Users className="w-5 h-5" />}
          onEdit={() => jumpToStep(3)}
        >
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Guests:</strong> {formData.capacity.guests}</p>
            <p><strong>Bathrooms:</strong> {formData.capacity.bathrooms}</p>
            <p><strong>Bedrooms:</strong> {formData.capacity.bedrooms}</p>
            <p><strong>Beds:</strong> {formData.capacity.beds}</p>
          </div>
        </Section>

        <Section
          title="Amenities"
          icon={<Sparkles className="w-5 h-5" />}
          onEdit={() => jumpToStep(4)}
        >
          <div className="flex flex-wrap gap-2">
            {Object.entries(formData.amenities)
              .filter(([, value]) => value)
              .map(([key]) => (
                <span
                  key={key}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
          </div>
        </Section>

        <Section
          title="Pricing & Schedule"
          icon={<DollarSign className="w-5 h-5" />}
          onEdit={() => jumpToStep(5)}
        >
          <div className="space-y-2">
            <p><strong>Price per Night:</strong> {formData.pricing.currency} {formData.pricing.pricePerNight}</p>
            <p><strong>Check-in Time:</strong> {formData.pricing.checkInTime}</p>
            <p><strong>Check-out Time:</strong> {formData.pricing.checkOutTime}</p>
          </div>
        </Section>

        <Section
          title="Images"
          icon={<ImageIcon className="w-5 h-5" />}
          onEdit={() => jumpToStep(6)}
        >
          <div className="grid grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </Section>
      </div>

      <FormFooter nextLabel="Finish" />
    </div>
  );
};

export default Review