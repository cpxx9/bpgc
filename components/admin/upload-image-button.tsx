"use client";

import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/lib/uploadthing";

const UploadImageButton = () => {
  const { toast } = useToast();

  return (
    <UploadButton
      className="absolute top-2 right-2"
      endpoint="imageUploader"
      onClientUploadComplete={(res: { url: string }[]) => {
        toast({
          variant: "default",
          description: `Image uploaded to ${res[0].url}`,
        });
      }}
      onUploadError={(error: Error) => {
        toast({
          variant: "destructive",
          description: `ERROR! ${error.message}`,
        });
      }}
    />
  );
};

export default UploadImageButton;
