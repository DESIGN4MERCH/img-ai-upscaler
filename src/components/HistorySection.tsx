
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Trash2, Calendar, Scale, Settings } from "lucide-react";

// Interface for tracking processed images
export interface ProcessedImageItem {
  id: string;
  originalImage: string;
  processedImage: string;
  timestamp: number;
  fileSize: string;
  enhancementType: string;
  scale: number;
}

interface HistorySectionProps {
  processedImages: ProcessedImageItem[];
  setProcessedImages: React.Dispatch<React.SetStateAction<ProcessedImageItem[]>>;
}

const HistorySection = ({ processedImages, setProcessedImages }: HistorySectionProps) => {
  
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

  if (processedImages.length === 0) {
    return null;
  }

  return (
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
      
      <div className="space-y-3">
        {processedImages.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all p-3 flex items-center">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.processedImage} 
                alt="Enhanced" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow ml-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-purple-600 font-medium">
                  <Scale className="h-3.5 w-3.5" />
                  <span>{item.scale}x</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-blue-600">
                  <Settings className="h-3.5 w-3.5" />
                  <span>{item.enhancementType.charAt(0).toUpperCase() + item.enhancementType.slice(1)}</span>
                </div>
                <span className="text-xs text-slate-500">{item.fileSize}</span>
              </div>
              
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white text-xs py-1 h-8"
                  onClick={() => handleDownload(item.processedImage, 'history-')}
                >
                  <Download className="mr-1 h-3.5 w-3.5" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  className="w-8 h-8 p-0 border-slate-200"
                  onClick={() => handleDeleteProcessedImage(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
