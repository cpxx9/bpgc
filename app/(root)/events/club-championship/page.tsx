import splash from "@/assets/homepagesplash.avif";
import CcNetScoresList from "@/components/events/cc-net-scores-list";
import CcScoresList from "@/components/events/cc-scores-list";
import CcSeniorScoresList from "@/components/events/cc-senior-scores-list";
import Image from "next/image";

const EventsClubChampionshipPage = () => {
  return (
    <article className="p-3 relative flex items-center justify-center text-white min-h-[100%]">
      <Image
        src={
          "https://x1h2s6dbph.ufs.sh/f/TnIoxIi73IiaIMZCNRs49rI2nUdFSRvTwcHuxe6QYoPb71kO"
        }
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />

      <div className="-z-10 absolute inset-0 bg-black/30" />

      <div className="w-full max-w-5xl px-4 space-y-6">
        <section className="bg-blue-400/70 text-center py-6 rounded">
          <h2 className="text-3xl font-bold uppercase leading-tight">
            2025 BPGC Club Championship
            <br />
            Final Results
          </h2>
        </section>
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-600/70 p-6 rounded">
            <h4 className="text-xl font-semibold mb-4 text-center">
              CLUB CHAMPIONSHIP
            </h4>
            <CcScoresList />
          </section>
          <section className="bg-slate-600/70 p-6 rounded">
            <h4 className="text-xl font-semibold mb-4 text-center">
              SENIOR CLUB CHAMPIONSHIP
            </h4>
            <CcSeniorScoresList />
          </section>
        </div>
        <section className="bg-slate-600/70 p-6 rounded text-center">
          <h4 className="text-xl font-semibold mb-4">NET CLUB CHAMPIONSHIP</h4>
          <CcNetScoresList />
        </section>
      </div>
    </article>
  );
};

export default EventsClubChampionshipPage;
