"use client";

import Header from "@/components/Header";
import ProcessingState from "@/components/ProcessingState";
import ResultCard from "@/components/ResultCard";
import UploadCard from "@/components/UploadCard";
import { deleteImage, uploadImage } from "@/lib/api";
import { useState } from "react";

type Status = "idle" | "processing" | "success";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const handleUpload = async (file: File) => {
    setStatus("processing");

    try {
      const data = await uploadImage(file);

      setImageUrl(data.url);
      setImageId(data.id);
      setStatus("success");
    } catch {
      setStatus("idle");
      alert("Upload failed");
    }
  };

  const handleDelete = async () => {
    await deleteImage(imageId);
    setStatus("idle");
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4">
        <div className="text-center max-w-lg w-full">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-2">
            Image Transformation
          </h1>
          <p className="text-gray-500">
            Remove background and flip horizontally
          </p>
        </div>

        {status === "idle" && <UploadCard onUpload={handleUpload} />}

        {status === "processing" && <ProcessingState />}

        {status === "success" && (
          <ResultCard
            imageUrl={imageUrl}
            onDelete={handleDelete}
            onReset={() => setStatus("idle")}
          />
        )}
      </div>
    </main>
  );
}
