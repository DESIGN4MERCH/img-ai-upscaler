
import React, { useState, useRef, useEffect } from "react";

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ originalImage, processedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    const handleEndDrag = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleEndDrag);
      window.addEventListener('touchend', handleEndDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isDragging]);

  const startDrag = () => setIsDragging(true);
  
  const handleImagesLoaded = () => {
    setImagesLoaded(true);
    setHasError(false);
  };
  
  const handleImageError = () => {
    setHasError(true);
    console.error("Error loading one of the images");
  };

  // If any of the images has an error or is not loaded yet, show a placeholder or message
  if (hasError) {
    return (
      <div className="w-full p-6 text-center bg-slate-100 dark:bg-slate-800 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">Error loading images. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ maxHeight: '500px' }}
      >
        {/* Original Image (left side) */}
        <div 
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={originalImage} 
            alt="Original" 
            className="object-cover w-full h-full"
            style={{ maxWidth: 'none', width: `${100 / (sliderPosition / 100)}%` }}
            onLoad={handleImagesLoaded}
            onError={handleImageError}
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            Original
          </div>
        </div>

        {/* Processed Image (right side) */}
        <img 
          src={processedImage} 
          alt="Enhanced" 
          className="block w-full object-cover"
          style={{ maxHeight: '500px' }}
          onLoad={handleImagesLoaded}
          onError={handleImageError}
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          Enhanced
        </div>

        {/* Slider */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <div 
            className="absolute w-8 h-8 rounded-full bg-white shadow-lg -ml-4 -mt-4 flex items-center justify-center cursor-ew-resize" 
            style={{ top: '50%' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 6L9 12L15 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Drag the slider to compare before and after
      </div>
    </div>
  );
};

export default ImageComparison;
