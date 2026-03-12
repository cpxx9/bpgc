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
// import { updateScore } from "@/lib/actions/score.actions";
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
    <div>
      <div>test</div>
    </div>
  );
};

export default UpdateScoreForm;
