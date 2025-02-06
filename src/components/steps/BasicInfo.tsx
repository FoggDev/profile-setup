import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormFooter from '../FormFooter';

const countries = ['United States', 'Mexico', 'Canada'];
const states = {
  'United States': ['California', 'New York', 'Texas'],
  'Mexico': ['Jalisco', 'Nuevo León', 'Quintana Roo'],
  'Canada': ['Ontario', 'British Columbia', 'Quebec'],
};

const cities = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'New York': ['New York City', 'Buffalo', 'Albany'],
  'Texas': ['Austin', 'Houston', 'Dallas'],
  // Add more cities as needed
};

const BasicInfo: React.FC = () => {
  const { formData, setFormData, errors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getInputClassName = (error: string) =>
    `w-full px-4 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
      error ? 'border-red-500' : 'border-gray-200'
    }`;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Basic Property Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name *
          </label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            className={getInputClassName(errors.propertyName)}
          />
          {errors.propertyName && (
            <p className="mt-1 text-sm text-red-500">{errors.propertyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClassName(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps URL *
          </label>
          <input
            type="url"
            name="googleMapsUrl"
            value={formData.googleMapsUrl}
            onChange={handleChange}
            className={getInputClassName(errors.googleMapsUrl)}
          />
          {errors.googleMapsUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.googleMapsUrl}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              className={getInputClassName(errors.location.country)}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.location.country && (
              <p className="mt-1 text-sm text-red-500">{errors.location.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <select
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              className={getInputClassName(errors.location.state)}
            >
              <option value="">Select State</option>
              {formData.location.country && states[formData.location.country as keyof typeof states]?.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.location.state && (
              <p className="mt-1 text-sm text-red-500">{errors.location.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <select
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className={getInputClassName(errors.location.city)}
            >
              <option value="">Select City</option>
              {formData.location.state && cities[formData.location.state as keyof typeof cities]?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.location.city && (
              <p className="mt-1 text-sm text-red-500">{errors.location.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              name="location.zipCode"
              value={formData.location.zipCode}
              onChange={handleChange}
              className={getInputClassName(errors.location.zipCode)}
            />
            {errors.location.zipCode && (
              <p className="mt-1 text-sm text-red-500">{errors.location.zipCode}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className={getInputClassName(errors.location.address)}
          />
          {errors.location.address && (
            <p className="mt-1 text-sm text-red-500">{errors.location.address}</p>
          )}
        </div>
      </div>

      <FormFooter showBack={false} />
    </div>
  );
};

export default BasicInfo;