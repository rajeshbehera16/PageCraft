
import React from 'react';
import { Card } from '@/components/ui/card';
import BasicInfoForm from '@/components/forms/BasicInfoForm';
import FeaturesForm from '@/components/forms/FeaturesForm';
import CustomizationForm from '@/components/forms/CustomizationForm';
import TemplateSelector from '@/components/forms/TemplateSelector';

const FormSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Landing Page
        </h2>
        <p className="text-gray-600">
          Fill in the details below and watch your landing page come to life
        </p>
      </div>
      
      <div className="space-y-6">
        <TemplateSelector />
        <BasicInfoForm />
        <FeaturesForm />
        <CustomizationForm />
      </div>
    </div>
  );
};

export default FormSection;
