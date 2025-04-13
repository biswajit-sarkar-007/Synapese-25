import React, { createContext, useContext, useState, useCallback } from 'react';

interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
}

interface FontStyle {
  heading: string;
  body: string;
}

interface ContentConfig {
  title: string;
  tagline: string;
  cta: string;
  productImages: string[];
  backgroundImage?: string;
  promptText: string;
}

interface AnimationConfig {
  style: 'fade-in' | 'slide-in' | 'scale-in' | 'slide-up' | 'slide-down';
  duration: string;
  easing: string;
}

interface SpacingConfig {
  base: string;
  large: string;
  small: string;
}

interface LayoutConfig {
  colorTheme: ColorTheme;
  fontStyle: FontStyle;
  animation: AnimationConfig;
  spacing: SpacingConfig;
  content: ContentConfig;
}

interface LayoutContextType {
  config: LayoutConfig;
  updateConfig: (newConfig: Partial<LayoutConfig>) => void;
  updateColorTheme: (color: Partial<LayoutConfig['colorTheme']>) => void;
  updateFontStyle: (font: Partial<LayoutConfig['fontStyle']>) => void;
  updateContent: (content: Partial<LayoutConfig['content']>) => void;
  updateAnimation: (animation: Partial<LayoutConfig['animation']>) => void;
  updateSpacing: (spacing: Partial<LayoutConfig['spacing']>) => void;
}

const defaultConfig: LayoutConfig = {
  colorTheme: {
    primary: '#4F46E5',
    secondary: '#333333',
    background: '#ffffff'
  },
  fontStyle: {
    heading: 'Playfair Display',
    body: 'Roboto'
  },
  animation: {
    style: 'fade-in',
    duration: '0.3s',
    easing: 'ease-in-out'
  },
  spacing: {
    base: '1rem',
    large: '2rem',
    small: '0.5rem'
  },
  content: {
    title: 'Shop the Look',
    tagline: 'Discover our latest collection',
    cta: 'Explore Now',
    productImages: [],
    promptText: 'Find your perfect style',
    backgroundImage: undefined
  }
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LayoutConfig>(defaultConfig);

  const updateConfig = useCallback((newConfig: Partial<LayoutConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const updateColorTheme = useCallback((color: Partial<LayoutConfig['colorTheme']>) => {
    setConfig(prev => ({
      ...prev,
      colorTheme: { ...prev.colorTheme, ...color }
    }));
  }, []);

  const updateFontStyle = useCallback((font: Partial<LayoutConfig['fontStyle']>) => {
    setConfig(prev => ({
      ...prev,
      fontStyle: { ...prev.fontStyle, ...font }
    }));
  }, []);

  const updateContent = useCallback((content: Partial<LayoutConfig['content']>) => {
    setConfig(prev => ({
      ...prev,
      content: { ...prev.content, ...content }
    }));
  }, []);

  const updateAnimation = useCallback((animation: Partial<LayoutConfig['animation']>) => {
    setConfig(prev => ({
      ...prev,
      animation: { ...prev.animation, ...animation }
    }));
  }, []);

  const updateSpacing = useCallback((spacing: Partial<LayoutConfig['spacing']>) => {
    setConfig(prev => ({
      ...prev,
      spacing: { ...prev.spacing, ...spacing }
    }));
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        config,
        updateConfig,
        updateColorTheme,
        updateFontStyle,
        updateContent,
        updateAnimation,
        updateSpacing
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export type { LayoutConfig };
