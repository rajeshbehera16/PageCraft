
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLandingPages } from '@/hooks/useLandingPages';
import { Edit, Eye, Trash2, Plus, Globe, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DashboardProps {
  onCreateNew: () => void;
  onEditPage: (pageId: string) => void;
}

const Dashboard = ({ onCreateNew, onEditPage }: DashboardProps) => {
  const { landingPages, loading, deleteLandingPage, publishLandingPage, unpublishLandingPage } = useLandingPages();

  const handleTogglePublish = async (page: any) => {
    if (page.is_published) {
      await unpublishLandingPage(page.id);
    } else {
      const slug = page.business_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      await publishLandingPage(page.id, slug);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Landing Pages</h1>
          <p className="text-gray-600 mt-2">Manage and edit your created landing pages</p>
        </div>
        <Button onClick={onCreateNew} className="bg-gradient-to-r from-purple-500 to-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Create New Page
        </Button>
      </div>

      {landingPages.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No landing pages yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first landing page to get started
            </p>
            <Button onClick={onCreateNew} className="bg-gradient-to-r from-purple-500 to-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landingPages.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{page.business_name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {page.tagline || 'No tagline set'}
                    </CardDescription>
                  </div>
                  <Badge variant={page.is_published ? "default" : "secondary"}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p><strong>Template:</strong> {page.template}</p>
                    <p><strong>Theme:</strong> {page.theme}</p>
                    <p><strong>Updated:</strong> {formatDistanceToNow(new Date(page.updated_at))} ago</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditPage(page.id)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(page)}
                      className="flex-1"
                    >
                      {page.is_published ? (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteLandingPage(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
