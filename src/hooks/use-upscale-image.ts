
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
        },
        body: JSON.stringify({
          filename,
          scale,
          enhancementType,
        }),
      });

      if (!enhanceResponse.ok) {
        const errorData = await enhanceResponse.json().catch(() => ({ error: 'Enhancement failed' }));
        throw new Error(errorData.error || 'Failed to enhance image');
      }

      const enhanceResult = await enhanceResponse.json();
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
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { upscaleImage, isLoading, error };
};
