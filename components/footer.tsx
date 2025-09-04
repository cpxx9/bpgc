import SignInLink from "@/components/shared/sign-in-link";
import { APP_NAME } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center flex-col">
        <div className="grid gap-x-1 grid-cols-3 grid-rows-2">
          <p className="col-span-3 self-end text-center">Contact us</p>
          <a
            className="self-center justify-self-end"
            href="mailto:beaverpointgc@gmail.com"
          >
            <Mail />
          </a>
          <div className="self-center justify-self-center px-3 flex border-l-2 border-r-2">
            <a className="flex gap-1" href="tel:860-917-1134">
              <Phone />
              <p>860-917-1134</p>
            </a>
          </div>
          <div className="">
            <p>P.O. Box 1463</p>
            <p>Glastonbury, CT 06033</p>
          </div>
        </div>
        <div className="flex items-center px-3">
          <div className="p-5 flex-center flex-1">
            Est. 1989 | {APP_NAME} |
            <span className="ml-1 italic">
              Connecticut's First Golf Club Without Real Estate
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <SignInLink />
      </div>
    </footer>
  );
};

export default Footer;
