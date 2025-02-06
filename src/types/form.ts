export interface PropertyFormData {
  // Basic Information
  propertyName: string;
  email: string;
  googleMapsUrl: string;
  location: {
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
  };

  // Property Type
  propertyType: 'cabin' | 'hotel' | '';

  // Capacity
  capacity: {
    guests: number;
    bathrooms: number;
    bedrooms: number;
    beds: number;
  };

  // Amenities
  amenities: {
    ac: boolean;
    bedSheets: boolean;
    coffeeMachine: boolean;
    extraBed: boolean;
    freeParking: boolean;
    garden: boolean;
    glassesPlates: boolean;
    hotWater: boolean;
    kitchen: boolean;
    laundry: boolean;
    oven: boolean;
    petFriendly: boolean;
    pool: boolean;
    refrigerator: boolean;
    smoking: boolean;
    towels: boolean;
    tv: boolean;
    wifi: boolean;
  };

  // Pricing and Schedule
  pricing: {
    pricePerNight: number;
    currency: 'USD' | 'MXN';
    checkInTime: string;
    checkOutTime: string;
  };

  // Images
  images: string[];
}

export interface FormErrors {
  propertyName: string;
  email: string;
  googleMapsUrl: string;
  location: {
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
  };
}

export interface FormContextType {
  formData: PropertyFormData;
  currentStep: number;
  errors: FormErrors;
  direction: 'forward' | 'back';
  isAnimating: boolean;
  setFormData: (data: PropertyFormData) => void;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (step: number) => void;
  handleImageUpload: (files: FileList) => void;
  removeImage: (index: number) => void;
  resetForm: () => void;
}