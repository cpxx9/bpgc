import Link from "next/link";
import { APP_NAME, APP_NAME_ABR } from "@/lib/constants";
import Menu from "@/components/shared/header/menu";
import Logo from "@/components/shared/logo";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link className="flex-start" href="/">
            <Logo />
            <span className="hidden md:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
            <span className="block font-bold text-2xl ml-3 md:hidden">
              {APP_NAME_ABR}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
