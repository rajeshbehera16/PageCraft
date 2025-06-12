
-- Create a table to store landing pages created by users
CREATE TABLE public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  call_to_action TEXT DEFAULT 'Get Started',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'minimal', 'vibrant')),
  template TEXT DEFAULT 'startup' CHECK (template IN ('startup', 'saas', 'portfolio', 'ecommerce')),
  primary_color TEXT DEFAULT '#6366f1',
  font_family TEXT DEFAULT 'Inter',
  logo_url TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on landing_pages
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for landing_pages
CREATE POLICY "Users can view their own landing pages" 
  ON public.landing_pages 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own landing pages" 
  ON public.landing_pages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own landing pages" 
  ON public.landing_pages 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own landing pages" 
  ON public.landing_pages 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Allow public access to published landing pages
CREATE POLICY "Anyone can view published landing pages" 
  ON public.landing_pages 
  FOR SELECT 
  USING (is_published = true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for landing_pages
CREATE TRIGGER update_landing_pages_updated_at
  BEFORE UPDATE ON public.landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for user uploads (logos and cover images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('landing-assets', 'landing-assets', true);

-- Create storage policies
CREATE POLICY "Users can upload their own assets" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'landing-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own assets" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'landing-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own assets" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'landing-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own assets" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'landing-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public access to assets in published landing pages
CREATE POLICY "Public access to landing assets" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'landing-assets');
