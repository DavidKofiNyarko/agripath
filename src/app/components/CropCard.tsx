'use client'
import React from 'react';
import Link from 'next/link';
import { Crop } from '../data/crops';

interface CropCardProps {
  crop: Crop;
  showButton?: boolean;
  onInvest?: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, showButton = true, onInvest }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onInvest) {
      e.preventDefault();
      onInvest();
    }
  };

  return (
    <div className="bg-white w-[288px] h-[420px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div 
        className="block h-[209px] rounded-md cursor-pointer" 
        onClick={onInvest ? handleClick : undefined}
      >
        <div className="relative h-full">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`text-white text-xs font-semibold flex items-center justify-center
                ${crop.status === 'Coming soon'
                  ? 'bg-[#DC3545] w-[117px] h-[32px] pt-1 pb-1 pl-[11px] pr-[11px] rounded-[30px] border border-white'
                  : 'bg-[#28A745] w-[87px] h-[32px] pt-1 pb-1 pl-[11px] pr-[11px] rounded-[30px] border border-white'
                }
              `}
            >
              {crop.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{crop.name}</h3>
          
          <div className="mt-1 flex items-baseline">
            <span className="text-xl font-bold text-gray-900">{crop.price}</span>
            <span className="ml-1 text-sm text-yellow-500">{crop.unit}</span>
          </div>

          <div className="mt-2">
            <div className="text-sm text-gray-600">ROI: {crop.roiValue}</div>
            <div className="text-sm text-gray-600 mt-0.5">Starting - {crop.maturityTime}</div>
            <div className="flex items-center mt-0.5">
              <span className="text-sm text-green-500">{crop.unitsSold} Units Available</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
            {showButton && (
            <button 
            onClick={handleClick}
            className="w-68 h-10 flex items-center justify-center gap-2 py-2 px-0 rounded-lg border border-primary text-primary font-bold hover:bg-yellow-50 transition duration-300 text-sm"
            >
            {crop.status === 'Coming soon' ? 'Invest Now' : 'Invest Now'}
            </button>
        )}
        </div>

      
      </div>
    </div>
  );
};

export default CropCard;