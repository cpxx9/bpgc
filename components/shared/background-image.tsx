import { getBgImagesPublic } from "@/lib/actions/image.actions";
import splash from "@/assets/homepagesplash.avif";
import Image from "next/image";

interface PropTypes {
  page:
    | "home"
    | "schedule"
    | "weeklyScores"
    | "scoringAverages"
    | "twoManLeague"
    | "clubChampionship"
    | "contests";
}

const BackgroundImage = async ({ page }: PropTypes) => {
  const bgImages = await getBgImagesPublic();

  if (!bgImages.success) {
    return (
      <>
        <Image
          src={splash}
          alt="golf course"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: -20 }}
        />
        <div className="-z-10 absolute inset-0 bg-black/30" />
      </>
    );
  }

  return (
    <>
      <Image
        src={bgImages?.data[page]?.url ? bgImages.data[page].url : splash}
        alt={
          bgImages?.data[page]?.fileName
            ? bgImages.data[page].fileName
            : "background splash image"
        }
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
    </>
  );
};

export default BackgroundImage;
