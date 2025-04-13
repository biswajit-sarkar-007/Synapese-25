interface CTAProps {
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
    cta: string;
    promptText: string;
  };
}

export const CTA = ({ colorTheme, fontStyle, content }: CTAProps) => {
  return (
    <section 
      className="py-12 sm:py-16 lg:py-20"
      style={{ fontFamily: fontStyle.body }}
    >
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div 
          className="rounded-xl sm:rounded-2xl lg:rounded-3xl text-white text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12"
          style={{ backgroundColor: colorTheme.primary }}
        >
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
              style={{ fontFamily: fontStyle.heading }}
            >
              {content.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
              {content.promptText}
            </p>
            <div className="pt-4">
              <button 
                className="bg-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 transform-gpu"
                style={{ 
                  color: colorTheme.primary,
                  fontFamily: fontStyle.body 
                }}
              >
                {content.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
