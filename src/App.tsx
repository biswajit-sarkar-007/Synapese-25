import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { LayoutProvider } from './context/LayoutContext';
import { LayoutGenerator } from './components/Generator/LayoutGenerator';
import { LayoutRenderer } from './components/Layout/LayoutRenderer';
import { Toaster } from 'react-hot-toast';

// Import fonts
import '@fontsource/inter';
import '@fontsource/roboto';
import '@fontsource/playfair-display';
import '@fontsource/montserrat';

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <LayoutProvider>
        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <Header toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
          
          <main className="flex-1 flex flex-col lg:flex-row">
            {/* Left Side - Input Panel */}
            <div className="w-full lg:w-1/3 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
              <div className="max-w-xl mx-auto lg:max-w-none">
                <LayoutGenerator />
              </div>
            </div>
            
            {/* Right Side - Preview */}
            <div className="w-full lg:w-2/3 p-4 lg:p-6 overflow-y-auto bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-medium mb-4">Preview</h2>
                <div className="bg-white rounded-lg shadow-lg p-4 min-h-[600px]">
                  <LayoutRenderer config={undefined} />
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </LayoutProvider>
    </>
  );
}

export default App;