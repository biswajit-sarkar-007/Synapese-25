import React, { useState } from 'react';
import { BrandGuidelines, defaultGuidelines } from '../../services/brandService';

interface BrandGuidelinesInputProps {
  onGuidelinesChange: (guidelines: BrandGuidelines) => void;
}

export const BrandGuidelinesInput: React.FC<BrandGuidelinesInputProps> = ({ onGuidelinesChange }) => {
  const [guidelines, setGuidelines] = useState<BrandGuidelines>(defaultGuidelines);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (category: keyof BrandGuidelines, key: string, value: string) => {
    const newGuidelines = {
      ...guidelines,
      [category]: {
        ...guidelines[category],
        [key]: value
      }
    };
    setGuidelines(newGuidelines);
    onGuidelinesChange(newGuidelines);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Brand Guidelines</h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showAdvanced ? 'Show Less' : 'Show Advanced'}
        </button>
      </div>

      {/* Basic Colors */}
      <div className="space-y-4">
        <h4 className="font-medium">Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <input
              type="color"
              value={guidelines.colors.primary}
              onChange={(e) => handleChange('colors', 'primary', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
            <input
              type="color"
              value={guidelines.colors.secondary}
              onChange={(e) => handleChange('colors', 'secondary', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h4 className="font-medium">Typography</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Heading Font</label>
            <select
              value={guidelines.typography.headingFont}
              onChange={(e) => handleChange('typography', 'headingFont', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Playfair Display, serif">Playfair Display</option>
              <option value="Roboto, sans-serif">Roboto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Font Size</label>
            <input
              type="text"
              value={guidelines.typography.baseSize}
              onChange={(e) => handleChange('typography', 'baseSize', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300"
              placeholder="16px"
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <>
          {/* Animation Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Animation</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={guidelines.animation.duration}
                  onChange={(e) => handleChange('animation', 'duration', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  placeholder="0.3s"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Easing</label>
                <select
                  value={guidelines.animation.easing}
                  onChange={(e) => handleChange('animation', 'easing', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300"
                >
                  <option value="ease">Ease</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                  <option value="cubic-bezier(0.4, 0, 0.2, 1)">Custom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Spacing Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Spacing</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Base</label>
                <input
                  type="text"
                  value={guidelines.spacing.base}
                  onChange={(e) => handleChange('spacing', 'base', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  placeholder="1rem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Large</label>
                <input
                  type="text"
                  value={guidelines.spacing.large}
                  onChange={(e) => handleChange('spacing', 'large', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  placeholder="2rem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Small</label>
                <input
                  type="text"
                  value={guidelines.spacing.small}
                  onChange={(e) => handleChange('spacing', 'small', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  placeholder="0.5rem"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
