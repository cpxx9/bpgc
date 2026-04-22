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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateMatchups } from "@/lib/actions/matchup.actions";
import { updateMatchupSchema } from "@/lib/validators";
import { UpdateMatchup } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  matchups: UpdateMatchup;
}

const UpdateMatchupsForm = ({ matchups }: PropTypes) => {
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
      router.push("/admin/golfers");
    } catch (err) {
      toast({
        variant: "destructive",
        description: (err as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="matchupOneScore"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateMatchup, "matchupOneScore">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team's score" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team's score" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-between mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update Scores"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateMatchupsForm;
