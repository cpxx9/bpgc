const TwoManStandings = () => {
  return (
    <>
      <section>TwoManStandings</section>
      <section className="font-semibold">
        <p>
          *
          <em className="underline ml-4">
            Standings will reflect the two lowest scores dropped after week 6
          </em>
        </p>
        <p>
          **
          <span className="mx-2">
            Top <span className="text-[rgb(121,175,19)]">4 teams</span>{" "}
            automatically make the Round of 8 playoff matches; teams ranked{" "}
            <span className="text-[rgb(114,198,229)]">
              #5 - #12 play on wildcard
            </span>{" "}
            weekend for the final 4 spots
          </span>
          **
        </p>
      </section>
    </>
  );
};

export default TwoManStandings;
