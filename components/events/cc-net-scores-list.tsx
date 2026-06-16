import ThreeColList from "@/components/shared/three-col-list";

const CcNetScoresList = () => {
  const columns = [
    [
      { id: "1", firstName: "Dave", lastName: "Sowalsky", score: 138 },
      { id: "2", firstName: "Marcel", lastName: "Ouellette", score: 138 },
      { id: "3", firstName: "Don", lastName: "Hulk", score: 139 },
      { id: "4", firstName: "Dale", lastName: "Laprise", score: 141 },
      { id: "5", firstName: "Dave", lastName: "Pelletier", score: 142 },
    ],
    [
      { id: "6", firstName: "Richard", lastName: "Macrina", score: 144 },
      { id: "7", firstName: "Richard", lastName: "Bilodeau", score: 146 },
      { id: "8", firstName: "Lee", lastName: "Keokoummane", score: 148 },
      { id: "9", firstName: "George", lastName: "Teed", score: 150 },
      { id: "10", firstName: "Bill", lastName: "Hulk", score: 155 },
    ],
    [
      { id: "11", firstName: "Brian", lastName: "Westermeyer", score: 157 },
      { id: "12", firstName: "Tom", lastName: "Vendetta", score: 158 },
      { id: "13", firstName: "Jim", lastName: "Garcia" },
      { id: "14", firstName: "Mike", lastName: "Flythe" },
    ],
  ];

  return <ThreeColList columns={columns} />;
};

export default CcNetScoresList;
