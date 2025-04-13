import React from 'react';
import { MessageSquare, Wand2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <MessageSquare className="h-6 w-6 text-indigo-400" />
        <h3 className="text-lg font-medium text-white">Design Prompt</h3>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your desired landing page design... For example: Create a minimal, modern landing page for a luxury fashion brand with a hero section featuring large product images and elegant typography."
        className="w-full h-32 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none placeholder-gray-400"
      />

      <div className="mt-4 space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">Prompt Tips:</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Specify the desired style (minimal, modern, classic, etc.)</li>
            <li>• Mention your target audience</li>
            <li>• Include specific layout preferences</li>
            <li>• Describe the desired mood or atmosphere</li>
          </ul>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="h-5 w-5" />
          <span>{isLoading ? 'Generating...' : 'Generate Layout'}</span>
        </button>
      </div>
    </div>
  );
};

export default PromptInput;