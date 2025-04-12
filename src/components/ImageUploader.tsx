
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  originalImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, fileInputRef, originalImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error("Image size should be less than 10MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          handleFile(blob);
          break;
        }
      }
    }
  };

  return (
    <div 
      className={`w-full min-h-[300px] flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
        isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
      } p-6`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      
      {originalImage ? (
        <div className="w-full">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={originalImage} 
              alt="Uploaded preview" 
              className="w-full object-contain max-h-[400px]" 
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline"
              className="bg-white"
              onClick={handleButtonClick}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Different Image
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your image</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Drag and drop your image here, or click to browse<br />
            You can also paste an image directly
          </p>
          <Button 
            variant="outline" 
            className="bg-white"
            onClick={handleButtonClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            Select Image
          </Button>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPG, PNG, WEBP (Max: 10MB)
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
