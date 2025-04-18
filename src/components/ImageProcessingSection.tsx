
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
      <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 shadow-lg border border-slate-200 dark:border-slate-700 dark:bg-gray-800">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
            <TabsTrigger value="upload" className="dark:text-gray-200 dark:data-[state=active]:text-white">Upload Image</TabsTrigger>
            <TabsTrigger value="result" disabled={!processedImage} className="dark:text-gray-200 dark:data-[state=active]:text-white">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <ImageUploader 
              onImageUpload={setOriginalImage} 
              fileInputRef={fileInputRef} 
              originalImage={originalImage} 
            />
          </TabsContent>
          
          <TabsContent value="result" className="mt-0">
            {processedImage && (
              <div className="space-y-6">
                <ImageComparison originalImage={originalImage!} processedImage={processedImage} />
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">
                        Enhanced Image
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {`Upscaled ${scale}x with ${enhancementType} enhancement`}
                      </p>
                    </div>
                    <Button 
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white" 
                      onClick={() => handleDownload(processedImage)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-4 md:p-6 shadow-lg border border-slate-200 dark:border-slate-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Enhancement Options</h2>
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
