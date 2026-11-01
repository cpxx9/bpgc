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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateSiteSettings } from "@/lib/actions/siteSettings.actions";
import { updateSiteSettingsSchema } from "@/lib/validators";
import { UpdateSiteSettings } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";

interface PropTypes {
  siteSettings: UpdateSiteSettings;
  userId: string;
}

const UpdateSiteSettingsForm = ({ siteSettings, userId }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateSiteSettings>({
    resolver: zodResolver(updateSiteSettingsSchema),
    defaultValues: siteSettings,
  });

  const onSubmit = async (values: UpdateSiteSettings) => {
    try {
      const res = await updateSiteSettings({
        ...values,
        id: siteSettings.id,
        updatedBy: userId,
      });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push("/admin/overview");
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
        className="flex justify-between items-end gap-3"
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="bpgcNews"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateSiteSettings, "bpgcNews">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>BPGC News</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the news"
                    className="min-h-10"
                    field-sizing="content"
                    rows={1}
                    maxLength={2000}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-2">
          <FormField
            control={form.control}
            name="leagueYear"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateSiteSettings, "leagueYear">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>League Schedule Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter League Schedule Year"
                    {...field}
                    type="number"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-2">
          <FormField
            control={form.control}
            name="clubChampionshipYear"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                UpdateSiteSettings,
                "clubChampionshipYear"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Club Championship Stats Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Club Championship Stats Year"
                    {...field}
                    type="number"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-2">
          <FormField
            control={form.control}
            name="twoManLeagueYear"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                UpdateSiteSettings,
                "twoManLeagueYear"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Two-Man League Scheule Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Two Man League Schedule Year"
                    {...field}
                    type="number"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-6">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateSiteSettingsForm;
