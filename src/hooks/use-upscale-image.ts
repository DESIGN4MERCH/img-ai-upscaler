import { useState } from "react";

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
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const actualScale = scale > 0 ? scale : 2;
          
          const maxDimension = 16000;
          const targetWidth = img.width * actualScale;
          const targetHeight = img.height * actualScale;
          
          if (targetWidth > maxDimension || targetHeight > maxDimension) {
            const aspectRatio = img.width / img.height;
            if (aspectRatio >= 1) {
              canvas.width = maxDimension;
              canvas.height = maxDimension / aspectRatio;
            } else {
              canvas.height = maxDimension;
              canvas.width = maxDimension * aspectRatio;
            }
          } else {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
          }
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(imageData);
            return;
          }
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          if (enhancementType === 'sharpen') {
            ctx.filter = 'contrast(1.4) saturate(1.2) brightness(1.05)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
          } else if (enhancementType === 'enhance') {
            ctx.filter = 'contrast(1.3) saturate(1.3) brightness(1.1)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
          } else if (enhancementType === 'denoise') {
            ctx.filter = 'blur(0.5px)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'contrast(1.2) brightness(1.05)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
          } else {
            ctx.filter = 'contrast(1.1) saturate(1.1) brightness(1.05)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
          }
          
          const enhancedImageData = canvas.toDataURL('image/jpeg', 0.92);
          
          setTimeout(() => {
            const resultTab = document.querySelector('[value="result"]');
            if (resultTab instanceof HTMLElement) {
              resultTab.click();
            }
            resolve(enhancedImageData);
          }, 1500);
        };
        
        img.src = imageData;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { upscaleImage, isLoading, error };
};
