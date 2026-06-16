import { Columns } from "lucide-react";
import { string } from "zod";

interface PropTypes {
  columns:
    | { id: string; firstName: string; lastName: string; avgScore: number }[][]
    | { id: string; firstName: string; lastName: string; score: number }[][];
}

const ThreeColList = ({ columns }: PropTypes) => {
  return (
    <section className="flex justify-between">
      {columns.map((col, i) => (
        <div key={i}>
          {col.map((golfer) => (
            <div
              key={golfer.id}
              className="flex justify-between text-white font-semibold text-lg"
            >
              <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
              <p className="ml-3">
                {"avgScore" in golfer ? golfer.avgScore : golfer.score}
              </p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default ThreeColList;
