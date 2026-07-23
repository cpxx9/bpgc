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
import { updateImage } from "@/lib/actions/image.actions";
import { updateImageSchema } from "@/lib/validators";
import { DbImageAdmin, UpdateImage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";

interface PropTypes {
  image: DbImageAdmin;
}

const UpdateImageForm = ({ image }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdateImage>({
    resolver: zodResolver(updateImageSchema),
    defaultValues: image,
  });

  const onSubmit = async (values: UpdateImage) => {
    try {
      const res = await updateImage({ ...values, id: image.id });

      if (!res.success) {
        return toast({
          variant: "destructive",
          description: res.message,
        });
      }

      toast({
        description: res.message,
      });
      router.push("/admin/gallery");
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
        <div className="">
          <FormField
            control={form.control}
            name="displayed"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "displayed">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Displayed in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isHomeSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isHomeSplash">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Is background for schedule page?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isScheduleSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isScheduleSplash">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Is background for schedule page?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isWeeklyScoresSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isWeeklyScoresSplash">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsWeeklyScoresSplash in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isScoringAveragesSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                UpdateImage,
                "isScoringAveragesSplash"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsScoringAveragesSplash in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isTwoManLeagueSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isTwoManLeagueSplash">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsTwoManLeagueSplash in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isClubChampionshipSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                UpdateImage,
                "isClubChampionshipSplash"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsClubChampionshipSplash in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isContestsSplash"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isContestsSplash">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsContestsSplash in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isVideoOfTheWeek"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isVideoOfTheWeek">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsVideoOfTheWeek in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isTwoManChamps"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isTwoManChamps">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsTwoManChamps in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="isBpgcTv"
            render={({
              field,
            }: {
              field: ControllerRenderProps<UpdateImage, "isBpgcTv">;
            }) => (
              <FormItem className="w-full">
                <FormLabel>IsBpgcTv in gallery?</FormLabel>
                <FormControl>
                  <Checkbox
                    className="p-0 m-0"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
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
            {form.formState.isSubmitting ? "Submitting..." : "Update Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateImageForm;
