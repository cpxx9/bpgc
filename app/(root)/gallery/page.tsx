import ImageGallery from "@/components/gallery/image-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Checkout some great images/videos from over the years as a league. Join in on the fun!",
};

const GalleryPage = () => {
  return (
    <article className="h-full overflow-hidden flex flex-col justify-center items-center p-3">
      <ImageGallery />
    </article>
  );
};

export default GalleryPage;
