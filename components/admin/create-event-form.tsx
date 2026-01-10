"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { createGolfer } from "@/lib/actions/golfer.actions";
import { createEvent } from "@/lib/actions/event.actions";
import { Checkbox } from "@/components/ui/checkbox";

const CreateEventForm = () => {
  const [data, action] = useActionState(createEvent, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const CreateButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form="create-event-form"
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>+ Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new event</DialogTitle>
            <DialogDescription>
              Enter event information here. Click save to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form id="create-event-form" action={action}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    autoComplete="date"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                    autoComplete="time"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    autoComplete="location"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="description"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="leagueWeek">League Week</Label>
                  <Input
                    id="leagueWeek"
                    name="leagueWeek"
                    type="number"
                    autoComplete="leagueWeek"
                  ></Input>
                </div>
                <div className="flex justify-between">
                  <Label htmlFor="isTwoManMatch">
                    Is this a Two Man Match?
                  </Label>
                  <Checkbox id="isTwoManMatch" name="isTwoManMatch" />
                </div>

                {data && !data.success && (
                  <div className="text-center text-destructive">
                    {data.message}
                  </div>
                )}
              </div>
            </form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <CreateButton />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateEventForm;
