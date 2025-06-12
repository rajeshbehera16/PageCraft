
import React from 'react';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Mail, Github, Linkedin } from 'lucide-react';

const PortfolioTemplate = () => {
  const { formData } = useLandingForm();

  const getThemeClasses = () => {
    switch (formData.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'minimal':
        return 'bg-white text-gray-900';
      case 'vibrant':
        return 'bg-gradient-to-br from-purple-900 to-blue-900 text-white';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };

  const getPrimaryColorStyle = () => ({
    backgroundColor: formData.primaryColor,
  });

  return (
    <div className={`min-h-full ${getThemeClasses()}`} style={{ fontFamily: formData.fontFamily }}>
      {/* Navigation */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">{formData.businessName}</div>
          <div className="flex items-center gap-6">
            <span className="text-sm hover:opacity-80 cursor-pointer">About</span>
            <span className="text-sm hover:opacity-80 cursor-pointer">Work</span>
            <span className="text-sm hover:opacity-80 cursor-pointer">Contact</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white"
            style={getPrimaryColorStyle()}
          >
            {formData.businessName.charAt(0)}
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {formData.tagline}
          </h1>
          <p className="text-xl mb-8 opacity-80 max-w-2xl mx-auto">
            {formData.description}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-white font-semibold px-8"
              style={getPrimaryColorStyle()}
            >
              {formData.callToAction}
            </Button>
            <Button variant="outline" size="lg">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      {/* Skills/Services Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.features.map((feature, index) => (
              <Card key={index} className={`p-6 hover:shadow-lg transition-shadow ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <div 
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                <p className="text-sm opacity-70 mb-4">
                  Professional service with attention to detail and creative solutions.
                </p>
                <div className="flex items-center gap-2 text-sm" style={{ color: formData.primaryColor }}>
                  <span>Learn more</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className={`overflow-hidden hover:shadow-lg transition-shadow ${formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <div 
                  className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.primaryColor}40)` 
                  }}
                >
                  <span className="text-lg font-semibold opacity-60">Project {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Project Title {item}</h3>
                  <p className="text-sm opacity-70 mb-3">
                    Brief description of the project and technologies used.
                  </p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: formData.primaryColor }}>
                    <span>View Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Let's Work Together
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Ready to bring your ideas to life? Get in touch and let's discuss your next project.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="text-white font-semibold px-8"
              style={getPrimaryColorStyle()}
            >
              <Mail className="w-4 h-4 mr-2" />
              {formData.callToAction}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6">
            <Github className="w-6 h-6 hover:opacity-80 cursor-pointer" />
            <Linkedin className="w-6 h-6 hover:opacity-80 cursor-pointer" />
            <Mail className="w-6 h-6 hover:opacity-80 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplate;
