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
import { updateGolferSchema } from "@/lib/validators";
import { UpdateGolfer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  golfer: UpdateGolfer;
}

const UpdateGolferForm = ({ golfer }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateGolfer>({
    resolver: zodResolver(updateGolferSchema),
    defaultValues: golfer,
  });

  const onSubmit = async (values: UpdateGolfer) => {
    try {
      const res = await updateGolfer({ ...values, id: golfer.id });

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
            name="firstName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateGolfer, "firstName">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter golfer's first name"
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
            name="lastName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateGolfer, "lastName">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter golfer's last name"
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
            name="hci"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateGolfer, "hci">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>HCI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter golfer's HCI"
                    {...field}
                    type="decimal"
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
            {form.formState.isSubmitting ? "Submitting..." : "Update Golfer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateGolferForm;
