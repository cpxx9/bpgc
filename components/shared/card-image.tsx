import { getCardImagesPublic } from "@/lib/actions/image.actions";
import cardImage from "@/assets/homepagecard.avif";
import Image from "next/image";

interface PropTypes {
  card: "isVideoOfTheWeek" | "isTwoManChamps" | "isBpgcTv";
}

const CardImage = async ({ card }: PropTypes) => {
  const bgImages = await getCardImagesPublic();

  if (!bgImages.success) {
    return (
      <>
        <Image src={cardImage} alt="card image" width={400} height={100} />
      </>
    );
  }

  return (
    <>
      <Image
        src={bgImages?.data[card]?.url ? bgImages.data[card].url : cardImage}
        alt={
          bgImages?.data[card]?.fileName
            ? bgImages.data[card].fileName
            : "background card image"
        }
        width={400}
        height={100}
      />
    </>
  );
};

export default CardImage;
