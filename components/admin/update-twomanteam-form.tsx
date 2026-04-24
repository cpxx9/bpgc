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
import { updateTwoManTeam } from "@/lib/actions/two-man-team.actions";
import { updateTwoManTeamSchema } from "@/lib/validators";
import { UpdateTwoManTeam } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";

interface PropTypes {
  updateInfo: UpdateTwoManTeam;
}

const UpdateTwoManTeamForm = ({ updateInfo }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateTwoManTeam>({
    resolver: zodResolver(updateTwoManTeamSchema),
    defaultValues: updateInfo,
  });

  const onSubmit = async (values: UpdateTwoManTeam) => {
    try {
      const res = await updateTwoManTeam({ ...values });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push(`/admin/two-man-teams`);
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
        className="flex gap-5"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="number"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateTwoManTeam, "number">;
            }) => (
              <FormItem className="">
                <FormControl>
                  <Input placeholder="Enter team's number" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <Button
            type="submit"
            className=""
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Update Team Number"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTwoManTeamForm;
