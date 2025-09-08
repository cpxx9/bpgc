import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import darkLogo from "@/assets/logo-dark.png";
import lightLogo from "@/assets/logo.png";

const Logo = () => {
  return (
    <>
      <Image
        src={darkLogo}
        className="hidden dark:block"
        width={48}
        height={48}
        alt={`${APP_NAME} dark mode logo`}
        priority={true}
      />
      <Image
        src={lightLogo}
        className="block dark:hidden"
        width={48}
        height={48}
        alt={`${APP_NAME} light modelogo`}
        priority={true}
      />
    </>
  );
};

export default Logo;
