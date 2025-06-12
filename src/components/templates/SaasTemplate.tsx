
import React from 'react';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Play, Star } from 'lucide-react';

const SaasTemplate = () => {
  const { formData } = useLandingForm();

  const getThemeClasses = () => {
    switch (formData.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'minimal':
        return 'bg-gray-50 text-gray-900';
      case 'vibrant':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getPrimaryColorStyle = () => ({
    backgroundColor: formData.primaryColor,
  });

  return (
    <div className={`min-h-full ${getThemeClasses()}`} style={{ fontFamily: formData.fontFamily }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">{formData.businessName}</div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Features</span>
            <span className="text-sm">Pricing</span>
            <Button size="sm" style={getPrimaryColorStyle()} className="text-white">
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            {formData.tagline}
          </h1>
          <p className="text-xl mb-8 opacity-80">
            {formData.description}
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="text-white font-semibold px-8"
              style={getPrimaryColorStyle()}
            >
              {formData.callToAction}
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm opacity-70">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: formData.primaryColor }} />
              ))}
            </div>
            <span>Rated 4.9/5 by 1000+ users</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formData.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                <p className="text-sm opacity-70">
                  Powerful feature that helps you achieve your goals faster and more efficiently.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Simple, transparent pricing
          </h2>
          <Card className={`p-8 ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">
                <span style={{ color: formData.primaryColor }}>$29</span>
                <span className="text-lg opacity-70">/month</span>
              </div>
              <Button 
                size="lg" 
                className="w-full text-white font-semibold mb-6"
                style={getPrimaryColorStyle()}
              >
                {formData.callToAction}
              </Button>
              <div className="space-y-2 text-left">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: formData.primaryColor }} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SaasTemplate;
