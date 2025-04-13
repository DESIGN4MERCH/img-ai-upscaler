
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureShowcase from "@/components/FeatureShowcase";
import FAQ from "@/components/FAQ";
import BeforeAfterExamples from "@/components/BeforeAfterExamples";
import { useUpscaleImage } from "@/hooks/use-upscale-image";
import ImageProcessingSection from "@/components/ImageProcessingSection";
import HistorySection from "@/components/HistorySection";
import { ProcessedImageItem } from "@/components/HistorySection";
import { calculateFileSize, downloadImage } from "@/utils/imageUtils";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [enhancementType, setEnhancementType] = useState<string>("default");
  const [apiKey, setApiKey] = useState<string>("RaBvFMcSwqcrgCYf0KSylVye2AY2");
  const [processedImages, setProcessedImages] = useState<ProcessedImageItem[]>([]);
  const { upscaleImage } = useUpscaleImage();

  // Load processed images from localStorage on component mount
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

  // Save processed images to localStorage whenever the array changes
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
      
      // Add to processed images history
      const newProcessedImage: ProcessedImageItem = {
        id: Date.now().toString(),
        originalImage,
        processedImage: result,
        timestamp: Date.now(),
        fileSize: calculateFileSize(result),
        enhancementType,
        scale
      };
      
      setProcessedImages(prev => [newProcessedImage, ...prev].slice(0, 10)); // Keep last 10 images
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-30 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4 py-[10px]">
            AI Image Upscaler
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your low-resolution images into stunning high-definition visuals using our advanced AI technology
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

        <HistorySection 
          processedImages={processedImages} 
          setProcessedImages={setProcessedImages} 
        />

        <BeforeAfterExamples />
        <FeatureShowcase />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
