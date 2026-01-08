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
        className="flex align-bottom"
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
                    {golfers.map((golfer) => (
                      <SelectItem key={golfer.id} value={golfer.id}>
                        {golfer.firstName} {golfer.lastName}
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
                    {golfers.map((golfer) => (
                      <SelectItem key={golfer.id} value={golfer.id}>
                        {golfer.firstName} {golfer.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-between mt-4">
          <Button
            type="submit"
            className="w-full align-bottom"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Create Team"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// const CreateTwoManTeamForm = ({ golfers }: PropTypes) => {
//   const [data, action] = useActionState(createTwoManTeam, {
//     success: false,
//     message: "",
//   });

//   const CreateButton = () => {
//     const { pending } = useFormStatus();

//     return (
//       <Button
//         form="create-two-man-team-form"
//         type="submit"
//         disabled={pending}
//         className="w-full"
//         variant="default"
//       >
//         {pending ? "Creating..." : "Save"}
//       </Button>
//     );
//   };

//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button>+ Create</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Create new Two Man Team</DialogTitle>
//             <DialogDescription>
//               Enter team information here. Click save to create.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <form id="create-golfer-form" action={action}>
//               <div className="space-y-6">
//                 <div>
//                   <Label htmlFor="golferOneID">Golfer One</Label>
//                   <Select name="golferOneID">
//                     <SelectTrigger className="w-[280px]">
//                       <SelectValue placeholder="Select a golfer" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Golfer One Selection</SelectLabel>
//                         {golfers.map((golfer) => (
//                           <SelectItem
//                             key={golfer.id}
//                             id={golfer.id}
//                             value={golfer.id}
//                           >
//                             {golfer.firstName} {golfer.lastName}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="golferTwoID">Golfer Two</Label>
//                   <Select name="golferTwoID">
//                     <SelectTrigger className="w-[280px]">
//                       <SelectValue placeholder="Select a golfer" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Golfer One Selection</SelectLabel>
//                         {golfers.map((golfer) => (
//                           <SelectItem
//                             key={golfer.id}
//                             id={golfer.id}
//                             value={golfer.id}
//                           >
//                             {golfer.firstName} {golfer.lastName}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {data && !data.success && (
//                   <div className="text-center text-destructive">
//                     {data.message}
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <CreateButton />
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// };

export default CreateTwoManTeamForm;
