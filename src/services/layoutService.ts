

import { BrandGuidelines, defaultGuidelines } from './brandService';

const generateDefaultTitle = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  if (promptLower.includes('food') || promptLower.includes('restaurant')) {
    return 'Culinary Excellence';
  } else if (promptLower.includes('fashion') || promptLower.includes('clothing')) {
    return 'Fashion Forward';
  } else if (promptLower.includes('tech') || promptLower.includes('software')) {
    return 'Innovation Hub';
  } else if (promptLower.includes('beauty') || promptLower.includes('cosmetic')) {
    return 'Beauty Redefined';
  } else if (promptLower.includes('fitness') || promptLower.includes('health')) {
    return 'Wellness Journey';
  } else {
    return 'Brand Experience';
  }
};

const generateDefaultTagline = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  if (promptLower.includes('food') || promptLower.includes('restaurant')) {
    return 'Where Every Flavor Tells a Story';
  } else if (promptLower.includes('fashion') || promptLower.includes('clothing')) {
    return 'Express Your Authentic Style';
  } else if (promptLower.includes('tech') || promptLower.includes('software')) {
    return 'Shaping Tomorrow\'s Solutions';
  } else if (promptLower.includes('beauty') || promptLower.includes('cosmetic')) {
    return 'Reveal Your Natural Radiance';
  } else if (promptLower.includes('fitness') || promptLower.includes('health')) {
    return 'Transform Your Life, One Step at a Time';
  } else {
    return 'Elevate Your Experience';
  }
};

const generateDefaultCTA = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  if (promptLower.includes('food') || promptLower.includes('restaurant')) {
    return 'Explore Our Menu';
  } else if (promptLower.includes('fashion') || promptLower.includes('clothing')) {
    return 'Discover the Collection';
  } else if (promptLower.includes('tech') || promptLower.includes('software')) {
    return 'Start Innovating';
  } else if (promptLower.includes('beauty') || promptLower.includes('cosmetic')) {
    return 'Begin Your Journey';
  } else if (promptLower.includes('fitness') || promptLower.includes('health')) {
    return 'Start Your Transformation';
  } else {
    return 'Experience Now';
  }
};

interface ContentConfig {
  title: string;
  tagline: string;
  cta: string;
  promptText?: string;
  backgroundImage?: string;
}

interface LayoutConfig {
  brandGuidelines: BrandGuidelines;
  content: ContentConfig;
  animations: boolean;
}

export const generateLayout = async (
  prompt: string,
  guidelines: BrandGuidelines = defaultGuidelines,
  enableAnimations: boolean = true
): Promise<LayoutConfig> => {
  try {
    console.log('Generating layout with:', { prompt, guidelines, enableAnimations });

    // Generate a title and tagline based on the prompt using Hugging Face API
    const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-base', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Create brand-focused website content for this description: ${prompt}. Consider the target audience, brand personality, and industry trends. Generate a compelling title, emotional tagline, persuasive call-to-action, and suggest a color palette that matches the brand's personality. Format the response as: title, tagline, CTA, colors (comma-separated hex codes for primary, secondary, accent).`,
        parameters: {
          max_length: 256,
          num_return_sequences: 1,
          temperature: 0.8,
          top_p: 0.95,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    
    // Check if we got an error response
    if (data.error) {
      console.error('Hugging Face API error:', data.error);
      throw new Error(data.error);
    }
    
    // For flan-t5, the response format is different
    let generatedText = '';
    if (Array.isArray(data)) {
      generatedText = data[0];
    } else if (typeof data === 'object' && data !== null) {
      generatedText = data.generated_text || data[0]?.generated_text || '';
    } else if (typeof data === 'string') {
      generatedText = data;
    }
    
    console.log('Generated text:', generatedText);

    // Parse the generated text into title, tagline, and CTA
    // Parse the generated text if it's a string
    let title = '', tagline = '', cta = '';
    
    if (typeof generatedText === 'string' && generatedText.trim()) {
      const parts = generatedText
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
      
      [title, tagline, cta] = parts;
    }

    // Use defaults if any part is missing
    title = title || generateDefaultTitle(prompt);
    tagline = tagline || generateDefaultTagline(prompt);
    cta = cta || generateDefaultCTA(prompt);

    return {
      brandGuidelines: guidelines,
      content: {
        title,
        tagline,
        cta,
        promptText: prompt,
        backgroundImage: undefined
      },
      animations: enableAnimations
    };

  } catch (error) {
    console.error('Error generating layout:', error);
    return {
      brandGuidelines: guidelines,
      content: {
        title: generateDefaultTitle(prompt),
        tagline: generateDefaultTagline(prompt),
        cta: generateDefaultCTA(prompt),
        promptText: prompt,
        backgroundImage: undefined
      },
      animations: enableAnimations
    };
  }
};
