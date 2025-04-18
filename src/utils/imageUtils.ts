
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
  if (!image) {
    console.error('No image provided for download');
    return;
  }
  
  console.log('Downloading image:', image);
  
  // For URLs (from our backend), we need to fetch the image first
  if (image.startsWith('http') || image.startsWith('/')) {
    const fullUrl = image.startsWith('/') ? window.location.origin + image : image;
    console.log('Fetching from URL:', fullUrl);
    
    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Download completed');
      })
      .catch(error => {
        console.error('Error downloading image:', error);
      });
  } else {
    // For data URLs (legacy support)
    console.log('Downloading from data URL');
    const link = document.createElement("a");
    link.href = image;
    link.download = `${prefix}upscaled-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Download completed');
  }
};
