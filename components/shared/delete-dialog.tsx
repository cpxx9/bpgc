"use client";
import { useState } from "react";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { ActionResultMessage } from "@/types";

interface PropTypes<TArgs extends unknown[] = []> {
  id: string;
  action: (id: string, ...args: TArgs) => Promise<ActionResultMessage>;
  options?: TArgs;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  text?: string;
  description?: string;
}

const DeleteDialog = <TArgs extends unknown[] = []>({
  id,
  action,
  options,
  variant = "destructive",
  text = "DELETE",
  description,
}: PropTypes<TArgs>) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id, ...((options ?? []) as TArgs));
      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
      } else {
        setOpen(false);
        toast({ description: res.message });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant={variant}>
          {text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone!
            <br />
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
