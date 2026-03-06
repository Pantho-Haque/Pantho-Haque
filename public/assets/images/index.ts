// Import all images from the directory
import NotFoundImage from "./404.png";
import SpinnerImage from "./spinner.svg";




// Helper function to get the actual image source
function getImageSrc(img: string | { src?: string }): string {
  return typeof img === "object" && img.src ? img.src : (img as string);
}

// Export all images with the src check applied
export const IMAGES = {
  NotFound: getImageSrc(NotFoundImage),
  Spinner: getImageSrc(SpinnerImage),
};

export default IMAGES;