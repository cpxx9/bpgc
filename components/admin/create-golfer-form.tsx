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

const CreateGolferForm = () => {
  const [data, action] = useActionState(createGolfer, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const CreateButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form="create-golfer-form"
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
            <DialogTitle>Create new golfer</DialogTitle>
            <DialogDescription>
              Enter golfer information here. Click save to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form id="create-golfer-form" action={action}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="firstname"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="lastName"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="hci">HCI</Label>
                  <Input
                    id="hci"
                    name="hci"
                    type="number"
                    step="any"
                    required
                    autoComplete="hci"
                  ></Input>
                </div>
                {/* <div>
                  <Label htmlFor="twoManTeam">Two Man Team</Label>
                  <Input
                    id="twoManTeam"
                    name="twoManTeam"
                    type="text"
                    autoComplete="twoManTeam"
                  ></Input>
                </div> */}

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

export default CreateGolferForm;
