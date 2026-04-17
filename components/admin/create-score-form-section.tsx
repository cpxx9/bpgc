import CreateScoreForm from "@/components/admin/create-score-form";
import UpdateScoreForm from "@/components/admin/update-score-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GolferWithScores } from "@/types";

interface PropTypes {
  id: string;
  golfers?: GolferWithScores[];
}

const CreateScoreFormSection = ({ golfers, id }: PropTypes) => {
  return golfers ? (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Scores</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {golfers?.map((golfer) => (
            <div
              key={golfer.id}
              className="flex items-center justify-between border-t-2 pt-2 pb-2"
            >
              <h4>{`${golfer.firstName} ${golfer.lastName}`}</h4>
              {golfer.scores[0] ? (
                <UpdateScoreForm score={golfer.scores[0]} />
              ) : (
                <CreateScoreForm eventId={id} golferId={golfer.id} />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  ) : (
    <></>
  );
};

export default CreateScoreFormSection;
