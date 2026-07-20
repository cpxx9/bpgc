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
        onClientUploadComplete={(res) => {
          toast({
            variant: "default",
            description: `${res[0].serverData.actionResult.message}`,
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
