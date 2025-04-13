
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

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
  // Define the allowed scale values
  const scaleValues = [2, 4, 6, 8, 16];
  
  // Find the closest allowed scale value
  const handleScaleChange = (value: number) => {
    // Map the slider range (1-8) to our allowed scale values
    const index = Math.min(Math.floor((value - 1) / 2), scaleValues.length - 1);
    setScale(scaleValues[index]);
  };
  
  // Map our scale back to slider position (approximate)
  const getSliderValue = () => {
    const index = scaleValues.indexOf(scale);
    if (index === -1) return 1; // Default to 1 if not found
    return Math.min(index * 2 + 1, 8); // Map back to 1-8 range
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Scale Factor</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">1x</span>
          <span className="text-sm font-medium text-purple-600">{scale}x</span>
          <span className="text-sm font-medium text-gray-700">16x</span>
        </div>
        <Slider
          min={1}
          max={5}
          step={1}
          value={[getSliderValue()]}
          onValueChange={(value) => handleScaleChange(value[0])}
          disabled={isProcessing}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-gray-500 px-1">
          {scaleValues.map((value) => (
            <span key={value}>{value}x</span>
          ))}
        </div>
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
