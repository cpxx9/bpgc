interface PropTypes {
  golfers: {
    id: string;
    firstName: string;
    lastName: string;
    scoreOne: number;
    scoreTwo: number;
    highlight?: boolean;
  }[];
}

const ScoresList = ({ golfers }: PropTypes) => {
  return (
    <div>
      {golfers.map((golfer) => (
        <div
          key={golfer.id}
          className={`grid grid-cols-[1fr_40px_40px] py-1 ${
            golfer.highlight ? "text-green-400" : ""
          }`}
        >
          <span>
            {golfer.firstName} {golfer.lastName}
          </span>
          <span className="text-right">{golfer.scoreOne}</span>
          <span className="text-right">{golfer.scoreTwo}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoresList;
