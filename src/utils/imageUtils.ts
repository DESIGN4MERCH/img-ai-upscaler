
// Calculate file size in KB or MB
export const calculateFileSize = (dataUrl: string): string => {
  // Rough estimation: every 4 chars in base64 represent 3 bytes
  const base64 = dataUrl.split(',')[1];
  const sizeInBytes = (base64.length * 3) / 4;
  
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.round(sizeInBytes / 1024)} KB`;
  }
  return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const downloadImage = (image: string, prefix: string = ''): void => {
  if (!image) return;
  const link = document.createElement("a");
  link.href = image;
  link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
