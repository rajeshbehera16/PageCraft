
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

export interface LandingPage {
  id: string;
  user_id: string;
  business_name: string;
  tagline: string | null;
  description: string | null;
  features: string[];
  call_to_action: string;
  theme: 'light' | 'dark' | 'minimal' | 'vibrant';
  template: 'startup' | 'saas' | 'portfolio' | 'ecommerce';
  primary_color: string;
  font_family: string;
  logo_url: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
}

type DatabaseLandingPage = Tables<'landing_pages'>;

export const useLandingPages = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLandingPages();
    } else {
      setLandingPages([]);
      setLoading(false);
    }
  }, [user]);

  const fetchLandingPages = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Transform database types to our interface types
      const transformedData: LandingPage[] = (data || []).map((item: DatabaseLandingPage) => ({
        ...item,
        theme: (item.theme as LandingPage['theme']) || 'light',
        template: (item.template as LandingPage['template']) || 'startup',
        call_to_action: item.call_to_action || 'Get Started',
        primary_color: item.primary_color || '#6366f1',
        font_family: item.font_family || 'Inter',
        features: item.features || [],
        is_published: item.is_published || false,
        created_at: item.created_at || '',
        updated_at: item.updated_at || '',
      }));
      
      setLandingPages(transformedData);
    } catch (error) {
      console.error('Error fetching landing pages:', error);
      toast.error('Failed to load landing pages');
    } finally {
      setLoading(false);
    }
  };

  const saveLandingPage = async (pageData: Partial<LandingPage>) => {
    if (!user) {
      toast.error('You must be logged in to save pages');
      return null;
    }

    try {
      const dataToSave = {
        business_name: pageData.business_name || '',
        user_id: user.id,
        tagline: pageData.tagline,
        description: pageData.description,
        features: pageData.features || [],
        call_to_action: pageData.call_to_action || 'Get Started',
        theme: pageData.theme || 'light',
        template: pageData.template || 'startup',
        primary_color: pageData.primary_color || '#6366f1',
        font_family: pageData.font_family || 'Inter',
        logo_url: pageData.logo_url,
        cover_image_url: pageData.cover_image_url,
        is_published: pageData.is_published || false,
        slug: pageData.slug,
      };

      const { data, error } = await supabase
        .from('landing_pages')
        .insert(dataToSave)
        .select()
        .single();

      if (error) throw error;

      const transformedData: LandingPage = {
        ...data,
        theme: (data.theme as LandingPage['theme']) || 'light',
        template: (data.template as LandingPage['template']) || 'startup',
        call_to_action: data.call_to_action || 'Get Started',
        primary_color: data.primary_color || '#6366f1',
        font_family: data.font_family || 'Inter',
        features: data.features || [],
        is_published: data.is_published || false,
        created_at: data.created_at || '',
        updated_at: data.updated_at || '',
      };

      setLandingPages(prev => [transformedData, ...prev]);
      toast.success('Landing page saved successfully!');
      return transformedData;
    } catch (error) {
      console.error('Error saving landing page:', error);
      toast.error('Failed to save landing page');
      return null;
    }
  };

  const updateLandingPage = async (id: string, updates: Partial<LandingPage>) => {
    if (!user) {
      toast.error('You must be logged in to update pages');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('landing_pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedData: LandingPage = {
        ...data,
        theme: (data.theme as LandingPage['theme']) || 'light',
        template: (data.template as LandingPage['template']) || 'startup',
        call_to_action: data.call_to_action || 'Get Started',
        primary_color: data.primary_color || '#6366f1',
        font_family: data.font_family || 'Inter',
        features: data.features || [],
        is_published: data.is_published || false,
        created_at: data.created_at || '',
        updated_at: data.updated_at || '',
      };

      setLandingPages(prev =>
        prev.map(page => (page.id === id ? transformedData : page))
      );
      toast.success('Landing page updated successfully!');
      return transformedData;
    } catch (error) {
      console.error('Error updating landing page:', error);
      toast.error('Failed to update landing page');
      return null;
    }
  };

  const deleteLandingPage = async (id: string) => {
    if (!user) {
      toast.error('You must be logged in to delete pages');
      return false;
    }

    try {
      const { error } = await supabase
        .from('landing_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLandingPages(prev => prev.filter(page => page.id !== id));
      toast.success('Landing page deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting landing page:', error);
      toast.error('Failed to delete landing page');
      return false;
    }
  };

  const publishLandingPage = async (id: string, slug: string) => {
    return updateLandingPage(id, { is_published: true, slug });
  };

  const unpublishLandingPage = async (id: string) => {
    return updateLandingPage(id, { is_published: false });
  };

  return {
    landingPages,
    loading,
    saveLandingPage,
    updateLandingPage,
    deleteLandingPage,
    publishLandingPage,
    unpublishLandingPage,
    refetch: fetchLandingPages,
  };
};
