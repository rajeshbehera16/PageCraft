
import React, { useState, useEffect } from 'react';
import { LandingFormProvider } from '@/contexts/LandingFormContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLandingPages } from '@/hooks/useLandingPages';
import Header from '@/components/Header';
import FormSection from '@/components/FormSection';
import PreviewSection from '@/components/PreviewSection';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const { saveLandingPage, updateLandingPage, landingPages } = useLandingPages();

  // Show dashboard by default if user is logged in
  useEffect(() => {
    if (user && !editingPageId) {
      setShowDashboard(true);
    }
  }, [user, editingPageId]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your landing page');
      return;
    }

    // In a real implementation, you'd get this data from the form context
    const formData = {
      business_name: 'Sample Business',
      tagline: 'Sample tagline',
      description: 'Sample description',
      features: ['Feature 1', 'Feature 2'],
      call_to_action: 'Get Started',
      theme: 'light' as const,
      template: 'startup' as const,
      primary_color: '#6366f1',
      font_family: 'Inter',
    };

    if (editingPageId) {
      await updateLandingPage(editingPageId, formData);
    } else {
      await saveLandingPage(formData);
    }
  };

  const handlePublish = async () => {
    if (!user) {
      toast.error('Please sign in to publish your landing page');
      return;
    }
    
    // Implementation would depend on current form state
    toast.success('Publishing feature coming soon!');
  };

  const handleCreateNew = () => {
    setEditingPageId(null);
    setShowDashboard(false);
  };

  const handleEditPage = (pageId: string) => {
    setEditingPageId(pageId);
    setShowDashboard(false);
  };

  const handleShowDashboard = () => {
    setShowDashboard(true);
    setEditingPageId(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-300 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse-glow opacity-50"></div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading your experience...</p>
        </div>
      </div>
    );
  }

  if (showDashboard && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 animate-gradient-x bg-size-200 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <Header onShowDashboard={handleShowDashboard} />
        <Dashboard onCreateNew={handleCreateNew} onEditPage={handleEditPage} />
      </div>
    );
  }

  return (
    <LandingFormProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 animate-gradient-x bg-size-200 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <Header 
          onSave={user ? handleSave : undefined}
          onPublish={user ? handlePublish : undefined}
          onShowDashboard={user ? handleShowDashboard : undefined}
        />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Page title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Create Beautiful Landing Pages
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Design, customize, and publish stunning landing pages in minutes with our intuitive page builder.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="card-glass rounded-xl p-1 shadow-glow-sm">
              <FormSection />
            </div>
            <div className="card-glass rounded-xl p-1 shadow-glow-sm">
              <PreviewSection />
            </div>
          </div>
          
          {/* Features section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gradient mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-glow-sm transition-all duration-300 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-600">Intuitive interface that makes creating landing pages simple and fast.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-glow-sm transition-all duration-300 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                <p className="text-gray-600">Personalize every aspect of your landing page to match your brand.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-glow-sm transition-all duration-300 card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Publish Instantly</h3>
                <p className="text-gray-600">Go live with your landing page with just one click.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingFormProvider>
  );
};

export default Index;
