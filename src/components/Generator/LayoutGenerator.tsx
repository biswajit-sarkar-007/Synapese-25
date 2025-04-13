import { useState, useEffect } from 'react';
import { generateLayout } from '../../services/layoutService';
import { exportLayout } from '../../utils/layoutExporter';

import { Upload, Code, Eye } from 'lucide-react';
import { StyleConfig } from './StyleConfig';
import { CodePreview } from './CodePreview';
import { FontLoader } from '../Layout/FontLoader';
import { useLayout } from '../../context/LayoutContext';
import { LayoutRenderer } from '../Layout/LayoutRenderer';
import type { LayoutConfig } from '../../context/LayoutContext';

export const LayoutGenerator = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [exportFormat, setExportFormat] = useState<'react' | 'shopify'>('react');
  const { config, updateContent } = useLayout();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [generatedLayout, setGeneratedLayout] = useState<Partial<LayoutConfig> | null>(null);
  
  // Reset images on component mount
  useEffect(() => {
    updateContent({
      productImages: []
    });
    setSelectedImages([]);
  }, []);

  // Initialize layout state
  useEffect(() => {
    if (!config.content.productImages) {
      updateContent({
        productImages: []
      });
    }
  }, []);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (files: FileList) => {
    try {
      setLoading(true);
      const newImages: string[] = [];
      
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          console.warn(`File ${file.name} is not an image, skipping...`);
          continue;
        }
        
        try {
          const base64Image = await convertToBase64(file);
          newImages.push(base64Image);
          console.log(`Processed image ${i + 1}:`, file.name);
        } catch (err) {
          console.error(`Error processing image ${file.name}:`, err);
        }
      }

      // Update selected images
      setSelectedImages(prevImages => [...prevImages, ...Array.from(files)]);
      
      // Update content with all images
      const updatedImages = [...(config.content.productImages || []), ...newImages];
      console.log('Updating content with images:', updatedImages);
      
      updateContent({
        productImages: updatedImages
      });

      // Force a re-render of the preview
      setGeneratedLayout(prev => prev ? { ...prev } : null);
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      // Log the current state before generating
      console.log('Current config:', config);
      console.log('Generating with prompt:', prompt);

      const result = await generateLayout(prompt);
      
      // Update layout and content based on AI response
      if (result) {
        const newLayout: LayoutConfig = {
          colorTheme: result.brandGuidelines.colors,
          fontStyle: {
            heading: result.brandGuidelines.typography.headingFont,
            body: result.brandGuidelines.typography.bodyFont
          },
          animationStyle: result.animations ? 'fade-in' : 'fade-in',
          content: {
            ...config.content,
            productImages: config.content.productImages || [],
            promptText: prompt,
            title: result.content.title,
            tagline: result.content.tagline,
            cta: result.content.cta,
            backgroundImage: result.content.backgroundImage
          }
        };
        
        // Log the new layout before updating
        console.log('New layout:', newLayout);
        
        setGeneratedLayout(newLayout);
        updateContent({
          ...newLayout.content
        });

        // Log the update confirmation
        console.log('Layout updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FontLoader fonts={config.fontStyle} />
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Create Your Brand Experience</h2>
          <p className="text-purple-100 mb-6">Transform your brand vision into a stunning website layout. Perfect for e-commerce, startups, and creative businesses.</p>
          <div className="space-y-6 mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-purple-100">
                  Describe your brand and target audience
                </label>
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                  placeholder="e.g., A luxury fashion brand targeting Gen Z with sustainable clothing..."
                  className="w-full p-4 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center min-w-[160px]"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : 'Create Layout'}
                </button>

                {generatedLayout && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-purple-400/30 rounded-xl font-medium hover:bg-white/20 transition-colors"
                    >
                      <Eye size={18} />
                      {showPreview ? 'Hide Code' : 'Preview Code'}
                    </button>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as 'react' | 'shopify')}
                      className="px-4 py-2 rounded-xl border border-purple-400/30 bg-white/10 text-white"
                    >
                      <option value="react">React</option>
                      <option value="shopify">Shopify</option>
                    </select>
                    <button
                      onClick={() => {
                        const blob = new Blob([exportLayout(config as LayoutConfig, { format: exportFormat, includeStyles: true })], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `generated-layout.${exportFormat === 'react' ? 'tsx' : 'liquid'}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-purple-400/30 rounded-xl font-medium hover:bg-white/20 transition-colors"
                    >
                      <Code size={18} />
                      Export Code
                    </button>
                  </div>
                )}
              </div>
            </div>

            {showPreview && generatedLayout && (
              <div className="mt-8">
                <CodePreview config={config as LayoutConfig} format={exportFormat} />
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 mt-6">
              <label className="block text-sm font-medium mb-2">
                Upload Product Images (optional)
              </label>
              <div className="space-y-2">
                <div 
                  className="border-2 border-dashed border-purple-400/30 rounded-xl p-6 text-center cursor-pointer hover:border-purple-300 transition-all bg-white/5 backdrop-blur-sm group"
                  onClick={() => document.getElementById('imageUpload')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-purple-300 mb-3 transform group-hover:scale-110 transition-transform" />
                  <p className="text-lg text-purple-100 font-medium">Click to upload product images</p>
                  <p className="text-sm text-purple-200/80 mt-2">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && handleImageUpload(e.target.files)}
                />
                {selectedImages.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">{selectedImages.length} image(s) selected</p>
                    <button
                      onClick={() => {
                        setSelectedImages([]);
                        updateContent({ productImages: [] });
                      }}
                      className="text-sm text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear all images
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Style Configuration</h3>
          <p className="text-purple-100 mb-6">Customize your brand's visual identity with colors, typography, and more.</p>
          <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
            <StyleConfig onChange={(newConfig: any) => {
              updateContent({
                ...config.content,
                ...newConfig.content
              });
            }} />
          </div>
        </div>

        {/* Mobile Preview - Only shown on small screens */}
        <div className="block lg:hidden mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Layout Preview</h3>
          <div className="bg-white rounded-2xl shadow-2xl p-6 min-h-[400px] border border-purple-100/20">
            <LayoutRenderer config={generatedLayout as LayoutConfig || config} />
          </div>
        </div>
      </div>
    </div>
  );
};
