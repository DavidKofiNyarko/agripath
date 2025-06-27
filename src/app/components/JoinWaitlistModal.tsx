'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FarmerFormModal from './FarmerFormModal';
import InvestmentFormModal from './InvestmentFormModal';
import OffTakerFormModal from './OffTakerFormModal';
import { X, Check, AlertCircle, ArrowRight } from 'lucide-react';

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
  initial: { 
    opacity: 0, 
    x: 30,
    scale: 0.96
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30, 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
  exit: { 
    opacity: 0, 
    x: -30,
    scale: 0.96,
    transition: { 
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
};

const formSlideVariants = {
  initial: { 
    opacity: 0, 
    x: 50,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 28, 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    } 
  },
  exit: { 
    opacity: 0, 
    x: -50,
    scale: 0.95,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    } 
  },
};

const containerVariants = {
  step1: {
    height: 'auto',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  step2: {
    height: 'auto',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 0.4
    }
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
};

const buttonVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
};

const JoinWaitlistModal: React.FC<JoinWaitlistModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'farmer' | 'investor' | 'buyer' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleTypeSelect = (type: 'farmer' | 'investor' | 'buyer') => {
    setSelectedType(type);
    setError(null);
  };

  const handleNext = () => {
    if (!selectedType) {
      setError('Please select an option to continue.');
      return;
    }
    
    // Start closing animation
    setIsClosing(true);
    setError(null);
    
    // Close this modal and open form modal after animation
    setTimeout(() => {
      setShowFormModal(true);
    }, 400); // Wait for close animation
  };

  const handleBack = () => {
    setShowFormModal(false);
    setIsClosing(false);
    setSelectedType(null);
    setError(null);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setStep(3);
    setShowFormModal(false);
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
    setShowFormModal(false);
    setIsClosing(false);
    onClose();
  };

  const handleFormClose = () => {
    setShowFormModal(false);
    setIsClosing(false);
    setSelectedType(null);
    setError(null);
  };

  // Pass these handlers to the form modals
  const formProps = {
    isOpen: showFormModal,
    onClose: handleFormClose,
    onSuccess: handleSuccess,
    onError: handleError,
    setLoading: setLoading,
  };

  return (
    <>
      <AnimatePresence>
        {(open && !isClosing && !showFormModal) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="bg-white rounded-3xl border border-[#1C442A33] shadow-[0_0_52.8px_0_#0000001A] w-full max-w-[576px] min-h-[488.88px] p-4 sm:p-6 md:p-12 mx-2 sm:mx-4 md:mx-2 relative overflow-hidden max-h-[90vh] sm:max-h-[85vh]"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                height: 'auto'
              }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              layout
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 25,
                duration: 0.4
              }}
            >
              <button
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl font-bold z-10 p-1 sm:p-0"
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
                    <div className="text-center mb-3 sm:mb-2">
                      <span className="block text-xl sm:text-[22px] md:text-2xl font-normal" style={{ color: '#F6C768', fontFamily: 'Gochi Hand, cursive' }}>Hi there!</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-2 text-primary">What best describes you?</h2>
                    <p className="text-center text-gray-600 mb-6 sm:mb-4 text-sm px-2 sm:px-0">This helps us provide the best service.</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-[33px] mb-6 sm:mb-4">
                      {userTypes.map((type, index) => {
                        // Determine selected background color
                        let selectedBg = '';
                        if (selectedType === type.value) {
                          if (type.value === 'investor') selectedBg = 'bg-[#F6F1E6]';
                          if (type.value === 'farmer') selectedBg = 'bg-[#E6F6EA]';
                          if (type.value === 'buyer') selectedBg = 'bg-[#E6F1F6]';
                        }
                        return (
                          <motion.button
                            key={type.value}
                            className={`w-full sm:w-[120px] md:w-[144px] h-[140px] sm:h-[160px] md:h-[176.88px] border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all ${selectedType === type.value ? 'border-green-700 ring-2 ring-green-700 ' + selectedBg : 'border-gray-200 bg-white'}`}
                            onClick={() => handleTypeSelect(type.value as any)}
                            type="button"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            transition={{
                              delay: index * 0.1,
                              type: 'spring',
                              stiffness: 300,
                              damping: 25
                            }}
                          >
                            <motion.img 
                              src={type.img} 
                              alt={type.label} 
                              className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 object-cover rounded-md"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (index * 0.1) + 0.2, duration: 0.3 }}
                            />
                            <motion.span 
                              className="font-semibold text-sm text-center px-1"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: (index * 0.1) + 0.3, duration: 0.3 }}
                            >
                              {type.label}
                            </motion.span>
                          </motion.button>
                        );
                      })}
                    </div>
                    {error && (
                      <motion.div
                        className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4 sm:mb-2 text-sm justify-center mx-2 sm:mx-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" /> 
                        <span className="text-center">{error}</span>
                      </motion.div>
                    )}
                    <div className="flex justify-between mt-4 sm:mt-2">
                      <div />
                      <motion.button
                        className="w-full bg-primary text-primary-foreground py-3 sm:py-3 md:py-3 px-6 rounded-lg font-semibold disabled:opacity-50 transition-all flex items-center justify-center gap-2 hover:bg-[#1C442A]/90 text-base sm:text-base"
                        disabled={!selectedType}
                        onClick={handleNext}
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </motion.button>
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
                    className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-0"
                  >
                    <motion.div
                      className="bg-green-100 rounded-full p-3 sm:p-4 mb-3 sm:mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <Check className="w-8 sm:w-10 h-8 sm:h-10 text-green-700" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2 text-center">Success!</h3>
                    <p className="text-center text-gray-700 mb-2 text-sm sm:text-base px-2 sm:px-0 leading-relaxed">You have joined the waitlist.<br />We'll keep you updated!</p>
                    <button
                      className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-primary/90 transition-all text-sm sm:text-base"
                      onClick={handleClose}
                    >
                      Close
                    </button>
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

      {/* Separate Form Modals */}
      {selectedType === 'farmer' && (
        <FarmerFormModal {...formProps} />
      )}
      {selectedType === 'investor' && (
        <InvestmentFormModal {...formProps} />
      )}
      {selectedType === 'buyer' && (
        <OffTakerFormModal {...formProps} />
      )}
    </>
  );
};

export default JoinWaitlistModal; 
