
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AIGenerationRequest {
  prompt: string;
  type: 'business_name' | 'tagline' | 'description' | 'features' | 'complete_landing_page';
  businessType?: string;
  targetAudience?: string;
}

export const useAIGeneration = () => {
  const [loading, setLoading] = useState(false);

  const generateContent = async (request: AIGenerationRequest) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: request
      });

      if (error) throw error;

      return data.content;
    } catch (error) {
      console.error('Error generating AI content:', error);
      toast.error('Failed to generate content with AI');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    loading
  };
};
