import React, { createContext, useContext, useState, useEffect } from 'react';
import { PropertyFormData, FormContextType, FormErrors } from '../types/form';

const initialFormData: PropertyFormData = {
  propertyName: '',
  email: '',
  googleMapsUrl: '',
  location: {
    country: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
  },
  propertyType: '',
  capacity: {
    guests: 1,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
  },
  amenities: {
    ac: false,
    bedSheets: false,
    coffeeMachine: false,
    extraBed: false,
    freeParking: false,
    garden: false,
    glassesPlates: false,
    hotWater: false,
    kitchen: false,
    laundry: false,
    oven: false,
    petFriendly: false,
    pool: false,
    refrigerator: false,
    smoking: false,
    towels: false,
    tv: false,
    wifi: false,
  },
  pricing: {
    pricePerNight: 0,
    currency: 'USD',
    checkInTime: '',
    checkOutTime: '',
  },
  images: [],
};

const initialErrors: FormErrors = {
  propertyName: '',
  email: '',
  googleMapsUrl: '',
  location: {
    country: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<PropertyFormData>(() => {
    const savedData = localStorage.getItem('propertyFormData');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });
  
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('propertyFormStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('propertyFormData', JSON.stringify(formData));
    localStorage.setItem('propertyFormStep', currentStep.toString());
  }, [formData, currentStep]);

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors(initialErrors);
    setDirection('forward');
    localStorage.removeItem('propertyFormData');
    localStorage.removeItem('propertyFormStep');
  };

  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    switch (step) {
      case 1: {
        const { propertyName, email, googleMapsUrl, location } = formData;
        
        if (!propertyName.trim()) {
          newErrors.propertyName = 'Property name is required';
          isValid = false;
        }

        if (!email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }

        if (!googleMapsUrl) {
          newErrors.googleMapsUrl = 'Google Maps URL is required';
          isValid = false;
        } else if (!googleMapsUrl.startsWith('https://')) {
          newErrors.googleMapsUrl = 'Please enter a valid HTTPS URL';
          isValid = false;
        }

        if (!location.country) {
          newErrors.location.country = 'Country is required';
          isValid = false;
        }

        if (!location.state) {
          newErrors.location.state = 'State is required';
          isValid = false;
        }

        if (!location.city) {
          newErrors.location.city = 'City is required';
          isValid = false;
        }

        if (!location.address.trim()) {
          newErrors.location.address = 'Address is required';
          isValid = false;
        }

        if (!location.zipCode) {
          newErrors.location.zipCode = 'ZIP code is required';
          isValid = false;
        } else if (!/^\d{5}(-\d{4})?$/.test(location.zipCode)) {
          newErrors.location.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
          isValid = false;
        }
        break;
      }
      // Add validation for other steps as needed
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (!isAnimating && validateStep(currentStep)) {
      if (currentStep < 8) {
        setDirection('forward');
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setIsAnimating(false);
        }, 300); // Match animation duration
      }
    }
  };

  const previousStep = () => {
    if (!isAnimating && currentStep > 1) {
      setDirection('back');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setErrors(initialErrors);
        setIsAnimating(false);
      }, 300); // Match animation duration
    }
  };

  const jumpToStep = (step: number) => {
    if (!isAnimating && step >= 1 && step <= 8) {
      setDirection(step > currentStep ? 'forward' : 'back');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(step);
        setErrors(initialErrors);
        setIsAnimating(false);
      }, 300); // Match animation duration
    }
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        errors,
        direction,
        isAnimating,
        setFormData,
        nextStep,
        previousStep,
        jumpToStep,
        handleImageUpload,
        removeImage,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};