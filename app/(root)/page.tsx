import splash from "@/assets/homepagesplash.avif";
import card from "@/assets/homepagecard.avif";
import Image from "next/image";
import NextEventCard from "@/components/home/next-event-card";
import { Button } from "@/components/ui/button";

const Homepage = async () => {
  return (
    <div className="flex flex-col items-center gap-3 mb-12">
      <div className="w-full flex flex-col items-center pt-32 pb-10 gap-4 tracking-widest relative">
        <Image
          src={splash}
          alt="golf course"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="bg-gray-600/75 py-5 px-10 pb-14">
          <h2 className="text-5xl text-white font-black tracking-[0.2em] text-center px-10">
            NEXT OUTING
          </h2>
          <NextEventCard />
        </div>
        <div>
          <Button className="rounded-full tracking-[0.4em] font-semibold py-8 px-7 text-md">
            REGISTER ONLINE HERE
          </Button>
        </div>
      </div>
      {/* Cards */}
      <div className="flex gap-2">
        <div className="bg-blue-300 text-center py-4 px-10">
          <h3 className="text-2xl font-semibold">BPGC VIDEO OF THE WEEK</h3>
          <Image src={card} width={400} height={100} alt="winners" />
          <p className="mt-1">Looks like a normal BPGC outing...</p>
        </div>
        <div className="bg-blue-300 text-center py-4 px-10">
          <h3 className="text-2xl font-semibold">
            {new Date().getFullYear() - 1} TWO MAN CHAMPS!!
          </h3>
          <Image src={card} width={400} height={100} alt="winners" />
          <p className="mt-1">ANOTHER CHAMPIONSHIP!</p>
        </div>
        <div className="bg-blue-300 text-center py-4 px-10">
          <h3 className="text-2xl font-semibold">BPGC TV</h3>
          <Image src={card} width={400} height={100} alt="winners" />
          <p className="mt-1">
            Random videos, media and other content.... Check it out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
