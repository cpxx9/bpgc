import { Columns } from "lucide-react";
import { string } from "zod";

interface PropTypes {
  columns: {
    firstName: string;
    lastName: string;
    score1: number;
    score2: number;
    highlight?: boolean;
  }[][];
}

const NetCCList = ({ columns }: PropTypes) => {
  if (columns[0].length < 1) {
    return <section>No club championship scores yet!</section>;
  }
  console.log(columns);

  return (
    <section className="flex flex-col md:flex-row justify-between">
      {columns.map((col, i) => (
        <div key={i}>
          {col.map((golfer, i) => (
            <div
              key={`golfer-${i}`}
              className={`flex gap-9 justify-between text-white text-lg`}
            >
              <p
                className={golfer.highlight ? "text-green-400" : "text-white"}
              >{`${golfer.firstName} ${golfer.lastName}`}</p>
              <div className="flex gap-2">
                <p
                  className={golfer.highlight ? "text-green-400" : "text-white"}
                >
                  {golfer.score1}
                </p>
                <p
                  className={golfer.highlight ? "text-green-400" : "text-white"}
                >
                  {golfer.score2}
                </p>
                <p
                  className={golfer.highlight ? "text-green-400" : "text-white"}
                >
                  ({golfer.score1 + golfer.score2})
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default NetCCList;
