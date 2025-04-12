
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/ImageUploader";
import ImageComparison from "@/components/ImageComparison";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProcessingOptions from "@/components/ProcessingOptions";
import { useUpscaleImage } from "@/hooks/use-upscale-image";
import FeatureShowcase from "@/components/FeatureShowcase";
import FAQ from "@/components/FAQ";
import BeforeAfterExamples from "@/components/BeforeAfterExamples";
const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [enhancementType, setEnhancementType] = useState<string>("default");
  const [apiKey, setApiKey] = useState<string>("RaBvFMcSwqcrgCYf0KSylVye2AY2");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    upscaleImage
  } = useUpscaleImage();
  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setProcessedImage(null);
  };
  const handleImageProcessing = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await upscaleImage(originalImage, scale, enhancementType, apiKey);
      setProcessedImage(result);
      toast.success("Image successfully upscaled!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `upscaled-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };
  return <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-20 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4 py-[10px]">
            AI Image Upscaler
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your low-resolution images into stunning high-definition visuals using our advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="col-span-1 lg:col-span-2 p-6 shadow-lg border border-slate-200">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="result" disabled={!processedImage}>Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <ImageUploader onImageUpload={handleImageUpload} fileInputRef={fileInputRef} originalImage={originalImage} />
              </TabsContent>
              
              <TabsContent value="result" className="mt-0">
                {processedImage ? <div className="flex flex-col items-center">
                    <ImageComparison originalImage={originalImage!} processedImage={processedImage} />
                    <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-8" onClick={handleDownload}>
                      Download Image
                    </Button>
                  </div> : <div className="text-center py-20">
                    <p className="text-slate-500">Process an image to see results</p>
                  </div>}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold mb-6">Enhancement Options</h2>
            <ProcessingOptions scale={scale} setScale={setScale} enhancementType={enhancementType} setEnhancementType={setEnhancementType} isProcessing={isProcessing} handleImageProcessing={handleImageProcessing} originalImage={originalImage} />
          </Card>
        </div>

        <BeforeAfterExamples />
        <FeatureShowcase />
        <FAQ />
      </main>

      <Footer />
    </div>;
};
export default Index;
