"use client";

import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/lib/uploadthing";

const UploadImageButton = () => {
  const { toast } = useToast();

  return (
    <div className="absolute top-2 right-2 flex items-center gap-1">
      <p>Upload images to the gallery</p>
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button: {
            border: "1px solid gray",
            color: "gray",
            padding: "1em",
          },
          container: {},
          allowedContent: {},
        }}
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
    </div>
  );
};

export default UploadImageButton;
