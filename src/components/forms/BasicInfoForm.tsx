
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Building2 } from 'lucide-react';
import AIGenerationButton from './AIGenerationButton';

const BasicInfoForm = () => {
  const { formData, updateFormData } = useLandingForm();

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="w-5 h-5 text-purple-500" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AIGenerationButton />
        
        <div>
          <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="Enter your business name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="tagline" className="text-sm font-medium">Tagline or Slogan</Label>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => updateFormData({ tagline: e.target.value })}
            placeholder="A catchy tagline for your business"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Describe your business and what you offer"
            className="mt-1 min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor="callToAction" className="text-sm font-medium">Call to Action</Label>
          <Input
            id="callToAction"
            value={formData.callToAction}
            onChange={(e) => updateFormData({ callToAction: e.target.value })}
            placeholder="e.g., Get Started, Sign Up, Learn More"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
