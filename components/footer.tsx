import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        Est. 1989 | {APP_NAME} |
        <em className="ml-1">
          Connecticut's First Golf Club Without Real Estate
        </em>
      </div>
    </footer>
  );
};

export default Footer;
