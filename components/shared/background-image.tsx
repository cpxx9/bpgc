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
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="-z-10 absolute inset-0 bg-black/30" />
      </>
    );
  }

  return (
    <>
      <Image
        src={bgImages.data[page].url}
        alt={bgImages.data[page].fileName}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
    </>
  );
};

export default BackgroundImage;
