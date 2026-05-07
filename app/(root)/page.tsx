import NextEventCard from "@/components/home/next-event-card";

const Homepage = async () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-slate-400 w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold">NEXT OUTING</h2>
        <NextEventCard />
      </div>
      {/* Cards */}
      <div className="flex gap-2">
        <div className="bg-blue-300 w-[350px] text-center">
          <h3 className="text-2xl font-semibold">BPGC VIDEO OF THE WEEK</h3>
        </div>
        <div className="bg-blue-300 w-[350px] text-center">
          <h3 className="text-2xl font-semibold">
            {new Date().getFullYear() - 1} TWO MAN CHAMPS!!
          </h3>
        </div>
        <div className="bg-blue-300 w-[350px] text-center">
          <h3 className="text-2xl font-semibold">BPGC TV</h3>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
