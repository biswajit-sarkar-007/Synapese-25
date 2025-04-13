import { LayoutConfig } from '../types/layout';

interface ExportOptions {
  format: 'react' | 'shopify' | 'html';
  includeStyles: boolean;
  component?: 'hero' | 'productGrid' | 'app' | 'layout';
}

const generateReactImports = (_config: LayoutConfig): string => {
  const imports = [
    "import React from 'react'",
    "import { Navbar } from './components/Layout/Sections/Navbar'",
    "import { Hero } from './components/Layout/Sections/Hero'",
    "import { ProductGrid } from './components/Layout/Sections/ProductGrid'",
    "import { CTA } from './components/Layout/Sections/CTA'",
    "import { Footer } from './components/Layout/Sections/Footer'"
  ];

  return imports.join('\n');
};

const generateReactProps = (config: LayoutConfig): string => {
  const { colorTheme, fontStyle, content, brandType } = config;
  return `
  style={{
    font: "${fontStyle.body}",
    primaryColor: "${colorTheme.primary}",
    secondaryColor: "${colorTheme.secondary}"
  }}
  brandType="${brandType || 'fashion'}"`;
};

const generateReactComponent = (config: LayoutConfig): string => {
  const props = generateReactProps(config);
  
  return `
export const GeneratedLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar${props} />
      
      <Hero
        colorTheme={{
          primary: "${config.colorTheme.primary}",
          secondary: "${config.colorTheme.secondary}",
          background: "${config.colorTheme.background}"
        }}
        fontStyle={{
          family: "${config.fontStyle.body}",
          heading: "${config.fontStyle.heading}",
          body: "${config.fontStyle.body}"
        }}
        content={{
          title: "${config.content.title}",
          tagline: "${config.content.tagline}",
          cta: "${config.content.cta}",
          backgroundImage: ${config.content.backgroundImage ? `"${config.content.backgroundImage}"` : 'undefined'}
        }}
        brandType="${config.brandType || 'fashion'}"
      />

      <ProductGrid
        products={[]}
        style={{
          font: "${config.fontStyle.body}",
          primaryColor: "${config.colorTheme.primary}"
        }}
      />

      <CTA
        text="${config.content.cta}"
        style={{
          font: "${config.fontStyle.body}",
          primaryColor: "${config.colorTheme.primary}",
          secondaryColor: "${config.colorTheme.secondary}"
        }}
      />

      <Footer
        style={{
          font: "${config.fontStyle.body}",
          primaryColor: "${config.colorTheme.primary}"
        }}
      />
    </div>
  );
};
`;
};

const generateShopifyComponent = (config: LayoutConfig): string => {
  // Convert React JSX to Shopify Liquid syntax
  const { colorTheme, fontStyle, content } = config;
  
  return `
{% comment %}
  Generated Layout Template
{% endcomment %}

<div class="min-h-screen">
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 shadow-sm"
    style="font-family: {{ '${fontStyle.body}' | escape }}">
    {% include 'navbar' with 
      primary_color: '${colorTheme.primary}',
      secondary_color: '${colorTheme.secondary}'
    %}
  </nav>

  <section class="relative min-h-[80vh]">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-transparent"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
        style="font-family: {{ '${fontStyle.heading}' | escape }}; color: {{ '${colorTheme.primary}' | escape }}">
        {{ section.settings.title | default: '${content.title}' }}
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-white/90">
        {{ section.settings.tagline | default: '${content.tagline}' }}
      </p>
      <div class="pt-4">
        <a href="{{ section.settings.cta_link | default: '#' }}"
          class="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white text-lg inline-block"
          style="background: linear-gradient(135deg, {{ '${colorTheme.primary}' | escape }}, {{ '${colorTheme.secondary}' | escape }})">
          {{ section.settings.cta_text | default: '${content.cta}' }}
        </a>
      </div>
    </div>
  </section>

  {% section 'product-grid' %}
  {% section 'cta' %}
  {% section 'footer' %}
</div>

{% schema %}
{
  "name": "Generated Layout",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "${content.title}"
    },
    {
      "type": "text",
      "id": "tagline",
      "label": "Tagline",
      "default": "${content.tagline}"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "${content.cta}"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Link"
    }
  ]
}
{% endschema %}
`;
};

const generateHTMLComponent = (config: LayoutConfig): string => {
  const { colorTheme, fontStyle, content } = config;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <style>
    :root {
      --primary-color: ${colorTheme.primary};
      --secondary-color: ${colorTheme.secondary};
      --background-color: ${colorTheme.background};
    }
    body {
      font-family: ${fontStyle.body};
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: ${fontStyle.heading};
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <!-- Navbar content -->
  </nav>

  <section class="hero">
    <h1>${content.title}</h1>
    <p>${content.tagline}</p>
    <button class="cta-button">${content.cta}</button>
  </section>

  <section class="product-grid">
    <!-- Product grid content -->
  </section>

  <section class="cta">
    <h2>${content.cta}</h2>
  </section>

  <footer class="footer">
    <!-- Footer content -->
  </footer>
</body>
</html>`;
};

export const exportLayout = (config: LayoutConfig, options: ExportOptions): string => {
  const { format, includeStyles } = options;
  
  if (format === 'react') {
    return `${generateReactImports(config)}\n\n${generateReactComponent(config)}`;
  } else if (format === 'shopify') {
    return generateShopifyComponent(config);
  } else if (format === 'html') {
    return generateHTMLComponent(config);
  }
  
  return '';
};
