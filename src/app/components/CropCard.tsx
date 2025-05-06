import React from 'react';
import Link from 'next/link';
import { Crop } from '../data/crops';

interface CropCardProps {
  crop: Crop;
  showButton?: boolean;
}

const CropCard: React.FC<CropCardProps> = ({ crop, showButton = true }) => {
  return (
    <div className="bg-white w-[288px] h-[420px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/crops/${crop.slug}`} className="block h-[209px] rounded-md">
        <div className="relative h-full">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {crop.status}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col h-[200px]">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{crop.name}</h3>
        
        <div className="mt-1 flex items-baseline">
          <span className="text-xl font-bold text-gray-900">{crop.price}</span>
          <span className="ml-1 text-sm text-yellow-500">{crop.unit}</span>
        </div>

        <div className="mt-2 flex-1">
          <div className="text-sm text-gray-600">ROI: {crop.roiValue}</div>
          <div className="text-sm text-gray-600 mt-0.5">Starting - {crop.maturityTime}</div>
          <div className="flex items-center mt-0.5">
            <span className="text-sm text-green-500">{crop.unitsSold} Units Available</span>
          </div>
        </div>

        {showButton && (
          <Link href={`/crops/${crop.slug}`} className="block mt-auto">
            <button className="w-[272px] h-[40px] gap-2 py-2 px-0 rounded-lg border border-primary hover:bg-[#FAF3E7] text-primary font-bold hover:bg-[#f5e9d7] transition duration-300 text-sm">
              {crop.status === "Available" ? "Invest Now" : "Learn More"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CropCard;