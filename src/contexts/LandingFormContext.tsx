
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LandingFormData {
  businessName: string;
  tagline: string;
  description: string;
  features: string[];
  callToAction: string;
  theme: 'light' | 'dark' | 'minimal' | 'vibrant';
  template: 'startup' | 'saas' | 'portfolio' | 'ecommerce';
  primaryColor: string;
  fontFamily: string;
  logoUrl?: string;
  coverImageUrl?: string;
}

interface LandingFormContextType {
  formData: LandingFormData;
  updateFormData: (data: Partial<LandingFormData>) => void;
}

const defaultFormData: LandingFormData = {
  businessName: 'Your Business',
  tagline: 'Transform your ideas into reality',
  description: 'We help businesses achieve their goals with innovative solutions and exceptional service.',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  callToAction: 'Get Started',
  theme: 'light',
  template: 'startup',
  primaryColor: '#6366f1',
  fontFamily: 'Inter',
};

const LandingFormContext = createContext<LandingFormContextType | undefined>(undefined);

export const LandingFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<LandingFormData>(defaultFormData);

  const updateFormData = (data: Partial<LandingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <LandingFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </LandingFormContext.Provider>
  );
};

export const useLandingForm = () => {
  const context = useContext(LandingFormContext);
  if (!context) {
    throw new Error('useLandingForm must be used within a LandingFormProvider');
  }
  return context;
};
