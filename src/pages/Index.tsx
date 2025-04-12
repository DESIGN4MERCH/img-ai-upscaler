
import { useState, useRef, useEffect } from "react";
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
import { Download, Trash2 } from "lucide-react";

// Interface for tracking processed images
interface ProcessedImageItem {
  id: string;
  originalImage: string;
  processedImage: string;
  timestamp: number;
  fileSize: string;
  enhancementType: string;
  scale: number;
}

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [enhancementType, setEnhancementType] = useState<string>("default");
  const [apiKey, setApiKey] = useState<string>("RaBvFMcSwqcrgCYf0KSylVye2AY2");
  const [processedImages, setProcessedImages] = useState<ProcessedImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    upscaleImage
  } = useUpscaleImage();

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

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setProcessedImage(null);
  };

  // Calculate file size in KB or MB
  const calculateFileSize = (dataUrl: string): string => {
    // Rough estimation: every 4 chars in base64 represent 3 bytes
    const base64 = dataUrl.split(',')[1];
    const sizeInBytes = (base64.length * 3) / 4;
    
    if (sizeInBytes < 1024 * 1024) {
      return `${Math.round(sizeInBytes / 1024)} KB`;
    }
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
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

  const handleDownload = (image: string, prefix: string = '') => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  const handleDeleteProcessedImage = (id: string) => {
    setProcessedImages(prev => prev.filter(item => item.id !== id));
    toast.success("Image removed from history");
  };

  return <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
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
                    <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-8" onClick={() => handleDownload(processedImage)}>
                      <Download className="mr-2 h-4 w-4" />
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

        {/* Image History Section */}
        {processedImages.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Your Enhanced Images</h2>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  setProcessedImages([]);
                  toast.success("History cleared");
                }}
              >
                Clear History
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedImages.map((item) => (
                <Card key={item.id} className="overflow-hidden border border-slate-200 shadow-md">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img 
                      src={item.processedImage} 
                      alt="Enhanced" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {item.scale}x Scale
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500">
                        {item.enhancementType.charAt(0).toUpperCase() + item.enhancementType.slice(1)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {item.fileSize}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                        onClick={() => handleDownload(item.processedImage, 'history-')}
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-10 p-0 border-slate-200"
                        onClick={() => handleDeleteProcessedImage(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-slate-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <BeforeAfterExamples />
        <FeatureShowcase />
        <FAQ />
      </main>

      <Footer />
    </div>;
};

export default Index;
