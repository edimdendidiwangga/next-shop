export const getFirstImageUrl = (images: any) => {
    if (!images || images.length === 0) return null;
  
    let firstImage = images[0];

    if (typeof firstImage === 'string' && firstImage.startsWith('["')) {
      try {
        const parsedImages = JSON.parse(firstImage);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          firstImage = parsedImages[0];
        }
      } catch (error) {
        console.error('Failed to parse image URL:', error);
      }
    }
    return firstImage;
  }