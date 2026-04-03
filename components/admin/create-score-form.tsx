"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { createScore } from "@/lib/actions/score.actions";

const CreateScoreForm = () => {
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
        form="create-score-form"
        type="submit"
        disabled={pending}
        className="w-full"
        variant="default"
      >
        {pending ? "Creating..." : "Save"}
      </Button>
    );
  };

  return (
    <div className="grid gap-4">
      <form id="create-score-form" action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <div>
            <Label htmlFor="score">Score</Label>
            <Input id="score" name="score" type="number" required></Input>
          </div>
          <div>
            <Label htmlFor="birdies">Birdies</Label>
            <Input id="birdies" name="birdies" type="number" required></Input>
          </div>
          <div>
            <Label htmlFor="snowmen">Snowmen</Label>
            <Input id="snowmen" name="snowmen" type="number" required></Input>
          </div>
          <div>
            <Label htmlFor="closestToPin">Closest To Pin</Label>
            <Input
              id="closestToPin"
              name="closestToPin"
              type="number"
              step="any"
              required
            ></Input>
          </div>

          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}
        </div>
        <div>
          <CreateButton />
        </div>
      </form>
    </div>
  );
};

export default CreateScoreForm;
