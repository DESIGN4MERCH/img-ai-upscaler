
import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ProcessingOptionsProps {
  scale: number;
  setScale: (value: number) => void;
  enhancementType: string;
  setEnhancementType: (value: string) => void;
  isProcessing: boolean;
  handleImageProcessing: () => void;
  originalImage: string | null;
}

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  scale,
  setScale,
  enhancementType,
  setEnhancementType,
  isProcessing,
  handleImageProcessing,
  originalImage
}) => {
  // Define the allowed scale values (removed 16)
  const scaleValues = [2, 4, 6, 8];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Scale Factor</h3>
        <ToggleGroup 
          type="single" 
          value={scale.toString()} 
          onValueChange={(value) => value && setScale(parseInt(value))}
          className="grid grid-cols-4 w-full gap-2"
          disabled={isProcessing}
        >
          {scaleValues.map((value) => (
            <ToggleGroupItem
              key={value}
              value={value.toString()}
              className={
                scale === value 
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold"
                  : "border-purple-200 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700"
              }
              disabled={isProcessing}
            >
              <span className={scale === value ? "text-white font-medium text-lg" : "text-slate-700 dark:text-slate-200"}>
                {value}x
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div>
        <h3 className="font-medium mb-3">Enhancement Mode</h3>
        <RadioGroup
          value={enhancementType}
          onValueChange={setEnhancementType}
          className="space-y-3"
          disabled={isProcessing}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default" className="cursor-pointer">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="denoise" id="denoise" />
            <Label htmlFor="denoise" className="cursor-pointer">Reduce Noise</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enhance" id="enhance" />
            <Label htmlFor="enhance" className="cursor-pointer">Enhance Details</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sharpen" id="sharpen" />
            <Label htmlFor="sharpen" className="cursor-pointer">Sharpen</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white mt-6 transition-all duration-300 transform hover:scale-105"
        onClick={handleImageProcessing}
        disabled={isProcessing || !originalImage}
      >
        {isProcessing ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Enhance Image"
        )}
      </Button>
      
      <div className="text-xs text-gray-500 mt-4">
        <p>Powered by advanced AI technology</p>
      </div>
    </div>
  );
};

export default ProcessingOptions;
