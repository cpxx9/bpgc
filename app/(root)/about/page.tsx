import Logo from "@/components/shared/logo";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <section className="bg-blue-300 flex-col flex-center p-4 text-white text-3xl font-semibold">
        <Logo />
        <h2 className="text-center mt-2">
          CT'S FIRST GOLF CLUB WITHOUT REAL ESTATE
        </h2>
        <hr className="w-11 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
        <h4 className="pb-3">EST. 1989</h4>
      </section>
      <article></article>
    </>
  );
};

export default AboutPage;
