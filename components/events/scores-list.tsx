interface PropTypes {
  golfers: {
    id: string;
    firstName: string;
    lastName: string;
    scoreOne?: number;
    scoreTwo?: number;
    highlight?: boolean;
  }[];
}

const ScoresList = ({ golfers }: PropTypes) => {
  return (
    <div className="w-fit mx-auto">
      {golfers.map((golfer) => (
        <div
          key={golfer.id}
          className={`text-lg grid grid-cols-[auto_32px_32px] gap-x-4 py-1 ${
            golfer.highlight ? "text-green-400" : "text-white"
          }`}
        >
          <span>
            {golfer.firstName} {golfer.lastName}
          </span>
          <span className="text-right tabular-nums">
            {golfer.scoreOne ?? "--"}
          </span>
          <span className="text-right tabular-nums">
            {golfer.scoreTwo ?? "--"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScoresList;
