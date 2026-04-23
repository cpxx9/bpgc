"use client";

import DeleteDialog from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { deleteMatch } from "@/lib/actions/match.actions";
import { updateMatchups } from "@/lib/actions/matchup.actions";
import { updateMatchupSchema } from "@/lib/validators";
import { UpdateMatchup } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";

interface PropTypes {
  matchups: UpdateMatchup;
  displayNames: {
    teamOne: string;
    teamTwo: string;
  };
  matchId: string;
}

const UpdateMatchupsForm = ({ matchups, displayNames, matchId }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateMatchup>({
    resolver: zodResolver(updateMatchupSchema),
    defaultValues: matchups,
  });

  const onSubmit = async (values: UpdateMatchup) => {
    try {
      const res = await updateMatchups({ ...values });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push(`/admin/events/${matchups.eventId}`);
    } catch (err) {
      toast({
        variant: "destructive",
        description: (err as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="p-3 flex items-center gap-5 rounded-sm border"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="matchupOneScore"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateMatchup, "matchupOneScore">;
            }) => (
              <FormItem className="">
                <FormLabel>{displayNames.teamOne}</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team's score" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h1>vs.</h1>
        </div>
        <div>
          <FormField
            control={form.control}
            name="matchupTwoScore"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateMatchup, "matchupTwoScore">;
            }) => (
              <FormItem className="">
                <FormLabel>{displayNames.teamTwo}</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team's score" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="self-end">
          <Button
            type="submit"
            className=""
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update Scores"}
          </Button>
        </div>
        <div className="ml-auto">
          <Button type="button" asChild>
            <DeleteDialog id={matchId} action={deleteMatch} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateMatchupsForm;
