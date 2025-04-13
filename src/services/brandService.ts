export interface BrandGuidelines {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
  };
  spacing: {
    base: string;
    large: string;
    small: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
}

export const defaultGuidelines: BrandGuidelines = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF2D55',
    background: '#FFFFFF',
    text: '#000000'
  },
  typography: {
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
    baseSize: '16px'
  },
  spacing: {
    base: '1rem',
    large: '2rem',
    small: '0.5rem'
  },
  animation: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

export const generateBrandStyles = (guidelines: BrandGuidelines): string => {
  return `
    :root {
      --color-primary: ${guidelines.colors.primary};
      --color-secondary: ${guidelines.colors.secondary};
      --color-accent: ${guidelines.colors.accent};
      --color-background: ${guidelines.colors.background};
      --color-text: ${guidelines.colors.text};
      
      --font-heading: ${guidelines.typography.headingFont};
      --font-body: ${guidelines.typography.bodyFont};
      --font-size-base: ${guidelines.typography.baseSize};
      
      --spacing-base: ${guidelines.spacing.base};
      --spacing-large: ${guidelines.spacing.large};
      --spacing-small: ${guidelines.spacing.small};
      
      --animation-duration: ${guidelines.animation.duration};
      --animation-easing: ${guidelines.animation.easing};
    }
  `;
};
