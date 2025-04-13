
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

export const generateImageCaption = async (imageFile: File): Promise<string> => {
  try {
    if (!HUGGING_FACE_API_KEY) {
      console.warn('No Hugging Face API key found. Using mock response.');
      return `Product image showing ${fileToCaption(imageFile.name)}`;
    }

    // Convert image to base64
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageFile);
    });

    // Extract the base64 data (remove data URL prefix)
    const base64Data = base64Image.split(',')[1];

    // Make API call to Hugging Face
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: base64Data })
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result[0]?.generated_text || `Product image showing ${fileToCaption(imageFile.name)}`;
  } catch (error) {
    console.error('Error generating image caption:', error);
    return `Product image showing ${fileToCaption(imageFile.name)}`;
  }
};

const fileToCaption = (filename: string): string => {
  // Convert filename to a readable caption
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .toLowerCase()
    .trim();
};
