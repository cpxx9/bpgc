"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createMatch } from "@/lib/actions/match.actions";
import { createTwoManTeam } from "@/lib/actions/two-man-team.actions";
import { createMatchSchema } from "@/lib/validators";
import { TwoManTeam, Match, TwoManTeamList } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  eventID: string;
  teams: TwoManTeamList[];
}

const CreateMatchupForm = ({ eventID, teams }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<Match>({
    resolver: zodResolver(createMatchSchema),
  });

  const onSubmit = async (values: Match) => {
    try {
      const res = await createMatch({ ...values, eventID });

      if (!res?.success) {
        return toast({
          variant: "destructive",
          description: res?.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push(`/admin/events${eventID}`);
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
        className="flex p-2 gap-2 items-end border-2 rounded-sm"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="twoManTeamOneID"
            render={({
              field,
            }: {
              field: ControllerRenderProps<Match, "twoManTeamOneID">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Golfer One</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="twoManTeamOneID"
            render={({
              field,
            }: {
              field: ControllerRenderProps<Match, "twoManTeamOneID">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Golfer Two</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Create Team"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateMatchupForm;
