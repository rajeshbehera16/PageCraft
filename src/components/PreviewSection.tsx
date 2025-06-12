
import React from 'react';
import { Card } from '@/components/ui/card';
import { useLandingForm } from '@/contexts/LandingFormContext';
import StartupTemplate from '@/components/templates/StartupTemplate';
import SaasTemplate from '@/components/templates/SaasTemplate';
import PortfolioTemplate from '@/components/templates/PortfolioTemplate';
import EcommerceTemplate from '@/components/templates/EcommerceTemplate';

const PreviewSection = () => {
  const { formData } = useLandingForm();

  const renderTemplate = () => {
    switch (formData.template) {
      case 'startup':
        return <StartupTemplate />;
      case 'saas':
        return <SaasTemplate />;
      case 'portfolio':
        return <PortfolioTemplate />;
      case 'ecommerce':
        return <EcommerceTemplate />;
      default:
        return <StartupTemplate />;
    }
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="text-center lg:text-left mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h3>
        <p className="text-gray-600 text-sm">See your changes in real-time</p>
      </div>
      
      <Card className="p-1 bg-white shadow-xl border-0">
        <div className="bg-gray-100 rounded-t-lg p-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="ml-4 text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
            {formData.businessName.toLowerCase().replace(/\s+/g, '')}.com
          </div>
        </div>
        
        <div className="bg-white rounded-b-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="h-full overflow-y-auto">
            {renderTemplate()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreviewSection;
