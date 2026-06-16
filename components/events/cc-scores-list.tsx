import ScoresList from "@/components/events/scores-list";

const CcScoresList = () => {
  const golfers = [
    {
      id: "1",
      firstName: "Dale",
      lastName: "Laprise",
      scoreOne: 78,
      scoreTwo: 73,
      highlight: true,
    },
    {
      id: "2",
      firstName: "George",
      lastName: "Teed",
      scoreOne: 78,
      scoreTwo: 82,
    },
    {
      id: "3",
      firstName: "Don",
      lastName: "Hulk",
      scoreOne: 84,
      scoreTwo: 88,
    },
    {
      id: "4",
      firstName: "Brian",
      lastName: "Westermeyer",
      scoreOne: 84,
      scoreTwo: 89,
    },
    {
      id: "5",
      firstName: "Tom",
      lastName: "Vendetta",
      scoreOne: 90,
      scoreTwo: 84,
    },
    {
      id: "6",
      firstName: "Lee",
      lastName: "Keokoummane",
      scoreOne: 93,
      scoreTwo: 93,
    },
    {
      id: "7",
      firstName: "Jim",
      lastName: "Garcia",
      scoreOne: 95,
    },
  ];
  return (
    <>
      <ScoresList golfers={golfers} />
    </>
  );
};

export default CcScoresList;
