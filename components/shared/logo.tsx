import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import darkLogo from "@/assets/logo-dark.png";
import lightLogo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface PropTypes {
  className?: string;
  height?: number;
  width?: number;
}

const Logo = ({ className = "", height = 48, width = 48 }: PropTypes) => {
  return (
    <>
      <Image
        src={darkLogo}
        className={cn(className, "hidden dark:block")}
        width={width}
        height={height}
        alt={`${APP_NAME} dark mode logo`}
        priority={true}
      />
      <Image
        src={lightLogo}
        className={cn(className, "block dark:hidden")}
        width={width}
        height={height}
        alt={`${APP_NAME} light modelogo`}
        priority={true}
      />
    </>
  );
};

export default Logo;
