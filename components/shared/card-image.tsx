import { getCardImagesPublic } from "@/lib/actions/image.actions";
import card from "@/assets/homepagecard.avif";
import Image from "next/image";

interface PropTypes {
  card: "isVideoOfTheWeek" | "isTwoManChamps" | "isBpgcTv";
}

const CardImage = async ({ card }: PropTypes) => {
  const bgImages = await getCardImagesPublic();

  if (!bgImages.success) {
    return (
      <>
        <Image src={card} alt="card image" width={400} height={100} />
        <div className="-z-10 absolute inset-0 bg-black/30" />
      </>
    );
  }

  return (
    <>
      <Image
        src={bgImages?.data[card]?.url ? bgImages.data[card].url : card}
        alt={
          bgImages?.data[card]?.fileName
            ? bgImages.data[card].fileName
            : "background card image"
        }
        width={400}
        height={100}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
    </>
  );
};

export default CardImage;
