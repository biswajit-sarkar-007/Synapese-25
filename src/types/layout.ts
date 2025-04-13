export interface LayoutConfig {
  colorTheme: {
    primary: string;
    secondary: string;
    background: string;
  };
  fontStyle: {
    body: string;
    heading: string;
  };
  content: {
    title: string;
    tagline: string;
    cta: string;
    promptText?: string;
    backgroundImage?: string;
    productImages?: string[];
  };
  brandType?: 'fashion' | 'food' | 'tech' | 'beauty' | 'fitness';
}
