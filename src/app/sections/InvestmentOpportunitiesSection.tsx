'use client'

import { Gochi_Hand } from "next/font/google";
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvestmentFormModal from '../components/InvestmentFormModal';

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const investmentOpportunities = [
  {
    id: 1,
    title: "Invest in Staple Crop Farms with High Returns",
    description: "Gain returns from investing in essential root crops—cassava, and high-yield staple crops. Agripath's model leverages modern, sustainable practices and offers high-impact, high-return opportunities, empowering a new generation of African agriculture.",
    idealFor: "Best for socially-driven investors seeking returns and local impact.",
    image: "/investments/cassava.png",
    category: "Root Crops"
  },
  {
    id: 2,
    subtitle: "Fast-Growing. Market-Ready. Proven Demand.",
    title: "Fund Sustainable Pig Farming with Market-Linked Returns",
    description: "Drive the future of livestock farming by funding sustainable, high-welfare pig production. Agripath's pig farming projects are designed for efficiency, animal care, and strong returns, with a transparent financial ecosystem.",
    idealFor: "Investors seeking predictable returns with social and animal welfare impact.",
    image: "/investments/pigs.jpg", 
    category: "Pig Farming"
  },
  {
    id: 3,
    subtitle: "Fast-Growing. Market-Ready. Proven Demand.",
    title: "Fund Entire Farm Productions for Higher Returns and Deeper Impact",
    description: "Become a key value chain investor and fund the setup of full-scale farm operations—crop, livestock, greenhouse, and more. Agripath's end-to-end farm projects offer the highest returns and the deepest impact.",
    idealFor: "For those who want to maximize returns and create lasting change.",
    image: "/investments/project.png",
    category: "Premium Projects"
  }
];

const InvestmentOpportunitiesSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handleInvestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" w-full p-4 sm:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="text-center p-2 py-4 sm:py-8 mb-8"
          >
            <h2 className={`text-3xl sm:text-4xl text-primary font-semibold ${gochiHand.className}`}>
              Investment <span className="text-primary-foreground"> Opportunities</span>
            </h2>
            <motion.p 
              className="font-sans font-medium text-lg leading-7 tracking-normal text-center text-[#828282] max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore exclusive investment opportunities in agriculture, designed for sustainable growth and high returns.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="flex justify-center gap-8 mb-8 relative"
          >
            {['Root Crops', 'Pig Farming', 'Premium Projects'].map((category, index) => (
              <button
                key={category}
                onClick={() => goToSlide(index)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeIndex === index 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {category}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.2,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="space-y-6"
                    >
                        <span className="block text-sm font-semibold  mb-2">
                          {investmentOpportunities[activeIndex].subtitle}
                        </span>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {investmentOpportunities[activeIndex].title}
                      </h3>
                      <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {investmentOpportunities[activeIndex].description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="font-medium text-gray-900 mb-2">Ideal For:</h4>
                        <p className="text-gray-600">
                          {investmentOpportunities[activeIndex].idealFor}
                        </p>
                      </motion.div>
                      <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div>
                          <button 
                            onClick={handleInvestClick}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Invest Now
                          </button>
                        </div>
                        
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.3,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="relative h-[400px] max-w-[621px] overflow-hidden"
                    >
                      <img
                        src={investmentOpportunities[activeIndex].image}
                        alt={investmentOpportunities[activeIndex].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <InvestmentFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default InvestmentOpportunitiesSection;