"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { updateScore } from "@/lib/actions/score.actions";
import { updateScoreSchema } from "@/lib/validators";
import { UpdateScore } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  score: UpdateScore;
}
const UpdateScoreForm = ({ score }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateScore>({
    resolver: zodResolver(updateScoreSchema),
    defaultValues: score,
  });

  const onSubmit = async (values: UpdateScore) => {
    try {
      const res = await updateScore({ ...values, id: score.id });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }
      toast({
        description: res.message,
      });
      router.push(`/admin/events/${score.eventId}`);
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
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4"
      >
        <div>
          <FormField
            control={form.control}
            name="score"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateScore, "score">;
            }) => (
              <FormItem className="flex justify-center items-center gap-2">
                <FormLabel>Score:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter score"
                    {...field}
                    type="decimal"
                    className="!m-0 !w-[5rem] text-center"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="birdies"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateScore, "birdies">;
            }) => (
              <FormItem className="flex justify-center items-center gap-2">
                <FormLabel>Birdies:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter birdies"
                    {...field}
                    type="decimal"
                    className="!m-0 !w-[5rem] text-center"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="snowmen"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateScore, "snowmen">;
            }) => (
              <FormItem className="flex justify-center items-center gap-2">
                <FormLabel>Snowmen:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter snowmen"
                    {...field}
                    type="decimal"
                    className="!m-0 !w-[5rem] text-center"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="closestToPin"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateScore, "closestToPin">;
            }) => (
              <FormItem className="flex justify-center items-center gap-2">
                <FormLabel>Closest To the Pin:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter closest to the pin"
                    {...field}
                    value={field.value ?? ""}
                    type="decimal"
                    className="!m-0 !w-[5rem] text-center"
                  ></Input>
                </FormControl>
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
            {form.formState.isSubmitting ? "Submitting..." : "Update Score"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateScoreForm;
