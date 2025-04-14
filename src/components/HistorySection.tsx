
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Trash2, Calendar, Scale, Settings, ChevronDown } from "lucide-react";
import { ProcessedImageItem } from "@/types";

interface HistorySectionProps {
  processedImages: ProcessedImageItem[];
  setProcessedImages: React.Dispatch<React.SetStateAction<ProcessedImageItem[]>>;
}

const HistorySection = ({ processedImages, setProcessedImages }: HistorySectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedImages = showAll ? processedImages : processedImages.slice(0, 5);
  
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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your Enhanced Images</h2>
        <Button 
          variant="outline" 
          className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10"
          onClick={() => {
            setProcessedImages([]);
            toast.success("History cleared");
          }}
        >
          Clear History
        </Button>
      </div>
      
      <div className="space-y-2">
        {displayedImages.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-2 flex items-center">
            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.processedImage} 
                alt="Enhanced" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow ml-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                  <Scale className="h-3 w-3" />
                  <span>{item.scale}x</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <Settings className="h-3 w-3" />
                  <span>{item.enhancementType}</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400">{item.fileSize}</span>
              </div>
              
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white text-xs h-7"
                  onClick={() => handleDownload(item.processedImage, 'history-')}
                >
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-7 h-7 p-0 border-slate-200 dark:border-slate-600"
                  onClick={() => handleDeleteProcessedImage(item.id)}
                >
                  <Trash2 className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {processedImages.length > 5 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-sm flex items-center gap-1"
          >
            {showAll ? "Show Less" : "See More"}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistorySection;
