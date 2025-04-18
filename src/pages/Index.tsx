
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureShowcase from "@/components/FeatureShowcase";
import FAQ from "@/components/FAQ";
import { useUpscaleImage } from "@/hooks/use-upscale-image";
import ImageProcessingSection from "@/components/ImageProcessingSection";
import HistorySection from "@/components/HistorySection";
import { ProcessedImageItem } from "@/types";
import { calculateFileSize, downloadImage } from "@/utils/imageUtils";
import AdBanner from "@/components/AdBanner";
import NewsletterForm from "@/components/NewsletterForm";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [enhancementType, setEnhancementType] = useState<string>("default");
  const [apiKey, setApiKey] = useState<string>("RaBvFMcSwqcrgCYf0KSylVye2AY2");
  const [processedImages, setProcessedImages] = useState<ProcessedImageItem[]>([]);
  const { upscaleImage } = useUpscaleImage();

  useEffect(() => {
    const savedImages = localStorage.getItem('processedImages');
    if (savedImages) {
      try {
        setProcessedImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Error loading processed images:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('processedImages', JSON.stringify(processedImages));
  }, [processedImages]);

  const handleImageProcessing = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await upscaleImage(originalImage, scale, enhancementType, apiKey);
      setProcessedImage(result);
      
      const newProcessedImage: ProcessedImageItem = {
        id: Date.now().toString(),
        originalImage,
        processedImage: result,
        timestamp: Date.now(),
        fileSize: calculateFileSize(result),
        enhancementType,
        scale
      };
      
      setProcessedImages(prev => [newProcessedImage, ...prev].slice(0, 10));
      
      const resultTab = document.querySelector('[value="result"]');
      if (resultTab instanceof HTMLElement) {
        resultTab.click();
      }
      
      toast.success("Image successfully upscaled!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: string) => {
    downloadImage(image);
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4 py-[10px]">
            AI Image Upscaler
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Transform your images into high-definition masterpieces. Powered by advanced AI upscaling technology.
          </p>
        </div>

        <ImageProcessingSection 
          originalImage={originalImage}
          setOriginalImage={setOriginalImage}
          processedImage={processedImage}
          setProcessedImage={setProcessedImage}
          scale={scale}
          setScale={setScale}
          enhancementType={enhancementType}
          setEnhancementType={setEnhancementType}
          isProcessing={isProcessing}
          handleImageProcessing={handleImageProcessing}
          handleDownload={handleDownload}
        />

        <AdBanner />
        
        <NewsletterForm />

        <HistorySection 
          processedImages={processedImages} 
          setProcessedImages={setProcessedImages} 
        />

        <FeatureShowcase />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
