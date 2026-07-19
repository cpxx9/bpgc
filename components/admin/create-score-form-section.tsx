import CreateScoreForm from "@/components/admin/create-score-form";
import UpdateScoreForm from "@/components/admin/update-score-form";
import { convertFloatToFeet } from "@/lib/utils";
import { GolferWithScores } from "@/types";

interface PropTypes {
  id: string;
  golfers?: GolferWithScores[];
}

const CreateScoreFormSection = ({ golfers, id }: PropTypes) => {
  return golfers ? (
    <>
      {golfers?.map((golfer) => (
        <div
          key={golfer.id}
          className="flex items-center justify-between border-t-2 pt-2 pb-2"
        >
          <h4>{`${golfer.firstName} ${golfer.lastName}`}</h4>
          {golfer.scores[0] ? (
            <UpdateScoreForm
              score={{
                ...golfer.scores[0],
                closestToPinFeet: convertFloatToFeet(
                  golfer.scores[0].closestToPin ?? 0,
                ).feet,
                closestToPinInches:
                  convertFloatToFeet(golfer.scores[0].closestToPin ?? 0)
                    .inches ?? 0,
              }}
            />
          ) : (
            <CreateScoreForm eventId={id} golferId={golfer.id} />
          )}
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};

export default CreateScoreFormSection;
