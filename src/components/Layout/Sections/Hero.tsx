interface HeroProps {
  colorTheme: {
    primary: string;
    secondary: string;
    background: string;
  };
  fontStyle: {
    family: string;
    heading: string;
    body: string;
  };
  content: {
    title: string;
    tagline: string;
    cta: string;
    backgroundImage?: string;
  };
  brandType?: 'fashion' | 'food' | 'tech' | 'beauty' | 'fitness';
}

export const Hero = ({ colorTheme, fontStyle, content, brandType = 'fashion' }: HeroProps) => {
  const getBrandSpecificStyles = () => {
    switch (brandType) {
      case 'food':
        return {
          overlayGradient: 'from-black/60 to-black/40',
          titleEffect: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
          shape: 'rounded-none'
        };
      case 'tech':
        return {
          overlayGradient: 'from-indigo-900/70 via-indigo-900/50 to-transparent',
          titleEffect: 'text-shadow-glow',
          shape: 'rounded-2xl'
        };
      case 'beauty':
        return {
          overlayGradient: 'from-pink-500/30 via-purple-500/20 to-transparent',
          titleEffect: 'tracking-wide',
          shape: 'rounded-full'
        };
      case 'fitness':
        return {
          overlayGradient: 'from-emerald-900/70 via-emerald-800/40 to-transparent',
          titleEffect: 'uppercase tracking-widest',
          shape: 'rounded-lg'
        };
      case 'fashion':
      default:
        return {
          overlayGradient: 'from-gray-900/70 via-gray-900/50 to-transparent',
          titleEffect: 'tracking-tight',
          shape: 'rounded-xl'
        };
    }
  };

  const brandStyles = getBrandSpecificStyles();
  return (
    <section 
      className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundColor: colorTheme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${brandStyles.overlayGradient}`} />
      {brandType === 'tech' && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-6xl">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white ${brandStyles.titleEffect}`}
            style={{ 
              fontFamily: fontStyle.heading,
              color: colorTheme.primary 
            }}
          >
            {content.title}
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: fontStyle.body }}
          >
            {content.tagline}
          </p>
          <div className="pt-4">
            <button
              className={`px-6 sm:px-8 py-3 sm:py-4 ${brandStyles.shape} text-white text-base sm:text-lg md:text-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 transform-gpu backdrop-blur-sm`}
              style={{ 
                background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
              boxShadow: `0 10px 20px -10px ${colorTheme.primary}80`,
                fontFamily: fontStyle.body
              }}
            >
              {content.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
