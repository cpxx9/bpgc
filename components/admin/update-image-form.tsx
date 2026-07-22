"use client";

import { useToast } from "@/hooks/use-toast";
import { updateImageSchema } from "@/lib/validators";
import { DbImageAdmin, UpdateImage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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

  // const onSubmit = async (values: UpdateImage) => {
  //   try {
  //     const res = await updateImage({ ...values, id: image.id });

  //     if (!res.success) {
  //       return toast({
  //         variant: "destructive",
  //         description: res.message,
  //       });
  //     }

  //     toast({
  //       description: res.message,
  //     });
  //     router.push("/admin/golfers");
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       description: (err as Error).message,
  //     });
  //   }
  // };

  return <div>UpdateImageForm</div>;
};

export default UpdateImageForm;
