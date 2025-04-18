
import { useState } from "react";
import { toast } from "sonner";

export const useUpscaleImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upscaleImage = async (
    imageData: string,
    scale: number = 2,
    enhancementType: string = "default",
    apiKey: string = ""
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // For Data URLs vs File URLs
      let blob;
      if (imageData.startsWith('data:')) {
        // It's a data URL
        blob = await fetch(imageData).then(r => r.blob());
      } else {
        // It's already a file URL, need to fetch it first
        blob = await fetch(imageData).then(r => r.blob());
      }

      const formData = new FormData();
      formData.append('image', blob, 'image.png');

      console.log('Uploading image...');
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      const { filename } = uploadResult;
      console.log('Image uploaded successfully, filename:', filename);

      // Now enhance the uploaded image
      console.log('Enhancing image with scale:', scale, 'and type:', enhancementType);
      const enhanceResponse = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          filename,
          scale,
          enhancementType,
        }),
      });

      console.log('Enhance response status:', enhanceResponse.status);
      
      // Check if the response is JSON by looking at content-type header
      const contentType = enhanceResponse.headers.get('content-type');
      console.log('Response content type:', contentType);
      
      if (!enhanceResponse.ok) {
        let errorMessage = 'Failed to enhance image';
        try {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await enhanceResponse.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            // If not JSON, just get the text
            errorMessage = await enhanceResponse.text();
            // Truncate if it's too long (likely HTML)
            if (errorMessage.length > 100) {
              errorMessage = errorMessage.substring(0, 100) + '...';
            }
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
        }
        throw new Error(errorMessage);
      }

      let enhanceResult;
      try {
        enhanceResult = await enhanceResponse.json();
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        const responseText = await enhanceResponse.text();
        console.error('Response text:', responseText.substring(0, 200));
        throw new Error('Failed to parse server response');
      }
      
      const enhancedImageUrl = enhanceResult.enhancedUrl;
      console.log('Enhancement successful, url:', enhancedImageUrl);

      // Return the full URL to the enhanced image
      const fullUrl = enhancedImageUrl.startsWith('http') 
        ? enhancedImageUrl 
        : window.location.origin + enhancedImageUrl;
      
      return fullUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Image processing error:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Fallback: Return the original image
      console.log('Falling back to original image');
      return imageData;
    } finally {
      setIsLoading(false);
    }
  };

  return { upscaleImage, isLoading, error };
};
