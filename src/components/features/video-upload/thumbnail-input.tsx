import { useRef, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

type ThumbnailInputProps = {
  onChange: (file: string) => void;
};

export function ThumbnailInput({ onChange }: ThumbnailInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const fileUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(fileUrl);
      onChange(fileUrl); // send file to react-hook-form
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2 flex flex-col items-center">
      <Label>Thumbnail</Label>
      
      <div
        onClick={handleClick}
        className="w-80 h-44 cursor-pointer border border-dashed rounded-md flex items-center justify-center overflow-hidden hover:opacity-80 transition"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Thumbnail Preview"
            width={320}
            height={180}
            className="object-cover"
          />
        ) : (
          <Image
            src="/placeholder-thumbnail.png" // 👈 Replace with your placeholder path
            alt="Click to upload"
            width={320}
            height={180}
            className="object-cover opacity-70"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
