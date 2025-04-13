import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-medium text-white mb-4">Brand Colors</h3>
      <HexColorPicker color={color} onChange={onChange} />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default ColorPicker;