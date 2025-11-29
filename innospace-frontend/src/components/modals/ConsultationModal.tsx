import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    propertyType: '2 BHK',
    location: '',
    name: '',
    mobile: '',
    whatsappUpdates: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
  const cities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
    'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad', 'Morbi', 'Mehsana', 'Bharuch'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select your city';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to CMS backend
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          location: formData.location,
          propertyType: formData.propertyType,
          whatsappUpdates: formData.whatsappUpdates,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit consultation request');
      }

      console.log('Consultation request submitted successfully:', result);
      setIsSubmitted(true);
      
      // Auto close after success
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        // Reset form
        setFormData({
          propertyType: '2 BHK',
          location: '',
          name: '',
          mobile: '',
          whatsappUpdates: true
        });
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      // Show error message to user
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.mobile.trim() && formData.location;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>

            {/* Compact Promotional Header - Mobile Optimized */}
            <div className="relative bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-300 p-3 text-center">
              {/* Decorative Elements - Smaller */}
              <div className="absolute top-1 left-3 text-lg">�</div>
              <div className="absolute top-1 right-3 text-lg">✨</div>
              
              {/* Compact Banner */}
              <div className="bg-white bg-opacity-95 rounded-lg p-2 mb-2">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="bg-yellow-400 text-black px-1.5 py-0.5 rounded text-xs font-bold">Enjoy</div>
                  <div className="text-base font-black text-red-700">FLAT 25% OFF</div>
                </div>
                <div className="text-xs text-teal-600 font-semibold">On Modular Interiors</div>
                <div className="text-xs text-gray-600">Book Before 30th Nov 2025</div>
              </div>
              
              <h2 className="text-white font-bold text-base">Get a free design consultation</h2>
            </div>

            {/* Form Content - Compact */}
            <div className="flex-1 p-3 overflow-y-auto">
              {isSubmitted ? (
                /* Success State - Compact */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Our design expert will contact you within 24 hours.
                  </p>
                  <div className="text-xs text-gray-500">
                    Closing automatically...
                  </div>
                </motion.div>
              ) : (
                /* Form - Compact */
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Property Type - Compact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Property type
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {propertyTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange('propertyType', type)}
                          className={`px-2 py-1.5 text-xs font-medium rounded border transition-all ${
                            formData.propertyType === type
                              ? 'bg-primary-50 border-primary-200 text-primary-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Location - Compact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Property Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full px-2.5 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent ${
                        errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your city</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="mt-0.5 text-xs text-red-600">{errors.location}</p>
                    )}
                  </div>

                  {/* Name - Compact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-2.5 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && (
                      <p className="mt-0.5 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Mobile Number - Compact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <div className={`flex items-center px-2.5 py-2 border border-r-0 rounded-l-lg bg-gray-50 ${
                        errors.mobile ? 'border-red-300' : 'border-gray-300'
                      }`}>
                        <span className="text-xs text-gray-600">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => {
                          // Only allow numbers and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleInputChange('mobile', value);
                        }}
                        className={`flex-1 px-2.5 py-2 text-sm border rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent ${
                          errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Mobile Number"
                        maxLength={10}
                        required
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-0.5 text-xs text-red-600">{errors.mobile}</p>
                    )}
                  </div>

                  {/* WhatsApp Updates - Compact */}
                  <div className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                    <input
                      type="checkbox"
                      id="whatsapp"
                      checked={formData.whatsappUpdates}
                      onChange={(e) => handleInputChange('whatsappUpdates', e.target.checked)}
                      className="w-3.5 h-3.5 text-green-600 border-green-300 rounded focus:ring-green-500 mt-0.5"
                    />
                    <label htmlFor="whatsapp" className="text-xs text-gray-700 flex items-center flex-1">
                      <CheckIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                      <span>Yes, send me updates via WhatsApp</span>
                      <span className="ml-1 text-sm">📱</span>
                    </label>
                  </div>

                  {/* Submit Button - Compact */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Booking...</span>
                      </div>
                    ) : (
                      'Book a Free Consultation'
                    )}
                  </button>

                  {/* Submission Error */}
                  {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                    </div>
                  )}

                  {/* Terms - Compact */}
                  <p className="text-xs text-gray-600 text-center leading-tight">
                    By submitting, you consent to{' '}
                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">privacy policy</a>
                    {' '}and{' '}
                    <a href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline">terms of use</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;