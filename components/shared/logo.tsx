import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/logo.avif"
        className="hidden dark:block"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <Image
        src="/images/logo.avif"
        className="block dark:hidden"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
    </>
  );
};

export default Logo;
