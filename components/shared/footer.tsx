import SignInLink from "@/components/shared/sign-in-link";
import { APP_NAME } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t relative">
      <div className="wrapper flex-center flex-col">
        <div className="flexcolepratte@aol.com">
          <p className="">Contact us</p>
        </div>
        <div className="flex-center items-center gap-4">
          <div className="flex-1">
            <p>P.O. Box 1463</p>
            <p>Glastonbury, CT 06033</p>
          </div>
          <div className="flex-1 flex-center">
            <a className="flex-center gap-2" href="tel:860-917-1134">
              <Phone />
              <p>860-917-1134</p>
            </a>
          </div>
          <div className="flex-1 flex-center">
            <a
              className="flex-center gap-2"
              href="mailto:beaverpointgc@gmail.com"
            >
              <Mail />
              <p>Email us!</p>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex ">
          <div className="p-5 flex-center flex-1">
            Est. 1989 | {APP_NAME} |
            <span className="italic">
              Connecticut's First Golf Club Without Real Estate
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2 sm:top-auto bottom-2">
        <SignInLink />
      </div>
    </footer>
  );
};

export default Footer;
