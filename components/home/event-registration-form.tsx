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
import { sendMail } from "@/lib/send-mail";
import { Textarea } from "@/components/ui/textarea";

const EventRegistrationForm = () => {
  const [data, action] = useActionState(sendMail, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const CreateButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form="event-registration-form"
        type="submit"
        disabled={pending}
        className="w-full"
        variant="default"
      >
        {pending ? "Sending..." : "Register"}
      </Button>
    );
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>REGISTER ONLINE HERE</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>WANNA PLAY THIS WEEKEND</DialogTitle>
            <DialogDescription>
              REGISTER FOR THE NEXT OUTING BELOW
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form id="create-event-form" action={action}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="player1">Player 1</Label>
                  <Input
                    id="player1"
                    name="player1"
                    type="text"
                    required
                    placeholder="(required)"
                    autoComplete="player1"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="player2">Player 2</Label>
                  <Input
                    id="player2"
                    name="player2"
                    type="text"
                    placeholder="(optional)"
                    autoComplete="player2"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="player3">Player 3</Label>
                  <Input
                    id="player3"
                    name="player3"
                    type="text"
                    placeholder="(optional)"
                    autoComplete="player3"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="player4">Player 4</Label>
                  <Input
                    id="player4"
                    name="player4"
                    type="text"
                    placeholder="(optional)"
                    autoComplete="player4"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    className="resize-none"
                    rows={6}
                    placeholder="Comments / Requests? Need to go out first? Wanna play with somebody specific? Let us know here!"
                    autoComplete="comment"
                  ></Textarea>
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

export default EventRegistrationForm;
