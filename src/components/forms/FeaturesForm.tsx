
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Star, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';

const FeaturesForm = () => {
  const { formData, updateFormData } = useLandingForm();
  const [newFeature, setNewFeature] = useState('');
  const { generateContent, loading } = useAIGeneration();

  const addFeature = () => {
    if (newFeature.trim()) {
      updateFormData({
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    updateFormData({ features: updatedFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = formData.features.map((feature, i) =>
      i === index ? value : feature
    );
    updateFormData({ features: updatedFeatures });
  };

  const generateFeatures = async () => {
    const prompt = `Generate features for a ${formData.businessName || 'business'} that offers: ${formData.description || 'various services'}`;
    
    const result = await generateContent({
      prompt,
      type: 'features'
    });

    if (result && Array.isArray(result)) {
      updateFormData({ features: result });
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="w-5 h-5 text-purple-500" />
          Features & Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={generateFeatures}
            disabled={loading || !formData.businessName}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Generate Features with AI
          </Button>
        </div>

        <div>
          <Label className="text-sm font-medium">Current Features</Label>
          <div className="space-y-2 mt-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Feature description"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="px-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="newFeature" className="text-sm font-medium">Add New Feature</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="newFeature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Enter a new feature"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addFeature()}
            />
            <Button onClick={addFeature} size="sm" className="px-3">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesForm;
