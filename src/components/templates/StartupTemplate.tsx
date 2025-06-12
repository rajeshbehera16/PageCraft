
import React from 'react';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

const StartupTemplate = () => {
  const { formData } = useLandingForm();

  const getThemeClasses = () => {
    switch (formData.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'minimal':
        return 'bg-gray-50 text-gray-900';
      case 'vibrant':
        return 'bg-gradient-to-br from-purple-600 to-blue-600 text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getPrimaryColorStyle = () => ({
    backgroundColor: formData.primaryColor,
  });

  return (
    <div className={`min-h-full ${getThemeClasses()}`} style={{ fontFamily: formData.fontFamily }}>
      {/* Hero Section */}
      <div className="px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {formData.businessName}
        </h1>
        <p className="text-xl mb-6 opacity-80">
          {formData.tagline}
        </p>
        <p className="text-lg mb-8 opacity-70 max-w-2xl mx-auto">
          {formData.description}
        </p>
        <Button 
          size="lg" 
          className="text-white font-semibold px-8 py-3"
          style={getPrimaryColorStyle()}
        >
          {formData.callToAction}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formData.features.map((feature, index) => (
            <Card key={index} className={`p-6 text-center ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CheckCircle 
                className="w-8 h-8 mx-auto mb-4" 
                style={{ color: formData.primaryColor }}
              />
              <h3 className="font-semibold mb-2">{feature}</h3>
              <p className="text-sm opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-6 opacity-70">
          Join thousands of satisfied customers today
        </p>
        <Button 
          size="lg" 
          className="text-white font-semibold px-8 py-3"
          style={getPrimaryColorStyle()}
        >
          {formData.callToAction} Now
        </Button>
      </div>
    </div>
  );
};

export default StartupTemplate;
