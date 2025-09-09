import Logo from "@/components/shared/logo";
import Image from "next/image";

const AboutPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className="bg-blue-300 flex-col flex-center p-6 font-semibold text-white dark:text-gray-900 md:flex-row">
        <Logo width={116} height={116} />
        <div className="flex-center flex-col">
          <h2 className="text-center mt-3 text-[2.1em]/[2rem]">
            CT'S FIRST GOLF CLUB WITHOUT REAL ESTATE
          </h2>
          <hr className="w-11 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
          <h4 className="pb-3 text-[1.8em]/[1.8rem]">EST. 1989</h4>
        </div>
      </section>
      <section className="p-6 flex flex-col gap-2 md:flex-row md:gap-6 lg:gap-6 lg:mx-10">
        <div className="md:flex-none md:w-[250px] lg:w-[350px]">
          <h3 className="text-[1.6em] font-semibold">
            {currentYear} Officers/Board
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-[1.4em] font-semibold">
                Chairman of the Board
              </h4>
              <h5 className="text-[1.4em]">Michael L. Flythe</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">President</h4>
              <h5 className="text-[1.4em]">Brian Westermeyer</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">Vice President</h4>
              <h5 className="text-[1.4em]">Dale Laprise</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">Treasurer</h4>
              <h5 className="text-[1.4em]">Michael L. Flythe</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">Handicap Chairman</h4>
              <h5 className="text-[1.4em]">Dave Sowalsky</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">Board Members</h4>
              <h5 className="text-[1.4em]">George Teed</h5>
              <h5 className="text-[1.4em]">Mike Luneau</h5>
              <h5 className="text-[1.4em]">Phil St. Pierre</h5>
              <h5 className="text-[1.4em]">Joe Danscak</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">
                Tournament Committee
              </h4>
              <h5 className="text-[1.4em]">Entire Board</h5>
            </div>
            <div>
              <h4 className="text-[1.4em] font-semibold">
                Information Technology
              </h4>
              <h5 className="text-[1.4em]">Brian Westermeyer</h5>
              <h5 className="text-[1.4em]">Dave Sowalsky</h5>
            </div>
          </div>
        </div>
        <div className="md:flex-auto">
          <h3 className="text-[1.6em] font-semibold">History/Overview</h3>
          <article className="text-xl">
            <p>
              Dave Whiting, Mike Flythe and 9 other charter members started the
              Beaver Point Golf Club (BPGC) in July of 1989. After petitioning
              the CSGA to to officially recognize there organization, Beaver
              Point became the first Golf Club Without Real Estate in
              Connecticut. The BPGC is also a member club of the USGA and
              utilizes the GHIN system for official handicapping. When members
              golf away from the club, they can either enter their scores at
              that course, login and enter it through the CSGA or GHIN website,
              mail the card to the Beaver P.O. Box or turn it in at the next
              outing.
            </p>
            <br />
            <p>
              In accordance with USGA/CSGA rules, Club Officers and a Board of
              Directors are elected each year, and set the dues for the upcoming
              season. For the upcoming 2021 season, dues are $80 for new and
              returning members (no initiation fee) and $40 for seniors and
              students. All fees include a GHIN Handicap.
            </p>
            <br />
            <p>
              Annual membership typically fluctuates between 60 and 80 golfers
              and the club plays every Saturday during the golf season through
              September. The schedule is completed by opening day, however
              members are not obligated to play all events. If a member is
              playing in the upcoming weekend event, they are required to call
              into the BPGC Hotline and leave a message to reserve their spot.
              Courses played throughout the season include Blackledge C.C.,
              Timberlin G.C., Portland G.C., Portland West, Topstone G.C.,
              Quarry Ridge, Stanley G.C., Cedar Knob G.C., Lyman Orchards G.C.
              and River Ridge G.C. This season, the club will adding 3-4 "road
              trips" during off-weeks (non two man days), where we will play
              courses in neighboring states and in northwest CT. Additionally,
              we'll be traveling to Vermont for a weekend golf trip.
            </p>
            <br />
            <p>
              Numerous competitions and matches are held throughout the season.
              Season-long events include Two-Man (best ball competition, 8
              matches and playoffs) and a two week Seniors (60+) vs. Youths
              Match. Each week also features closest-to-the-pin contests on
              every par three, with prizes awarded to the winners. Individual
              events include a four-man team tourney and several other one-day
              events including low gross/net and full field skins matches. The
              annual Club Championship and Banquet is held at season's end.
              Here, trophies and prizes are awarded for the Overall Club Regular
              and Senior Champions (gross), Overall Net Club Champion
              (full-field), Individual Flight Champions, Two-Man Championship
              (1st thru 4th place), Top "Birdie Buster", "Snowman" leader and
              the season-long Closest-to-the-Pin contest (1st and 2nd). All
              prizes given during the season for individual events and contests
              and at the Championship Banquet are in the form of Beaver Bucks
              (club credits). These can be redeemed for anything club related,
              including greens fees, membership dues, raffle tickets, tournament
              costs, etc. In the past we have given out over $3000 per season in
              Beaver Bucks.
            </p>
            <br />
            <p>
              If you have any questions about the club, search the website
              further, call the BPGC Hotline and leave a message (we'll call you
              back) or send us an email at beaverpointgc@gmail.com.
            </p>
          </article>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
