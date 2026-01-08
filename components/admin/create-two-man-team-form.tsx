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
import { createTwoManTeam } from "@/lib/actions/two-man-team.actions";
import { createTwoManTeamSchema } from "@/lib/validators";
import { TwoManTeam, Golfer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  golfers: Golfer[];
}

const CreateTwoManTeamForm = ({ golfers }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TwoManTeam>({
    resolver: zodResolver(createTwoManTeamSchema),
  });

  const onSubmit = async (values: TwoManTeam) => {
    try {
      const res = await createTwoManTeam({ ...values });

      if (!res?.success) {
        return toast({
          variant: "destructive",
          description: res?.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push("/admin/two-man-teams");
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
            name="golferOneID"
            render={({
              field,
            }: {
              field: ControllerRenderProps<TwoManTeam, "golferOneID">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Golfer One</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a golfer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {golfers.map(
                      (golfer) =>
                        !golfer.twoManTeamId && (
                          <SelectItem key={golfer.id} value={golfer.id}>
                            {golfer.firstName} {golfer.lastName}
                          </SelectItem>
                        )
                    )}
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
            name="golferTwoID"
            render={({
              field,
            }: {
              field: ControllerRenderProps<TwoManTeam, "golferTwoID">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Golfer Two</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a golfer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {golfers.map(
                      (golfer) =>
                        !golfer.twoManTeamId && (
                          <SelectItem key={golfer.id} value={golfer.id}>
                            {golfer.firstName} {golfer.lastName}
                          </SelectItem>
                        )
                    )}
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

export default CreateTwoManTeamForm;
