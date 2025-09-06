import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/logo.avif"
        className="hidden bg-white rounded-full p-1 dark:block"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <Image
        src="/images/logo.avif"
        className="block p-1 dark:hidden"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
    </>
  );
};

export default Logo;
