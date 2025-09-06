import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/logo-dark.png"
        className="hidden dark:block"
        width={48}
        height={48}
        alt={`${APP_NAME} dark mode logo`}
        priority={true}
      />
      <Image
        src="/images/logo.png"
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
