import Logo from "@/components/shared/logo";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <article>
        <header className="bg-blue-300 flex">
          <Logo />
          <div>
            <h2>CT'S FIRST GOLF CLUB WITHOUT REAL ESTATE</h2>
            <h4>EST. 1989</h4>
          </div>
        </header>
      </article>
    </>
  );
};

export default AboutPage;
