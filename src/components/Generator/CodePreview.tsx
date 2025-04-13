import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { LayoutConfig } from '../../types/layout';
import { exportLayout } from '../../utils/layoutExporter';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

interface CodePreviewProps {
  config: LayoutConfig;
  format: 'react' | 'shopify' | 'html';
  onFormatChange: (format: 'react' | 'shopify' | 'html') => void;
}

export const CodePreview = ({ config, format, onFormatChange }: CodePreviewProps) => {
  const [code] = useState(() => exportLayout(config, { format, includeStyles: true }));

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
      toast.error('Failed to copy code');
    }
  };

  const handleExportZip = async () => {
    const zip = new JSZip();
    
    // Add main layout file
    const fileName = format === 'react' 
      ? 'GeneratedLayout.tsx' 
      : format === 'shopify' 
        ? 'generated-layout.liquid' 
        : 'index.html';
    
    zip.file(fileName, code);

    // Add component files for React format
    if (format === 'react') {
      zip.file('components/Layout/Sections/Hero.tsx', exportLayout(config, { 
        format: 'react', 
        includeStyles: true,
        component: 'hero'
      }));
      
      zip.file('components/Layout/Sections/ProductGrid.tsx', exportLayout(config, { 
        format: 'react', 
        includeStyles: true,
        component: 'productGrid'
      }));
      
      zip.file('components/Layout/Sections/App.tsx', exportLayout(config, { 
        format: 'react', 
        includeStyles: true,
        component: 'app'
      }));
    }

    // Generate and download the ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'export.zip');
    toast.success(`${format.toUpperCase()} files downloaded!`);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-purple-400/30 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-purple-400/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFormatChange('react')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                format === 'react'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              React
            </button>
            <button
              onClick={() => onFormatChange('shopify')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                format === 'shopify'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              Shopify
            </button>
            <button
              onClick={() => onFormatChange('html')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                format === 'html'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              HTML
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              📋 Copy Code
            </button>
            <button
              onClick={handleExportZip}
              className="px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              📦 Export ZIP
            </button>
            <span className="text-sm text-gray-400">
              {format === 'react' 
                ? 'GeneratedLayout.tsx' 
                : format === 'shopify' 
                  ? 'generated-layout.liquid' 
                  : 'index.html'}
            </span>
          </div>
        </div>
      </div>
      <CodeMirror
        value={code}
        height="500px"
        theme={oneDark}
        extensions={[javascript({ jsx: true })]}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
