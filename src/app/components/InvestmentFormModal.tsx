'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, CloudCog } from 'lucide-react';
import { select } from 'framer-motion/client';
import { crops } from '../data/crops';

interface InvestmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCrop?: string;
}

// Extract crop names from the data
const cropOptions = crops.map(crop => crop.name);

const unitOptions = [
  '1 Unit',
  '2 Units',
  '3 Units',
  '4 Units',
  '4+ Units',
  'Other'
];

export default function InvestmentFormModal({ isOpen, onClose, preSelectedCrop }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+233',
    selectedCrops: [] as string[],
    selectedUnits: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize with pre-selected crop when modal opens
  useEffect(() => {
    if (isOpen && preSelectedCrop && cropOptions.includes(preSelectedCrop)) {
      setFormData(prev => ({
        ...prev,
        selectedCrops: prev.selectedCrops.includes(preSelectedCrop) 
          ? prev.selectedCrops 
          : [...prev.selectedCrops, preSelectedCrop]
      }));
    }
  }, [isOpen, preSelectedCrop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const airtableBaseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const airtableTableId= process.env.NEXT_PUBLIC_AIRTABLE_INVEST_TABLE_ID;
    const airtableApiKey= process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // TODO: Connect to Airtable
     
        await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,{
          method:"POST",
          headers:{
            Authorization:`Bearer ${airtableApiKey}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            fields:{
              name:formData.name,
              email:formData.email,
              phone:`${formData.countryCode} ${formData.phone}`,
              selectedCrops:formData.selectedCrops.join(', '),
              selectedUnits: formData.selectedUnits,
            }
          })
          
        })
     
      // console.log('Form submitted:', formData);
      setShowSuccess(true);
      setIsLoading(false);    
      
         
      // Reset form after 2 seconds of showing success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+233',
          selectedCrops: [],
          selectedUnits: '',
        });
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  const handleCropSelection = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: prev.selectedCrops.includes(crop)
        ? prev.selectedCrops.filter(c => c !== crop)
        : [...prev.selectedCrops, crop]
    }));
  };

  // Success modal component
  const SuccessDialog = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm text-center shadow-xl mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4"
        >
          <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-sm sm:text-base text-gray-600">
          Your investment request has been received. We'll get back to you soon.
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl w-[95%] max-w-md max-h-[90vh] p-4 sm:p-6 relative overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Form Header */}
            <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Let's Grow Together</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Choose your crop, tell us how many units you want, and we'll take it from there.
              </p>
            </div>

            {/* Investment Form */}
            <div className="overflow-y-auto pr-2 flex-grow custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    What's your name? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Michael Doe"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    What's your email address? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="michael@example.com"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    What's your phone number? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                      className="px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+255">🇹🇿 +255</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="550 000 000"
                      className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Crop Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Which crop are you investing in? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cropOptions.map((crop) => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleCropSelection(crop)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                          formData.selectedCrops.includes(crop)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Units Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    How many units would you like to invest in? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {unitOptions.map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, selectedUnits: unit }))}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                          formData.selectedUnits === unit
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 relative overflow-hidden mt-4
                    ${isLoading ? 'bg-green-600 text-transparent' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                    ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                  </span>
                  <span className={`transition-opacity duration-300
                    ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    Send
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccess && <SuccessDialog />}
      </AnimatePresence>
    </AnimatePresence>
  );
} 