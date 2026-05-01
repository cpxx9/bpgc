import NextEventCard from "@/components/home/next-event-card";

const Homepage = async () => {
  return (
    <div>
      <div>
        <NextEventCard />
      </div>
      {/* Cards */}
      <div>
        <div>
          <h3>BPGC VIDEO OF THE WEEK</h3>
        </div>
        <div>
          <h3>{new Date().getFullYear() - 1} TWO MAN CHAMPS!!</h3>
        </div>
        <div>
          <h3>BPGC TV</h3>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
