import SignInLink from "@/components/shared/sign-in-link";
import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex items-center px-3">
        <div className="p-5 flex-center flex-1">
          Est. 1989 | {APP_NAME} |
          <em className="ml-1">
            Connecticut's First Golf Club Without Real Estate
          </em>
        </div>
        <SignInLink />
      </div>
    </footer>
  );
};

export default Footer;
