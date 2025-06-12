
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import { useLandingForm } from '@/contexts/LandingFormContext';

const AIGenerationButton = () => {
  const [open, setOpen] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { generateContent, loading } = useAIGeneration();
  const { updateFormData } = useLandingForm();

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      return;
    }

    const prompt = `Business type: ${businessType}. Target audience: ${targetAudience}. Additional details: ${additionalInfo}`;
    
    const result = await generateContent({
      prompt,
      type: 'complete_landing_page',
      businessType,
      targetAudience
    });

    if (result) {
      // Update form data with generated content
      updateFormData({
        businessName: result.business_name || '',
        tagline: result.tagline || '',
        description: result.description || '',
        features: result.features || []
      });
      
      setOpen(false);
      setBusinessType('');
      setTargetAudience('');
      setAdditionalInfo('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Landing Page with AI</DialogTitle>
          <DialogDescription>
            Tell us about your business and we'll generate content for your landing page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessType">Business Type *</Label>
            <Input
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="e.g., SaaS platform, Restaurant, Consulting firm"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Small businesses, Developers, Students"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any specific details about your business, unique selling points, etc."
              className="mt-1 min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={loading || !businessType.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIGenerationButton;
