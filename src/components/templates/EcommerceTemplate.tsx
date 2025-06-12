
import React from 'react';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Star, Truck, Shield, RefreshCw } from 'lucide-react';

const EcommerceTemplate = () => {
  const { formData } = useLandingForm();

  const getThemeClasses = () => {
    switch (formData.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'minimal':
        return 'bg-white text-gray-900';
      case 'vibrant':
        return 'bg-gradient-to-br from-pink-600 to-orange-500 text-white';
      default:
        return 'bg-gray-50 text-gray-900';
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
          <div className="font-bold text-xl">{formData.businessName}</div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Products</span>
            <span className="text-sm">About</span>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Cart (0)
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              {formData.tagline}
            </h1>
            <p className="text-lg mb-8 opacity-80">
              {formData.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Button 
                size="lg" 
                className="text-white font-semibold px-8"
                style={getPrimaryColorStyle()}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {formData.callToAction}
              </Button>
              <Button variant="outline" size="lg">
                Browse Products
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm opacity-70">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: formData.primaryColor }} />
                ))}
              </div>
              <span>4.9/5 from 2,000+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className={`aspect-square ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <div 
                  className="w-full h-full rounded-lg flex items-center justify-center text-lg font-semibold"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.primaryColor}40)` 
                  }}
                >
                  Product {item}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features/Benefits */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: formData.primaryColor }}
              >
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm opacity-70">
                Free shipping on all orders over $50. Fast and reliable delivery.
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: formData.primaryColor }}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm opacity-70">
                Your payment information is secure with 256-bit SSL encryption.
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: formData.primaryColor }}
              >
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm opacity-70">
                30-day return policy. Not satisfied? Get your money back.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Product Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.features.map((feature, index) => (
              <Card key={index} className={`p-6 ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <div 
                  className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  ✓
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                <p className="text-sm opacity-70">
                  High-quality feature that makes our products stand out from the competition.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Shop?
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Join thousands of happy customers and experience the difference.
          </p>
          <Button 
            size="lg" 
            className="text-white font-semibold px-12 py-4 text-lg"
            style={getPrimaryColorStyle()}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Start Shopping Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceTemplate;
