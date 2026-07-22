"use client";

import { useToast } from "@/hooks/use-toast";

const CopyText = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        variant: "default",
        description: "Text Copied...",
      });
    } catch (err) {
      toast({ variant: "destructive", description: "Failed to copy text!" });
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <p onClick={handleCopy} className="truncate">
      {text}
    </p>
  );
};

export default CopyText;
