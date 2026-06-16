import ScoresList from "@/components/events/scores-list";

const CcSeniorScoresList = () => {
  const golfers = [
    {
      id: "1",
      firstName: "Marcel",
      lastName: "Ouellette",
      scoreOne: 80,
      scoreTwo: 82,
      highlight: true,
    },
    {
      id: "2",
      firstName: "Dave",
      lastName: "Sowalsky",
      scoreOne: 82,
      scoreTwo: 82,
    },
    {
      id: "3",
      firstName: "Dave",
      lastName: "Pelletier",
      scoreOne: 92,
      scoreTwo: 84,
    },
    {
      id: "4",
      firstName: "Richard",
      lastName: "Bilodeau",
      scoreOne: 95,
      scoreTwo: 99,
    },
    {
      id: "5",
      firstName: "Bill",
      lastName: "Hulk",
      scoreOne: 90,
      scoreTwo: 108,
    },
    {
      id: "6",
      firstName: "Richard",
      lastName: "Macrina",
      scoreOne: 104,
      scoreTwo: 98,
    },
    {
      id: "7",
      firstName: "Mike",
      lastName: "Flythe",
      scoreOne: 99,
    },
  ];
  return (
    <>
      <ScoresList golfers={golfers} />
    </>
  );
};

export default CcSeniorScoresList;
