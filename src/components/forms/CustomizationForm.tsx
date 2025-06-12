
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLandingForm } from '@/contexts/LandingFormContext';
import { Palette } from 'lucide-react';

const CustomizationForm = () => {
  const { formData, updateFormData } = useLandingForm();

  const themes = [
    { value: 'light', label: 'Light & Clean' },
    { value: 'dark', label: 'Dark & Modern' },
    { value: 'minimal', label: 'Minimal & Simple' },
    { value: 'vibrant', label: 'Vibrant & Bold' },
  ];

  const colors = [
    { value: '#6366f1', label: 'Indigo', color: 'bg-indigo-500' },
    { value: '#8b5cf6', label: 'Purple', color: 'bg-purple-500' },
    { value: '#06b6d4', label: 'Cyan', color: 'bg-cyan-500' },
    { value: '#10b981', label: 'Emerald', color: 'bg-emerald-500' },
    { value: '#f59e0b', label: 'Amber', color: 'bg-amber-500' },
    { value: '#ef4444', label: 'Red', color: 'bg-red-500' },
  ];

  const fonts = [
    { value: 'Inter', label: 'Inter (Modern)' },
    { value: 'Roboto', label: 'Roboto (Clean)' },
    { value: 'Poppins', label: 'Poppins (Friendly)' },
    { value: 'Playfair Display', label: 'Playfair (Elegant)' },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="w-5 h-5 text-purple-500" />
          Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Theme Style</Label>
          <Select value={formData.theme} onValueChange={(value: any) => updateFormData({ theme: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Primary Color</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => updateFormData({ primaryColor: color.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.primaryColor === color.value
                    ? 'border-gray-900 ring-2 ring-gray-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-4 rounded ${color.color} mb-1`}></div>
                <span className="text-xs text-gray-600">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Font Family</Label>
          <Select value={formData.fontFamily} onValueChange={(value) => updateFormData({ fontFamily: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationForm;
