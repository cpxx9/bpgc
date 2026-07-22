import ImageCarousel from "@/components/gallery/image-carousel";
import { getDisplayedImagesPublic } from "@/lib/actions/image.actions";

const ImageGallery = async () => {
  const result = await getDisplayedImagesPublic();
  if (!result.success || result.data.length < 1) {
    return <>No images found!</>;
  }

  return (
    <>
      <ImageCarousel data={result.data} />
    </>
  );
};

export default ImageGallery;
