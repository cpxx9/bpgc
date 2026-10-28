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
import { useActionState, useEffect, useState } from "react";
import { sendMail } from "@/lib/send-mail";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EventRegistrationForm = () => {
  const { toast } = useToast();

  const [data, action, isPending] = useActionState(sendMail, {
    success: false,
    message: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.success) {
      setOpen(false);
      toast({ description: data.message });
    }
  }, [data, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>REGISTER ONLINE HERE</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            WANNA PLAY THIS WEEKEND?
          </DialogTitle>
          <DialogDescription className="text-xl text-center">
            REGISTER FOR THE NEXT OUTING BELOW
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <form id="event-registration-form" action={action}>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="hp_field">Leave this empty</label>
              <input
                id="hp_field"
                name="hp_field"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="player1">Player 1</Label>
                <Input
                  id="player1"
                  name="player1"
                  type="text"
                  required
                  maxLength={60}
                  placeholder="(required)"
                  autoComplete="off"
                />
              </div>
              <div>
                <Label htmlFor="player2">Player 2</Label>
                <Input
                  id="player2"
                  name="player2"
                  type="text"
                  maxLength={60}
                  placeholder="(optional)"
                  autoComplete="off"
                />
              </div>
              <div>
                <Label htmlFor="player3">Player 3</Label>
                <Input
                  id="player3"
                  name="player3"
                  type="text"
                  maxLength={60}
                  placeholder="(optional)"
                  autoComplete="off"
                />
              </div>
              <div>
                <Label htmlFor="player4">Player 4</Label>
                <Input
                  id="player4"
                  name="player4"
                  type="text"
                  maxLength={60}
                  placeholder="(optional)"
                  autoComplete="off"
                />
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  className="resize-none"
                  rows={6}
                  maxLength={1000}
                  placeholder="Comments / Requests? Need to go out first? Wanna play with somebody specific? Let us know here!"
                  autoComplete="off"
                />
              </div>
              {!data.success && data.message && (
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
          <Button
            form="event-registration-form"
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Sending..." : "Register"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;