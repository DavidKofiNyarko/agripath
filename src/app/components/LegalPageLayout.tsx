'use client';
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import AgripathFooter from '../sections/footer';
import Link from 'next/link';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ 
  title, 
  lastUpdated,
  children 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-green-800 pt-28 text-white text-center pb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          {lastUpdated && (
            <p className="text-sm mt-1 opacity-90">Last Updated: {lastUpdated}</p>
          )}
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white border-b">
        <div className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-semibold">{title}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl my-6 sm:my-8 bg-white rounded-lg shadow-sm">
        {children}
      </div>
      
      <AgripathFooter />
    </div>
  );
};

export default LegalPageLayout; 