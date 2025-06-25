'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FarmerFormModal from './FarmerFormModal';
import InvestmentFormModal from './InvestmentFormModal';
import OffTakerFormModal from './OffTakerFormModal';
import { X, Check, AlertCircle } from 'lucide-react';

interface JoinWaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

const userTypes = [
  {
    label: "I'm a Farmer",
    value: 'farmer',
    img: '/people/farmer.png',
  },
  {
    label: "I'm an Investor",
    value: 'investor',
    img: '/people/investor.png',
  },
  {
    label: "I'm a Buyer",
    value: 'buyer',
    img: '/people/buyer.png',
  },
];

const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 180, damping: 30, duration: 0.22 } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.16 } },
};

const JoinWaitlistModal: React.FC<JoinWaitlistModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'farmer' | 'investor' | 'buyer' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTypeSelect = (type: 'farmer' | 'investor' | 'buyer') => {
    setSelectedType(type);
    setError(null);
  };

  const handleNext = () => {
    if (!selectedType) {
      setError('Please select an option to continue.');
      return;
    }
    setStep(2);
    setError(null);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedType(null);
    setError(null);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setStep(3);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg || 'Something went wrong. Please try again.');
    setLoading(false);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedType(null);
    setError(null);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  // Pass these handlers to the form modals
  const formProps = {
    isOpen: true,
    onClose: handleBack,
    onSuccess: handleSuccess,
    onError: handleError,
    setLoading: setLoading,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 relative"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleClose}
              aria-label="Close"
            >
              <X />
            </button>
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h2 className="text-2xl font-bold text-center mb-2 text-primary">What best describes you?</h2>
                  <p className="text-center text-gray-600 mb-4 text-sm">This helps us provide the best service.</p>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`flex-1 border rounded-lg p-2 flex flex-col items-center gap-2 transition-all ${selectedType === type.value ? 'border-green-700 ring-2 ring-green-700' : 'border-gray-200'}`}
                        onClick={() => handleTypeSelect(type.value as any)}
                        type="button"
                      >
                        <img src={type.img} alt={type.label} className="w-24 h-24 object-cover rounded-md" />
                        <span className="font-semibold">{type.label}</span>
                      </button>
                    ))}
                  </div>
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-2 text-sm justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <AlertCircle className="w-4 h-4" /> {error}
                    </motion.div>
                  )}
                  <div className="flex justify-between mt-2">
                    <div />
                    <button
                      className="bg-green-900 text-white py-2 px-6 rounded-lg font-semibold disabled:opacity-50 transition-all"
                      disabled={!selectedType}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}
              {step === 2 && selectedType === 'farmer' && (
                <motion.div key="farmerform" variants={stepVariants} initial="initial" animate="animate" exit="exit">
                  <FarmerFormModal {...formProps} />
                  <div className="flex justify-between mt-4">
                    <button className="text-gray-600 font-medium" onClick={handleBack} type="button">Previous</button>
                  </div>
                </motion.div>
              )}
              {step === 2 && selectedType === 'investor' && (
                <motion.div key="investorform" variants={stepVariants} initial="initial" animate="animate" exit="exit">
                  <InvestmentFormModal {...formProps} />
                  <div className="flex justify-between mt-4">
                    <button className="text-gray-600 font-medium" onClick={handleBack} type="button">Previous</button>
                  </div>
                </motion.div>
              )}
              {step === 2 && selectedType === 'buyer' && (
                <motion.div key="buyerform" variants={stepVariants} initial="initial" animate="animate" exit="exit">
                  <OffTakerFormModal {...formProps} />
                  <div className="flex justify-between mt-4">
                    <button className="text-gray-600 font-medium" onClick={handleBack} type="button">Previous</button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="success"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center py-10"
                >
                  <motion.div
                    className="bg-green-100 rounded-full p-4 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  >
                    <Check className="w-10 h-10 text-green-700" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Success!</h3>
                  <p className="text-center text-gray-700 mb-2">You have joined the waitlist.<br />We'll keep you updated!</p>
                  <button
                    className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-primary/90 transition-all"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </motion.div>
              )}
              {error && step === 2 && (
                <motion.div
                  key="error"
                  className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-4 text-sm justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <AlertCircle className="w-4 h-4" /> {error}
                </motion.div>
              )}
            </AnimatePresence>
            {loading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-white/80 z-50 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="animate-spin h-8 w-8 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinWaitlistModal; 