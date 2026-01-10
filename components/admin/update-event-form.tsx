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
import { updateGolfer } from "@/lib/actions/golfer.actions";
import { updateEventSchema } from "@/lib/validators";
import { UpdateEvent, UpdateGolfer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  event: UpdateEvent;
}

const UpdateEventForm = ({ event }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateEvent>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: event,
  });

  const onSubmit = async (values: UpdateEvent) => {
    try {
      const res = await updateGolfer({ ...values, id: event.id });

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
        {/* <div>
          <FormField
            control={form.control}
            name="date"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateEvent, "date">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                  type="date"
                    placeholder="Enter golfer's first name"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div>
          <FormField
            control={form.control}
            name="location"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateEvent, "location">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateEvent, "description">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter event description"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="leagueWeek"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateEvent, "leagueWeek">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>HCI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="League Week"
                    {...field}
                    type="number"
                  ></Input>
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
            {form.formState.isSubmitting ? "Submitting..." : "Update Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateEventForm;
