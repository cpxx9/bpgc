import ImageGallery from "@/components/gallery/image-gallery";

const GalleryPage = () => {
  return (
    <article className="p-3 min-h-[100%] flex flex-col justify-center items-center">
      <div className="">
        <ImageGallery />
      </div>
    </article>
  );
};

export default GalleryPage;
