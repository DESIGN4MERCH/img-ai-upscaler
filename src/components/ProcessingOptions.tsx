
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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Scale Factor</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">1x</span>
          <span className="text-sm font-medium text-purple-600">{scale}x</span>
          <span className="text-sm font-medium text-gray-700">8x</span>
        </div>
        <Slider
          min={1}
          max={8}
          step={1}
          value={[scale]}
          onValueChange={(value) => setScale(value[0])}
          disabled={isProcessing}
          className="mb-4"
        />
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
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white mt-6"
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
