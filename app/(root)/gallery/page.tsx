import ImageGallery from "@/components/gallery/image-gallery";

const GalleryPage = () => {
  return (
    <article className="h-full overflow-hidden flex flex-col justify-center items-center p-3">
      <ImageGallery />
    </article>
  );
};

export default GalleryPage;
