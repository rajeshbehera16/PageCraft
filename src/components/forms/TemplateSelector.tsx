
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Layout, Rocket, Briefcase, ShoppingBag } from 'lucide-react';

const TemplateSelector = () => {
  const { formData, updateFormData } = useLandingForm();

  const templates = [
    {
      id: 'startup',
      name: 'Startup',
      description: 'Perfect for new businesses and product launches',
      icon: Rocket,
      color: 'bg-purple-500',
    },
    {
      id: 'saas',
      name: 'SaaS',
      description: 'Ideal for software as a service companies',
      icon: Layout,
      color: 'bg-blue-500',
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Showcase your work and personal brand',
      icon: Briefcase,
      color: 'bg-emerald-500',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Great for online stores and product sales',
      icon: ShoppingBag,
      color: 'bg-amber-500',
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layout className="w-5 h-5 text-purple-500" />
          Choose Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = formData.template === template.id;
            
            return (
              <button
                key={template.id}
                onClick={() => updateFormData({ template: template.id as any })}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-medium text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600">{template.description}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
