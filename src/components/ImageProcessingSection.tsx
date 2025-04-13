
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import ImageComparison from "@/components/ImageComparison";
import ProcessingOptions from "@/components/ProcessingOptions";

interface ImageProcessingSectionProps {
  originalImage: string | null;
  setOriginalImage: (image: string | null) => void;
  processedImage: string | null;
  setProcessedImage: (image: string | null) => void;
  scale: number;
  setScale: (value: number) => void;
  enhancementType: string;
  setEnhancementType: (value: string) => void;
  isProcessing: boolean;
  handleImageProcessing: () => void;
  handleDownload: (image: string) => void;
}

const ImageProcessingSection = ({
  originalImage,
  setOriginalImage,
  processedImage,
  setProcessedImage,
  scale,
  setScale,
  enhancementType,
  setEnhancementType,
  isProcessing,
  handleImageProcessing,
  handleDownload
}: ImageProcessingSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <Card className="col-span-1 lg:col-span-2 p-6 shadow-lg border border-slate-200">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="result" disabled={!processedImage}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <ImageUploader 
              onImageUpload={setOriginalImage} 
              fileInputRef={fileInputRef} 
              originalImage={originalImage} 
            />
          </TabsContent>
          
          <TabsContent value="result" className="mt-0">
            {processedImage ? <div className="flex flex-col items-center">
                <ImageComparison originalImage={originalImage!} processedImage={processedImage} />
                <Button 
                  className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-8 transform transition-all duration-300 hover:scale-105 shadow-md" 
                  onClick={() => handleDownload(processedImage)}
                >
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
        <ProcessingOptions 
          scale={scale} 
          setScale={setScale} 
          enhancementType={enhancementType} 
          setEnhancementType={setEnhancementType} 
          isProcessing={isProcessing} 
          handleImageProcessing={handleImageProcessing} 
          originalImage={originalImage} 
        />
      </Card>
    </div>
  );
};

export default ImageProcessingSection;
