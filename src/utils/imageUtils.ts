
// Calculate file size in KB or MB
export const calculateFileSize = (dataUrl: string): string => {
  // Check if it's a data URL or a regular URL
  if (dataUrl.startsWith('data:')) {
    // Rough estimation: every 4 chars in base64 represent 3 bytes
    const base64 = dataUrl.split(',')[1];
    const sizeInBytes = (base64.length * 3) / 4;
    
    if (sizeInBytes < 1024 * 1024) {
      return `${Math.round(sizeInBytes / 1024)} KB`;
    }
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    // For regular URLs, we can't determine size directly
    return 'Size unknown';
  }
};

export const downloadImage = (image: string, prefix: string = ''): void => {
  if (!image) return;
  
  // For URLs (from our backend), we need to fetch the image first
  if (image.startsWith('http')) {
    fetch(image)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
      });
  } else {
    // For data URLs (legacy support)
    const link = document.createElement("a");
    link.href = image;
    link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
