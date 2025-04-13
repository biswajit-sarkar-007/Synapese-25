import { useEffect } from 'react';

interface FontLoaderProps {
  fonts: {
    heading: string;
    body: string;
  };
}

export const FontLoader = ({ fonts }: FontLoaderProps) => {
  useEffect(() => {
    // Convert font names to URL-friendly format
    const headingFont = fonts.heading.replace(/\s+/g, '+');
    const bodyFont = fonts.body.replace(/\s+/g, '+');

    // Create link element for Google Fonts
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont}&family=${bodyFont}&display=swap`;
    link.rel = 'stylesheet';

    // Add to document head
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(link);
    };
  }, [fonts.heading, fonts.body]);

  return null;
};
