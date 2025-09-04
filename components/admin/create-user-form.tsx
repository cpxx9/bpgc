"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signUpDefaultValues } from "@/lib/constants";
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
import { createUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const CreateUserForm = () => {
  const [data, action] = useActionState(createUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        form="create-user-form"
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
            <DialogTitle>Create new user</DialogTitle>
            <DialogDescription>
              Enter user information here. Click save to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form id="create-user-form" action={action}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    defaultValue={signUpDefaultValues.name}
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={signUpDefaultValues.email}
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    defaultValue={signUpDefaultValues.password}
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="confirmPassword"
                    defaultValue={signUpDefaultValues.confirmPassword}
                  ></Input>
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
            <SignUpButton />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateUserForm;
