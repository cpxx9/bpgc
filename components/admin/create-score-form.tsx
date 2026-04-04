"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { createScore } from "@/lib/actions/score.actions";

interface PropTypes {
  eventId: string;
  golferId: string;
}

const CreateScoreForm = ({ eventId, golferId }: PropTypes) => {
  const [data, action] = useActionState(createScore, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const CreateButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form={`create-${golferId}-score-form`}
        type="submit"
        disabled={pending}
        className="w-full"
        variant="default"
      >
        {pending ? "Creating..." : "Add Score"}
      </Button>
    );
  };

  return (
    <div className="">
      <form id={`create-${golferId}-score-form`} action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <input type="hidden" name="eventId" value={eventId} />
        <input type="hidden" name="golferId" value={golferId} />
        <div className="flex gap-3">
          <div className="flex justify-center items-center gap-2">
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              name="score"
              type="number"
              className="!m-0 !w-[5rem] text-center"
              required
            ></Input>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label htmlFor="birdies">Birdies</Label>
            <Input
              id="birdies"
              name="birdies"
              type="number"
              className="!m-0 !w-[5rem] text-center"
              required
            ></Input>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label htmlFor="snowmen">Snowmen</Label>
            <Input
              id="snowmen"
              name="snowmen"
              type="number"
              className="!m-0 !w-[5rem] text-center"
              required
            ></Input>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label htmlFor="closestToPin">Closest To Pin</Label>
            <Input
              id="closestToPin"
              name="closestToPin"
              className="!m-0 !w-[5rem] text-center"
              type="number"
              step="any"
              required
            ></Input>
          </div>

          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}
          <div className="flex justify-center items-center gap-2">
            <CreateButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateScoreForm;
