import ScoresList from "@/components/events/scores-list";

const CcSeniorScoresList = () => {
  const golfers = [
    {
      id: "1",
      firstName: "Dave",
      lastName: "Sowalsky",
      scoreOne: 79,
      scoreTwo: 82,
    },
    {
      id: "2",
      firstName: "Marcel",
      lastName: "Ouellette",
      scoreOne: 87,
      scoreTwo: 85,
      highlight: true,
    },
    {
      id: "3",
      firstName: "Dave",
      lastName: "Pelletier",
      scoreOne: 83,
      scoreTwo: 90,
    },
    {
      id: "4",
      firstName: "Mike",
      lastName: "Flythe",
      scoreOne: 92,
      scoreTwo: 98,
    },
    {
      id: "5",
      firstName: "Richard",
      lastName: "Bilodeau",
      scoreOne: 92,
      scoreTwo: 104,
    },
    {
      id: "6",
      firstName: "Bill",
      lastName: "Hulk",
      scoreOne: 100,
      scoreTwo: 100,
    },
  ];
  return (
    <>
      <ScoresList golfers={golfers} />
    </>
  );
};

export default CcSeniorScoresList;
