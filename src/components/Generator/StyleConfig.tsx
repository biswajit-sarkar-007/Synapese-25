import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useLayout } from '../../context/LayoutContext';

const GOOGLE_FONTS = {
  heading: [
    'Playfair Display',
    'Montserrat',
    'Roboto Slab',
    'Merriweather',
    'Lora',
    'Inter',
    'Poppins'
  ],
  body: [
    'Roboto',
    'Open Sans',
    'Lato',
    'Source Sans Pro',
    'Nunito',
    'Inter',
    'Poppins'
  ]
};

const ANIMATION_PRESETS = {
  'fade-in': {
    duration: '0.3s',
    easing: 'ease-in-out'
  },
  'slide-in': {
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  'scale-in': {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  'slide-up': {
    duration: '0.5s',
    easing: 'ease-out'
  },
  'slide-down': {
    duration: '0.5s',
    easing: 'ease-in'
  }
};

interface StyleConfig {
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fontStyle: {
    heading: string;
    body: string;
    baseSize: string;
  };
  spacing: {
    base: string;
    large: string;
    small: string;
  };
  animation: {
    style: 'fade-in' | 'slide-in' | 'scale-in' | 'slide-up' | 'slide-down';
    duration: string;
    easing: string;
  };
  content: {
    title: string;
    tagline: string;
    cta: string;
    promptText: string;
    productImages: string[];
    backgroundImage?: string;
  };
}

export const StyleConfig = () => {
  const { config, updateColorTheme, updateFontStyle, updateContent, updateAnimation, updateSpacing } = useLayout();
  const [activeColorPicker, setActiveColorPicker] = useState<'primary' | 'secondary' | 'background' | null>(null);

  const handleColorChange = (key: keyof typeof config.colorTheme, value: string) => {
    updateColorTheme({ [key]: value });
  };

  const handleFontChange = (key: keyof typeof config.fontStyle, value: string) => {
    updateFontStyle({ [key]: value });
  };

  const handleContentChange = (key: keyof typeof config.content, value: string) => {
    updateContent({ [key]: value });
  };

  const handleAnimationChange = (key: keyof typeof config.animation, value: string) => {
    updateAnimation({ [key]: value });
  };

  const handleSpacingChange = (key: keyof typeof config.spacing, value: string) => {
    updateSpacing({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading Font
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white text-gray-900"
                value={config.fontStyle.heading}
                onChange={(e) => handleFontChange('heading', e.target.value)}
                style={{ fontFamily: config.fontStyle.heading }}
              >
                {GOOGLE_FONTS.heading.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Font
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white text-gray-900"
                value={config.fontStyle.body}
                onChange={(e) => handleFontChange('body', e.target.value)}
                style={{ fontFamily: config.fontStyle.body }}
              >
                {GOOGLE_FONTS.body.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveColorPicker(activeColorPicker === 'primary' ? null : 'primary')}
                className="w-full h-10 rounded-lg border"
                style={{ backgroundColor: config.colorTheme.primary }}
              />
              {activeColorPicker === 'primary' && (
                <div className="absolute z-10 mt-2">
                  <HexColorPicker
                    color={config.colorTheme.primary}
                    onChange={(color) => handleColorChange('primary', color)}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Color</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveColorPicker(activeColorPicker === 'secondary' ? null : 'secondary')}
                className="w-full h-10 rounded-lg border"
                style={{ backgroundColor: config.colorTheme.secondary }}
              />
              {activeColorPicker === 'secondary' && (
                <div className="absolute z-10 mt-2">
                  <HexColorPicker
                    color={config.colorTheme.secondary}
                    onChange={(color) => handleColorChange('secondary', color)}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveColorPicker(activeColorPicker === 'background' ? null : 'background')}
                className="w-full h-10 rounded-lg border"
                style={{ backgroundColor: config.colorTheme.background }}
              />
              {activeColorPicker === 'background' && (
                <div className="absolute z-10 mt-2">
                  <HexColorPicker
                    color={config.colorTheme.background}
                    onChange={(color) => handleColorChange('background', color)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Animation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animation Style
            </label>
            <select
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.animation.style}
              onChange={(e) => handleAnimationChange('style', e.target.value)}
            >
              {Object.keys(ANIMATION_PRESETS).map(style => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.animation.duration}
              onChange={(e) => handleAnimationChange('duration', e.target.value)}
              placeholder="0.3s"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Easing
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.animation.easing}
              onChange={(e) => handleAnimationChange('easing', e.target.value)}
              placeholder="ease-in-out"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Spacing</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Spacing
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.spacing.base}
              onChange={(e) => handleSpacingChange('base', e.target.value)}
              placeholder="1rem"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Large Spacing
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.spacing.large}
              onChange={(e) => handleSpacingChange('large', e.target.value)}
              placeholder="2rem"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Small Spacing
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white text-gray-900"
              value={config.spacing.small}
              onChange={(e) => handleSpacingChange('small', e.target.value)}
              placeholder="0.5rem"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Content</h3>
        <div>
          <label className="block text-sm font-medium mb-2">Page Title</label>
          <input
            type="text"
            value={config.content.title}
            onChange={(e) => handleContentChange('title', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white text-gray-900"
            placeholder="Enter page title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input
            type="text"
            value={config.content.tagline}
            onChange={(e) => handleContentChange('tagline', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white text-gray-900"
            placeholder="Enter page tagline..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">CTA Text</label>
          <input
            type="text"
            value={config.content.cta}
            onChange={(e) => handleContentChange('cta', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white text-gray-900"
            placeholder="Enter call-to-action text..."
          />
        </div>
      </div>
    </div>
  );
};
