import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { AirVent, Bed, Coffee, BedDouble, Car, Trees as Tree, Wine, Droplets, ChefHat, WashingMachine, Pen as Oven, Dog, School as Pool, Refrigerator, Cigarette, Bath, Tv, Wifi } from 'lucide-react';
import FormFooter from '../FormFooter';

interface AmenityToggleProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

const AmenityToggle: React.FC<AmenityToggleProps> = ({
  label,
  icon,
  checked,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2
      ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
  >
    {icon}
    <span className="text-sm font-medium text-center">{label}</span>
  </button>
);

const amenityIcons = {
  ac: <AirVent className="w-6 h-6" />,
  bedSheets: <Bed className="w-6 h-6" />,
  coffeeMachine: <Coffee className="w-6 h-6" />,
  extraBed: <BedDouble className="w-6 h-6" />,
  freeParking: <Car className="w-6 h-6" />,
  garden: <Tree className="w-6 h-6" />,
  glassesPlates: <Wine className="w-6 h-6" />,
  hotWater: <Droplets className="w-6 h-6" />,
  kitchen: <ChefHat className="w-6 h-6" />,
  laundry: <WashingMachine className="w-6 h-6" />,
  oven: <Oven className="w-6 h-6" />,
  petFriendly: <Dog className="w-6 h-6" />,
  pool: <Pool className="w-6 h-6" />,
  refrigerator: <Refrigerator className="w-6 h-6" />,
  smoking: <Cigarette className="w-6 h-6" />,
  towels: <Bath className="w-6 h-6" />,
  tv: <Tv className="w-6 h-6" />,
  wifi: <Wifi className="w-6 h-6" />,
};

const amenityLabels = {
  ac: 'Air Conditioning',
  bedSheets: 'Bed Sheets',
  coffeeMachine: 'Coffee Machine',
  extraBed: 'Extra Bed',
  freeParking: 'Free Parking',
  garden: 'Garden',
  glassesPlates: 'Glasses & Plates',
  hotWater: 'Hot Water',
  kitchen: 'Kitchen',
  laundry: 'Laundry',
  oven: 'Oven',
  petFriendly: 'Pet Friendly',
  pool: 'Pool',
  refrigerator: 'Refrigerator',
  smoking: 'Smoking Allowed',
  towels: 'Towels',
  tv: 'TV',
  wifi: 'WiFi',
};

const Amenities: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const toggleAmenity = (amenity: keyof typeof formData.amenities) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: !formData.amenities[amenity],
      },
    });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Property Amenities</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {(Object.keys(formData.amenities) as Array<keyof typeof formData.amenities>).map((amenity) => (
          <AmenityToggle
            key={amenity}
            label={amenityLabels[amenity]}
            icon={amenityIcons[amenity]}
            checked={formData.amenities[amenity]}
            onChange={() => toggleAmenity(amenity)}
          />
        ))}
      </div>

      <FormFooter />
    </div>
  );
};

export default Amenities;