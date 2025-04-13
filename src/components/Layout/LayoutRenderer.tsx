import { motion } from 'framer-motion';
import { useLayout } from '../../context/LayoutContext';
import { ANIMATION_VARIANTS, DEFAULT_TRANSITION } from './animations';
import { Hero } from './Sections/Hero';
import { ProductGrid } from './Sections/ProductGrid';
import { CTA } from './Sections/CTA';
import { Footer } from './Sections/Footer';

import type { LayoutConfig } from '../../context/LayoutContext';



type SectionName = 'Hero' | 'ProductGrid' | 'CTA' | 'Footer';

type SectionProps = {
  colorTheme: LayoutConfig['colorTheme'];
  fontStyle: LayoutConfig['fontStyle'] & { family: string };
  content: LayoutConfig['content'];
};

const SECTION_COMPONENTS: Record<SectionName, React.ComponentType<SectionProps>> = {
  Hero,
  ProductGrid,
  CTA,
  Footer
};

interface LayoutRendererProps {
  config?: LayoutConfig;
}

export const LayoutRenderer = ({ config: propConfig }: LayoutRendererProps = {}) => {
  const { config: contextConfig } = useLayout();
  const config = propConfig || contextConfig;

  // Type guard for section names
  const isSectionName = (name: string): name is SectionName => {
    return name in SECTION_COMPONENTS;
  };

  const renderSection = (sectionName: string, index: number) => {
    // Type guard to ensure sectionName is valid
    if (!isSectionName(sectionName)) {
      console.warn(`Invalid section name: ${sectionName}`);
      return null;
    }
    
    // Get section component
    const Component = SECTION_COMPONENTS[sectionName];
    
    // Prepare section props
    const sectionProps: SectionProps = {
      colorTheme: config.colorTheme,
      fontStyle: {
        ...config.fontStyle,
        family: config.fontStyle.heading // Use heading font as the default font family
      },
      content: config.content
    };
    
    // Get animation variant
    const variants = ANIMATION_VARIANTS[config.animationStyle] || ANIMATION_VARIANTS['fade-in'];

    return (
      <motion.div
        key={`${sectionName}-${index}`}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={DEFAULT_TRANSITION}
        style={{ 
          '--primary-color': config.colorTheme.primary,
          '--secondary-color': config.colorTheme.secondary,
          '--background-color': config.colorTheme.background
        } as React.CSSProperties}
      >
        <Component {...sectionProps} />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      {['Hero', 'ProductGrid', 'CTA', 'Footer'].map((section, index) => renderSection(section, index))}
    </div>
  );
};
