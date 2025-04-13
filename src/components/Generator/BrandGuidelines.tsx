import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette, Type } from 'lucide-react';

interface BrandGuidelinesProps {
  primaryColor: string;
  secondaryColor: string;
  font: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onFontChange: (font: string) => void;
}

const fonts = [
  { name: 'Inter', value: 'inter' },
  { name: 'Roboto', value: 'roboto' },
  { name: 'Playfair Display', value: 'playfair-display' },
  { name: 'Montserrat', value: 'montserrat' }
];

const BrandGuidelines: React.FC<BrandGuidelinesProps> = ({
  primaryColor,
  secondaryColor,
  font,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onFontChange
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Palette className="h-6 w-6 text-indigo-400" />
        <h3 className="text-lg font-medium text-white">Brand Guidelines</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Primary Color
          </label>
          <HexColorPicker color={primaryColor} onChange={onPrimaryColorChange} />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="mt-2 w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Secondary Color
          </label>
          <HexColorPicker color={secondaryColor} onChange={onSecondaryColorChange} />
          <input
            type="text"
            value={secondaryColor}
            onChange={(e) => onSecondaryColorChange(e.target.value)}
            className="mt-2 w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Type className="h-5 w-5 text-indigo-400" />
            <label className="block text-sm font-medium text-gray-300">
              Brand Font
            </label>
          </div>
          <select
            value={font}
            onChange={(e) => onFontChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {fonts.map((fontOption) => (
              <option key={fontOption.value} value={fontOption.value}>
                {fontOption.name}
              </option>
            ))}
          </select>
          <div className="mt-4 p-4 bg-gray-700 rounded">
            <p className={`text-white font-${font} text-lg`}>
              Preview Text in {font}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandGuidelines;