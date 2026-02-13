"use client";

import { useRef, useState } from "react";
import Button from "./Button";

type Props = {
  onUpload: (file: File) => void;
  loading?: boolean;
};

export default function UploadCard({ onUpload, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-sm transition ${
          dragging
            ? "border-black bg-gray-50"
            : "border-gray-300 text-gray-500 hover:border-black"
        }`}
      >
        {preview ? (
          <img src={preview} className="max-h-64 rounded-lg" />
        ) : (
          "Click or drag image here"
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      <Button disabled={loading} onClick={() => inputRef.current?.click()}>
        {loading ? "Uploading..." : "Choose Image"}
      </Button>
    </div>
  );
}
