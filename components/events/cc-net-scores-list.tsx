import NetCCList from "@/components/shared/net-cc-list";

const CcNetScoresList = () => {
  const columns = [
    [
      {
        firstName: "Dave",
        lastName: "Sowalsky",
        score1: 67,
        score2: 70,
      },
      {
        firstName: "Marc",
        lastName: "Pratte",
        score1: 64,
        score2: 74,
        highlight: true,
      },
      {
        firstName: "Justin",
        lastName: "Pratte",
        score1: 67,
        score2: 76,
      },
      {
        firstName: "Dave",
        lastName: "Pelletier",
        score1: 68,
        score2: 75,
      },
      {
        firstName: "Dale",
        lastName: "Laprise",
        score1: 69,
        score2: 75,
      },
      {
        firstName: "George",
        lastName: "Teed",
        score1: 67,
        score2: 78,
      },
      {
        firstName: "Marcel",
        lastName: "Ouellette",
        score1: 74,
        score2: 72,
      },
      {
        firstName: "Richard",
        lastName: "Bilodeau",
        score1: 68,
        score2: 79,
      },
    ],
    [
      {
        firstName: "Jim",
        lastName: "Garcia",
        score1: 73,
        score2: 75,
      },
      {
        firstName: "Mike",
        lastName: "Flythe",
        score1: 73,
        score2: 79,
      },
      {
        firstName: "Josh",
        lastName: "Pyle",
        score1: 69,
        score2: 85,
      },
      {
        firstName: "Lee",
        lastName: "Keokoummane",
        score1: 76,
        score2: 78,
      },
      {
        firstName: "Phil",
        lastName: "Stpierre",
        score1: 74,
        score2: 81,
      },
      {
        firstName: "Don",
        lastName: "Hulk",
        score1: 74,
        score2: 73,
      },
      {
        firstName: "Bill",
        lastName: "Hulk",
        score1: 78,
        score2: 78,
      },
      {
        firstName: "Jakari",
        lastName: "Pelligrini",
        score1: 74,
        score2: 83,
      },
    ],
    [
      {
        firstName: "Jon",
        lastName: "Breski",
        score1: 76,
        score2: 83,
      },
      {
        firstName: "Michael",
        lastName: "Santiago",
        score1: 76,
        score2: 79,
      },
      {
        firstName: "Cole",
        lastName: "Pratte",
        score1: 76,
        score2: 82,
      },
    ],
  ];

  return <NetCCList columns={columns} />;
};

export default CcNetScoresList;
