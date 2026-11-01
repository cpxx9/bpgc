import ScoresList from "@/components/events/scores-list";

const CcScoresList = () => {
  const golfers = [
    {
      id: "1",
      firstName: "Dale",
      lastName: "Laprise",
      scoreOne: 75,
      scoreTwo: 81,
      highlight: true,
    },
    {
      id: "2",
      firstName: "George",
      lastName: "Teed",
      scoreOne: 75,
      scoreTwo: 85,
    },
    {
      id: "3",
      firstName: "Jakari",
      lastName: "Pellegrini",
      scoreOne: 78,
      scoreTwo: 87,
    },
    {
      id: "4",
      firstName: "Justin",
      lastName: "Pratte",
      scoreOne: 79,
      scoreTwo: 87,
    },
    {
      id: "5",
      firstName: "Marc",
      lastName: "Pratte",
      scoreOne: 82,
      scoreTwo: 91,
    },
    {
      id: "6",
      firstName: "Josh",
      lastName: "Pyle",
      scoreOne: 80,
      scoreTwo: 96,
    },
    {
      id: "7",
      firstName: "Michael",
      lastName: "Santiago",
      scoreOne: 92,
      scoreTwo: 88,
    },
    {
      id: "8",
      firstName: "Jim",
      lastName: "Garcia",
      scoreOne: 89,
      scoreTwo: 92,
    },
    {
      id: "9",
      firstName: "Phil",
      lastName: "Stpierre",
      scoreOne: 89,
      scoreTwo: 96,
    },
    {
      id: "10",
      firstName: "Don",
      lastName: "Hulk",
      scoreOne: 84,
      scoreTwo: 88,
    },
    {
      id: "11",
      firstName: "Jon",
      lastName: "Breski",
      scoreOne: 92,
      scoreTwo: 100,
    },
    {
      id: "12",
      firstName: "Lee",
      lastName: "Keokoummane",
      scoreOne: 95,
      scoreTwo: 98,
    },
    {
      id: "13",
      firstName: "Cole",
      lastName: "Pratte",
      scoreOne: 98,
      scoreTwo: 99,
    },
  ];
  return (
    <>
      <ScoresList golfers={golfers} />
    </>
  );
};

export default CcScoresList;
