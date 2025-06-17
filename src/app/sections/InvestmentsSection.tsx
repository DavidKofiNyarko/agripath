'use client'
import React, { useState } from "react";
import CropCard from "../components/CropCard";
import { crops } from "../data/crops";
import InvestmentFormModal from "../components/InvestmentFormModal";

const AvailableInvestments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | undefined>(undefined);

  const handleOpenModal = (cropName: string) => {
    setSelectedCrop(cropName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCrop(undefined);
  };

  return (
    <div id="investments" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-green-600 text-center mb-2 sm:mb-3">
        Available Investments
      </h2>
      <p className="text-gray-600 text-center mb-6 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
        Explore exclusive investment opportunities in agriculture, designed for
        sustainable growth and high returns.
      </p>

      {/* Investment Grid */}
      <div className="flex justify-center max-w-7xl mx-auto">
         <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 mb-8 justify-items-center">
        {crops.map((crop) => (
          <CropCard 
            key={crop.id} 
            crop={crop} 
            onInvest={() => handleOpenModal(crop.name)}
          />
        ))}
      </div>
     </div>

      {/* Investment Form Modal */}
      <InvestmentFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        preSelectedCrop={selectedCrop}
      />
    </div>
  );
};

export default AvailableInvestments;
