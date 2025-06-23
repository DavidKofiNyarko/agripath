import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email) {
      setError('Please fill in all required fields.');
      return;
    }
    setStep('loading');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('form');
    setForm({ name: '', email: '', phone: '' });
    setError('');
    onClose();
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center mb-2 text-primary">Join the Waitlist</h2>
                <p className="text-center text-gray-600 mb-2 text-sm">Be the first to know when we launch!</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:outline-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:outline-primary"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={form.phone}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:outline-primary"
                />
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-primary/90 transition-all"
                >
                  Join Waitlist
                </button>
              </form>
            )}
            {step === 'loading' && (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <p className="text-primary font-semibold">Submitting...</p>
              </div>
            )}
            {step === 'success' && (
              <motion.div
                className="flex flex-col items-center justify-center py-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="bg-green-100 rounded-full p-4 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="green"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal; 