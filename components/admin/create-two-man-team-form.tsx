"use client";

import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { createTwoManTeam } from "@/lib/actions/two-man-team.actions";
import { Golfer } from "@/types/index";

interface PropTypes {
  golfers: Golfer[];
}

const CreateTwoManTeamForm = ({ golfers }: PropTypes) => {
  const [data, action] = useActionState(createTwoManTeam, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const CreateButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form="create-two-man-team-form"
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
            <DialogTitle>Create new Two Man Team</DialogTitle>
            <DialogDescription>
              Enter team information here. Click save to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form id="create-golfer-form" action={action}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="golferOneID">Golfer One</Label>
                  <Select name="golferOneID">
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a golfer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Golfer One Selection</SelectLabel>
                        {golfers.map((golfer) => (
                          <SelectItem
                            key={golfer.id}
                            id={golfer.id}
                            value={golfer.id}
                          >
                            {golfer.firstName} {golfer.lastName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="golferTwoID">Golfer Two</Label>
                  <Select name="golferTwoID">
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a golfer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Golfer One Selection</SelectLabel>
                        {golfers.map((golfer) => (
                          <SelectItem
                            key={golfer.id}
                            id={golfer.id}
                            value={golfer.id}
                          >
                            {golfer.firstName} {golfer.lastName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

export default CreateTwoManTeamForm;
