import Image from "next/image";

const BackgroundImage = async () => {
  return (
    <Image
      src={
        "https://x1h2s6dbph.ufs.sh/f/TnIoxIi73IiaGUzS80xFomAuWUPYKeZ5tlNwd8bXIg02BzVc"
      }
      alt="golf course"
      fill
      sizes="100vw"
      style={{ objectFit: "cover", zIndex: -1 }}
    />
  );
};

export default BackgroundImage;
